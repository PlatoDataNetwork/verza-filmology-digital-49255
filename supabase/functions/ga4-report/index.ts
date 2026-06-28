import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'

/**
 * Secure GA4 reporting proxy.
 *
 * - Validates the caller is an authenticated admin.
 * - Reads the saved GA4 Property ID from `integration_settings`.
 * - Uses a Google service-account key (stored ONLY in the GA4_SERVICE_ACCOUNT_JSON
 *   secret) to mint an access token and call the GA4 Data API.
 * - Returns shaped analytics data. Google credentials never reach the client.
 */

const DAYS: Record<string, number> = { '7d': 7, '28d': 28, '90d': 90 }

const BodySchema = z.object({
  range: z.enum(['7d', '28d', '90d']).default('28d'),
})

// ---------------------------------------------------------------------------
// Google service-account auth (JWT -> access token)
// ---------------------------------------------------------------------------

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '')
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

function base64url(input: string | Uint8Array): string {
  let str = typeof input === 'string' ? btoa(input) : btoa(String.fromCharCode(...input))
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }),
  )
  const unsigned = `${header}.${claim}`

  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(privateKey),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sigBuf = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsigned),
  )
  const jwt = `${unsigned}.${base64url(new Uint8Array(sigBuf))}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  const json = await res.json()
  if (!res.ok) {
    console.error('[ga4-report] token exchange failed', json)
    throw new Error(json.error_description || json.error || 'Failed to obtain Google access token')
  }
  return json.access_token as string
}

// ---------------------------------------------------------------------------
// GA4 Data API helpers
// ---------------------------------------------------------------------------

interface GaRow {
  dimensionValues?: { value: string }[]
  metricValues?: { value: string }[]
}

const num = (v?: string) => (v ? Number(v) : 0)
const pctChange = (cur: number, prev: number) =>
  prev > 0 ? Number((((cur - prev) / prev) * 100).toFixed(1)) : 0

function isoDate(ga: string) {
  // GA returns YYYYMMDD
  if (/^\d{8}$/.test(ga)) return `${ga.slice(0, 4)}-${ga.slice(4, 6)}-${ga.slice(6, 8)}`
  return ga
}

async function runBatch(token: string, propertyId: string, days: number) {
  const current = { startDate: `${days - 1}daysAgo`, endDate: 'today' }
  const previous = { startDate: `${days * 2 - 1}daysAgo`, endDate: `${days}daysAgo` }

  const body = {
    requests: [
      // 0: totals (current + previous for change %)
      {
        dateRanges: [current, previous],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'newUsers' },
          { name: 'screenPageViews' },
          { name: 'engagementRate' },
          { name: 'averageSessionDuration' },
        ],
      },
      // 1: timeseries
      {
        dateRanges: [current],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'screenPageViews' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      },
      // 2: traffic sources
      {
        dateRanges: [current],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      },
      // 3: top pages
      {
        dateRanges: [current],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'averageSessionDuration' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      },
      // 4: devices
      {
        dateRanges: [current],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      },
      // 5: countries
      {
        dateRanges: [current],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
        limit: 8,
      },
    ],
  }

  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  )
  const json = await res.json()
  if (!res.ok) {
    console.error('[ga4-report] batchRunReports error', json)
    throw new Error(json?.error?.message || 'GA4 Data API request failed')
  }
  return json.reports as { rows?: GaRow[] }[]
}

async function runRealtime(token: string, propertyId: string) {
  const call = async (dimension: string, limit?: number) => {
    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dimensions: [{ name: dimension }],
          metrics: [{ name: 'activeUsers' }],
          ...(limit ? { limit } : {}),
        }),
      },
    )
    const json = await res.json()
    if (!res.ok) {
      console.error('[ga4-report] realtime error', json)
      throw new Error(json?.error?.message || 'GA4 realtime request failed')
    }
    return (json.rows ?? []) as GaRow[]
  }

  const [minuteRows, pageRows] = await Promise.all([
    call('minutesAgo'),
    call('unifiedScreenName', 5),
  ])

  const perMinute = Array.from({ length: 30 }).map((_, i) => {
    const row = minuteRows.find((r) => num(r.dimensionValues?.[0]?.value) === i)
    return { minute: i, users: row ? num(row.metricValues?.[0]?.value) : 0 }
  })
  const activeUsers = minuteRows.reduce((acc, r) => acc + num(r.metricValues?.[0]?.value), 0)
  const topPages = pageRows.map((r) => ({
    path: r.dimensionValues?.[0]?.value ?? '(not set)',
    users: num(r.metricValues?.[0]?.value),
  }))

  return { activeUsers, perMinute, topPages }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return json({ error: 'Unauthorized' }, 401)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    })
    const token = authHeader.replace('Bearer ', '')
    const { data: claims, error: claimsErr } = await userClient.auth.getClaims(token)
    if (claimsErr || !claims?.claims?.sub) {
      return json({ error: 'Unauthorized' }, 401)
    }
    const userId = claims.claims.sub as string

    const admin = createClient(supabaseUrl, serviceKey)

    // Authorize: admin only
    const { data: roleRow } = await admin
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle()
    if (!roleRow) {
      return json({ error: 'Forbidden: admin role required' }, 403)
    }

    const parsed = BodySchema.safeParse(await req.json().catch(() => ({})))
    if (!parsed.success) {
      return json({ error: 'Invalid request', details: parsed.error.flatten().fieldErrors }, 400)
    }
    const days = DAYS[parsed.data.range]

    // Read saved GA4 property id
    const { data: settingRow } = await admin
      .from('integration_settings')
      .select('config, enabled')
      .eq('provider', 'google_analytics')
      .maybeSingle()

    const propertyId = (settingRow?.config as { propertyId?: string } | null)?.propertyId
    console.log('[ga4-report] loaded propertyId:', propertyId ?? '(none)', 'range:', parsed.data.range)
    if (!propertyId) {
      return json({ error: 'not_configured', message: 'GA4 Property ID is not configured.' }, 200)
    }

    // Service account credentials
    const raw = Deno.env.get('GA4_SERVICE_ACCOUNT_JSON')
    if (!raw) {
      console.error('[ga4-report] GA4_SERVICE_ACCOUNT_JSON secret is missing')
      return json(
        { error: 'missing_credentials', message: 'Google service account credentials are not configured.' },
        200,
      )
    }

    let creds: { client_email?: string; private_key?: string }
    try {
      let parsedCreds: unknown = JSON.parse(raw)
      // Handle double-encoded JSON (value stored as a quoted JSON string).
      if (typeof parsedCreds === 'string') {
        parsedCreds = JSON.parse(parsedCreds)
      }
      creds = parsedCreds as { client_email?: string; private_key?: string }
    } catch {
      console.error('[ga4-report] GA4_SERVICE_ACCOUNT_JSON is not valid JSON')
      return json({ error: 'invalid_credentials', message: 'Service account JSON is invalid.' }, 200)
    }
    if (!creds || typeof creds !== 'object' || !creds.client_email || !creds.private_key) {
      // Safe diagnostic: log key NAMES only, never values.
      const diag =
        creds && typeof creds === 'object' ? Object.keys(creds).join(',') : `(type=${typeof creds})`
      console.log('[ga4-report] DIAG service account JSON missing fields. keys=', diag)
      return json({ error: 'invalid_credentials', message: 'Service account JSON is missing fields.' }, 200)
    }

    const accessToken = await getAccessToken(creds.client_email, creds.private_key.replace(/\\n/g, '\n'))
    console.log('[ga4-report] obtained Google access token')

    const [reports, realtime] = await Promise.all([
      runBatch(accessToken, propertyId, days),
      runRealtime(accessToken, propertyId).catch((e) => {
        console.error('[ga4-report] realtime failed (non-fatal)', e)
        return { activeUsers: 0, perMinute: Array.from({ length: 30 }).map((_, i) => ({ minute: i, users: 0 })), topPages: [] }
      }),
    ])

    // 0: totals — row 0 current, row 1 previous
    const totalsRows = reports[0]?.rows ?? []
    const cur = totalsRows[0]?.metricValues ?? []
    const prev = totalsRows[1]?.metricValues ?? []
    const totals = {
      sessions: num(cur[0]?.value),
      users: num(cur[1]?.value),
      newUsers: num(cur[2]?.value),
      pageViews: num(cur[3]?.value),
      engagementRate: Number((num(cur[4]?.value) * 100).toFixed(1)),
      avgSession: Math.round(num(cur[5]?.value)),
    }
    const changes = {
      sessions: pctChange(num(cur[0]?.value), num(prev[0]?.value)),
      users: pctChange(num(cur[1]?.value), num(prev[1]?.value)),
      newUsers: pctChange(num(cur[2]?.value), num(prev[2]?.value)),
      pageViews: pctChange(num(cur[3]?.value), num(prev[3]?.value)),
      engagementRate: pctChange(num(cur[4]?.value), num(prev[4]?.value)),
      avgSession: pctChange(num(cur[5]?.value), num(prev[5]?.value)),
    }

    const timeseries = (reports[1]?.rows ?? []).map((r) => ({
      date: isoDate(r.dimensionValues?.[0]?.value ?? ''),
      sessions: num(r.metricValues?.[0]?.value),
      users: num(r.metricValues?.[1]?.value),
      pageViews: num(r.metricValues?.[2]?.value),
    }))

    const sourceRows = reports[2]?.rows ?? []
    const sourceTotal = sourceRows.reduce((acc, r) => acc + num(r.metricValues?.[0]?.value), 0) || 1
    const trafficSources = sourceRows.map((r) => ({
      label: r.dimensionValues?.[0]?.value || 'Unassigned',
      value: Number(((num(r.metricValues?.[0]?.value) / sourceTotal) * 100).toFixed(1)),
    }))

    const topPages = (reports[3]?.rows ?? []).map((r) => ({
      path: r.dimensionValues?.[0]?.value ?? '',
      title: r.dimensionValues?.[1]?.value ?? '',
      pageViews: num(r.metricValues?.[0]?.value),
      avgTime: Math.round(num(r.metricValues?.[1]?.value)),
    }))

    const deviceRows = reports[4]?.rows ?? []
    const deviceTotal = deviceRows.reduce((acc, r) => acc + num(r.metricValues?.[0]?.value), 0) || 1
    const devices = deviceRows.map((r) => ({
      label: r.dimensionValues?.[0]?.value ?? '',
      value: Number(((num(r.metricValues?.[0]?.value) / deviceTotal) * 100).toFixed(1)),
    }))

    const countries = (reports[5]?.rows ?? []).map((r) => ({
      label: r.dimensionValues?.[0]?.value || '(not set)',
      value: num(r.metricValues?.[0]?.value),
    }))

    console.log('[ga4-report] success', {
      sessions: totals.sessions,
      timeseriesPoints: timeseries.length,
      realtimeActive: realtime.activeUsers,
    })

    return json({
      propertyId,
      totals,
      changes,
      timeseries,
      trafficSources,
      topPages,
      devices,
      countries,
      realtime,
    })
  } catch (e) {
    console.error('[ga4-report] unhandled error', e)
    return json({ error: 'ga_api_error', message: (e as Error).message }, 502)
  }
})
