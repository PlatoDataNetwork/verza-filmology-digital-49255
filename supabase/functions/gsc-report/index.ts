import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'

/**
 * Secure Google Search Console reporting proxy.
 *
 * - Validates the caller is an authenticated admin.
 * - Reads the saved Search Console Site URL from `integration_settings`.
 * - Calls the Search Console Search Analytics API through the Lovable connector
 *   gateway. The Google OAuth credentials live ONLY on the server (the
 *   GOOGLE_SEARCH_CONSOLE_API_KEY connection key + LOVABLE_API_KEY) and never
 *   reach the browser — the frontend only ever calls this function.
 */

const GATEWAY = 'https://connector-gateway.lovable.dev/google_search_console'

const BodySchema = z.object({
  range: z.enum(['7d', '28d', '90d', '6m', '12m', 'custom']).default('28d'),
  searchType: z.enum(['web', 'image', 'video', 'news']).default('web'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

const RANGE_DAYS: Record<string, number> = {
  '7d': 7,
  '28d': 28,
  '90d': 90,
  '6m': 182,
  '12m': 365,
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmt = (d: Date) => d.toISOString().slice(0, 10)

function periodFor(range: string, startDate?: string, endDate?: string) {
  if (range === 'custom' && startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1)
    const prevEnd = new Date(start)
    prevEnd.setDate(prevEnd.getDate() - 1)
    const prevStart = new Date(prevEnd)
    prevStart.setDate(prevStart.getDate() - (days - 1))
    return { current: { startDate, endDate }, previous: { startDate: fmt(prevStart), endDate: fmt(prevEnd) } }
  }
  const days = RANGE_DAYS[range] ?? 28
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - (days - 1))
  const prevEnd = new Date(start)
  prevEnd.setDate(prevEnd.getDate() - 1)
  const prevStart = new Date(prevEnd)
  prevStart.setDate(prevStart.getDate() - (days - 1))
  return {
    current: { startDate: fmt(start), endDate: fmt(end) },
    previous: { startDate: fmt(prevStart), endDate: fmt(prevEnd) },
  }
}

interface GscApiRow {
  keys?: string[]
  clicks: number
  impressions: number
  ctr: number
  position: number
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
      return json({ error: 'unauthorized', message: 'Unauthorized' }, 401)
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
      return json({ error: 'unauthorized', message: 'Unauthorized' }, 401)
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
      return json({ error: 'forbidden', message: 'Forbidden: admin role required' }, 403)
    }

    const parsed = BodySchema.safeParse(await req.json().catch(() => ({})))
    if (!parsed.success) {
      return json({ error: 'invalid_request', message: 'Invalid request', details: parsed.error.flatten().fieldErrors }, 400)
    }
    const { range, searchType, startDate, endDate } = parsed.data

    // Read saved Search Console site url
    const { data: settingRow } = await admin
      .from('integration_settings')
      .select('config, enabled')
      .eq('provider', 'google_search_console')
      .maybeSingle()

    const siteUrl = (settingRow?.config as { siteUrl?: string } | null)?.siteUrl?.trim()
    if (!siteUrl || settingRow?.enabled === false) {
      return json({
        error: 'not_configured',
        message: 'Google Search Console has not been configured. Please complete the setup in Admin → Settings.',
      })
    }

    const lovableKey = Deno.env.get('LOVABLE_API_KEY')
    const connectionKey = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY')
    if (!lovableKey || !connectionKey) {
      return json({
        error: 'not_configured',
        message: 'Search Console credentials are not connected. Please reconnect Google Search Console.',
      })
    }

    const { current, previous } = periodFor(range, startDate, endDate)
    const encodedSite = encodeURIComponent(siteUrl)
    const endpoint = `${GATEWAY}/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`

    // Single GSC searchAnalytics.query call.
    const query = async (
      dimensions: string[],
      period: { startDate: string; endDate: string },
      rowLimit = 25,
    ): Promise<GscApiRow[]> => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          'X-Connection-Api-Key': connectionKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: period.startDate,
          endDate: period.endDate,
          dimensions,
          type: searchType,
          rowLimit,
          dataState: 'all',
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        const status = res.status
        const apiMsg = body?.error?.message || body?.message || 'Search Console API request failed'
        const err = new Error(apiMsg) as Error & { status?: number }
        err.status = status
        throw err
      }
      return (body.rows ?? []) as GscApiRow[]
    }

    // Optional dimension that may not be available for every property.
    const safeQuery = async (dimensions: string[], period: { startDate: string; endDate: string }, rowLimit = 25) => {
      try {
        return await query(dimensions, period, rowLimit)
      } catch {
        return [] as GscApiRow[]
      }
    }

    let totalsCur: GscApiRow[]
    try {
      totalsCur = await query([], current, 1)
    } catch (e) {
      const err = e as Error & { status?: number }
      if (err.status === 403) {
        return json({
          error: 'permission_error',
          message:
            `Access denied for "${siteUrl}". Make sure the connected Google account has access to this Search Console property and the Site URL matches exactly (including https:// and trailing slash).`,
        })
      }
      console.error('[gsc-report] totals query failed', err.status, err.message)
      return json({ error: 'gsc_api_error', message: err.message }, 502)
    }

    const [
      totalsPrev,
      timeseries,
      queries,
      pages,
      countries,
      devices,
      searchAppearance,
    ] = await Promise.all([
      safeQuery([], previous, 1),
      query(['date'], current, 1000),
      query(['query'], current, 100),
      query(['page'], current, 100),
      query(['country'], current, 50),
      query(['device'], current, 5),
      safeQuery(['searchAppearance'], current, 25),
    ])

    const t = totalsCur[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 }
    const p = totalsPrev[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 }
    const pctChange = (cur: number, prev: number) =>
      prev > 0 ? Number((((cur - prev) / prev) * 100).toFixed(1)) : 0

    const totals = {
      clicks: t.clicks,
      impressions: t.impressions,
      ctr: Number((t.ctr * 100).toFixed(2)),
      position: Number(t.position.toFixed(1)),
    }
    const changes = {
      clicks: pctChange(t.clicks, p.clicks),
      impressions: pctChange(t.impressions, p.impressions),
      ctr: pctChange(t.ctr, p.ctr),
      // For position, lower is better — report the raw delta (negative = improved).
      position: Number((t.position - p.position).toFixed(1)),
    }

    const toRow = (r: GscApiRow) => ({
      key: r.keys?.[0] ?? '(not set)',
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: Number((r.ctr * 100).toFixed(2)),
      position: Number(r.position.toFixed(1)),
    })

    const deviceLabels: Record<string, string> = { DESKTOP: 'Desktop', MOBILE: 'Mobile', TABLET: 'Tablet' }

    return json({
      siteUrl,
      range,
      searchType,
      period: current,
      totals,
      changes,
      timeseries: timeseries.map((r) => ({
        date: r.keys?.[0] ?? '',
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Number((r.ctr * 100).toFixed(2)),
        position: Number(r.position.toFixed(1)),
      })),
      queries: queries.map(toRow),
      pages: pages.map(toRow),
      countries: countries.map(toRow),
      devices: devices.map((r) => {
        const row = toRow(r)
        return { ...row, key: deviceLabels[row.key.toUpperCase()] ?? row.key }
      }),
      searchAppearance: searchAppearance.map(toRow),
    })
  } catch (e) {
    console.error('[gsc-report] unexpected error', e)
    return json({ error: 'gsc_api_error', message: e instanceof Error ? e.message : 'Unknown error' }, 500)
  }
})
