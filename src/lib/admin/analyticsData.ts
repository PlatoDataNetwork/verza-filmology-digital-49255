import {
  Users,
  UserCheck,
  MousePointerClick,
  Eye,
  Activity,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getIntegrationSettings } from "@/lib/admin/settingsData";

/**
 * Google Analytics (GA4) data layer.
 *
 * Real data is fetched through the `ga4-report` Supabase Edge Function, which
 * holds the Google service-account credentials server-side and proxies the GA4
 * Data API. The frontend never touches Google credentials — it only calls our
 * own backend and reads the saved Property ID from `integration_settings`.
 */

export type DateRangeKey = "7d" | "28d" | "90d";

export const DATE_RANGES: { key: DateRangeKey; label: string; days: number }[] = [
  { key: "7d", label: "Last 7 days", days: 7 },
  { key: "28d", label: "Last 28 days", days: 28 },
  { key: "90d", label: "Last 90 days", days: 90 },
];

export interface GaMetric {
  key: string;
  label: string;
  value: number;
  /** Percentage change vs. previous period (e.g. 12.4 = +12.4%). */
  change: number;
  icon: LucideIcon;
  format?: "number" | "compact" | "duration" | "percent";
}

export interface GaTimePoint {
  date: string;
  sessions: number;
  users: number;
  pageViews: number;
}

export interface GaDimensionRow {
  label: string;
  value: number;
  secondary?: number;
}

export interface GaTopPage {
  path: string;
  title: string;
  pageViews: number;
  avgTime: number; // seconds
}

export interface GaRealtime {
  activeUsers: number;
  perMinute: { minute: number; users: number }[];
  topPages: { path: string; users: number }[];
}

export interface AnalyticsData {
  metrics: GaMetric[];
  timeseries: GaTimePoint[];
  trafficSources: GaDimensionRow[];
  topPages: GaTopPage[];
  devices: GaDimensionRow[];
  countries: GaDimensionRow[];
}

/** Shape returned by the ga4-report edge function. */
export interface Ga4ReportResponse {
  propertyId?: string;
  totals?: {
    sessions: number;
    users: number;
    newUsers: number;
    pageViews: number;
    engagementRate: number;
    avgSession: number;
  };
  changes?: {
    sessions: number;
    users: number;
    newUsers: number;
    pageViews: number;
    engagementRate: number;
    avgSession: number;
  };
  timeseries?: GaTimePoint[];
  trafficSources?: GaDimensionRow[];
  topPages?: GaTopPage[];
  devices?: GaDimensionRow[];
  countries?: GaDimensionRow[];
  realtime?: GaRealtime;
  error?: string;
  message?: string;
}

export interface AnalyticsResult {
  data: AnalyticsData;
  realtime: GaRealtime;
  propertyId: string;
}

/** Raised when the GA4 Property ID is not saved in Admin Settings. */
export class AnalyticsNotConfiguredError extends Error {
  constructor(message = "Google Analytics Property ID is not configured. Please add it in Admin Settings.") {
    super(message);
    this.name = "AnalyticsNotConfiguredError";
  }
}

/** Reads the saved GA4 Property ID (non-sensitive) from integration settings. */
export async function getSavedPropertyId(): Promise<string | null> {
  const settings = await getIntegrationSettings();
  const ga = settings.google_analytics;
  const propertyId = (ga?.config as { propertyId?: string } | undefined)?.propertyId;
  if (import.meta.env.DEV) {
    console.log("[analytics] saved GA4 propertyId:", propertyId ?? "(none)", "enabled:", ga?.enabled);
  }
  return propertyId && propertyId.trim() ? propertyId.trim() : null;
}

/**
 * Fetch GA4 data via the secure edge function for the given date range.
 * Throws AnalyticsNotConfiguredError when no Property ID is configured.
 */
export async function fetchAnalytics(range: DateRangeKey): Promise<AnalyticsResult> {
  const propertyId = await getSavedPropertyId();
  if (!propertyId) {
    throw new AnalyticsNotConfiguredError();
  }

  if (import.meta.env.DEV) {
    console.log("[analytics] invoking ga4-report edge function", { range });
  }

  const { data, error } = await supabase.functions.invoke<Ga4ReportResponse>("ga4-report", {
    body: { range },
  });

  if (error) {
    console.error("[analytics] ga4-report invocation failed", error);
    throw new Error(error.message || "Failed to load analytics data");
  }
  if (!data) {
    throw new Error("No response from analytics service");
  }
  if (data.error) {
    if (data.error === "not_configured") {
      throw new AnalyticsNotConfiguredError(data.message);
    }
    console.error("[analytics] ga4-report returned error", data.error, data.message);
    throw new Error(data.message || "Google Analytics request failed");
  }

  if (import.meta.env.DEV) {
    console.log("[analytics] ga4-report response received", {
      sessions: data.totals?.sessions,
      timeseriesPoints: data.timeseries?.length,
      realtimeActive: data.realtime?.activeUsers,
    });
  }

  return {
    propertyId: data.propertyId ?? propertyId,
    data: toAnalyticsData(data),
    realtime:
      data.realtime ?? { activeUsers: 0, perMinute: [], topPages: [] },
  };
}

function toAnalyticsData(res: Ga4ReportResponse): AnalyticsData {
  const t = res.totals ?? {
    sessions: 0,
    users: 0,
    newUsers: 0,
    pageViews: 0,
    engagementRate: 0,
    avgSession: 0,
  };
  const c = res.changes ?? {
    sessions: 0,
    users: 0,
    newUsers: 0,
    pageViews: 0,
    engagementRate: 0,
    avgSession: 0,
  };

  const metrics: GaMetric[] = [
    { key: "sessions", label: "Sessions", value: t.sessions, change: c.sessions, icon: Activity, format: "compact" },
    { key: "users", label: "Users", value: t.users, change: c.users, icon: Users, format: "compact" },
    { key: "newUsers", label: "New Users", value: t.newUsers, change: c.newUsers, icon: UserCheck, format: "compact" },
    { key: "pageViews", label: "Page Views", value: t.pageViews, change: c.pageViews, icon: Eye, format: "compact" },
    { key: "engagementRate", label: "Engagement Rate", value: t.engagementRate, change: c.engagementRate, icon: MousePointerClick, format: "percent" },
    { key: "avgSession", label: "Avg. Session", value: t.avgSession, change: c.avgSession, icon: Timer, format: "duration" },
  ];

  return {
    metrics,
    timeseries: res.timeseries ?? [],
    trafficSources: res.trafficSources ?? [],
    topPages: res.topPages ?? [],
    devices: res.devices ?? [],
    countries: res.countries ?? [],
  };
}

export function formatGaValue(metric: GaMetric): string {
  switch (metric.format) {
    case "compact":
      return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(metric.value);
    case "percent":
      return `${metric.value.toFixed(1)}%`;
    case "duration":
      return formatDuration(metric.value);
    default:
      return new Intl.NumberFormat("en").format(metric.value);
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}
