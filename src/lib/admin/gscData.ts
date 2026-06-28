import {
  MousePointerClick,
  Eye,
  Percent,
  ArrowUpDown,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getIntegrationSettings } from "@/lib/admin/settingsData";

/**
 * Google Search Console data layer (searchConsoleService).
 *
 * Real data is fetched through the `gsc-report` Supabase Edge Function, which
 * holds the Google OAuth connection server-side and proxies the Search Console
 * Search Analytics API. The frontend never touches Google credentials — it only
 * calls our own backend and reads the saved Site URL from `integration_settings`.
 *
 * All Search Console logic is kept separate from the Google Analytics layer
 * (`analyticsData.ts`).
 */

export type GscDateRangeKey = "7d" | "28d" | "90d" | "6m" | "12m" | "custom";

export const GSC_DATE_RANGES: { key: GscDateRangeKey; label: string; days: number }[] = [
  { key: "7d", label: "Last 7 days", days: 7 },
  { key: "28d", label: "Last 28 days", days: 28 },
  { key: "90d", label: "Last 90 days", days: 90 },
  { key: "6m", label: "Last 6 months", days: 182 },
  { key: "12m", label: "Last 12 months", days: 365 },
  { key: "custom", label: "Custom range", days: 0 },
];

export type GscSearchType = "web" | "image" | "video" | "news";

export const GSC_SEARCH_TYPES: { key: GscSearchType; label: string }[] = [
  { key: "web", label: "Web" },
  { key: "image", label: "Image" },
  { key: "video", label: "Video" },
  { key: "news", label: "News" },
];

export interface GscMetric {
  key: string;
  label: string;
  value: number;
  /** Percentage change vs. previous period (e.g. 12.4 = +12.4%). For position this is the raw delta. */
  change: number;
  icon: LucideIcon;
  format: "number" | "compact" | "percent" | "position";
}

export interface GscTimePoint {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number; // 0-100
  position: number;
}

/** A row from the `searchAnalytics.query` response (a single dimension key). */
export interface GscRow {
  key: string; // query text, page url, country, device, or search appearance
  clicks: number;
  impressions: number;
  ctr: number; // 0-100
  position: number;
}

export interface GscData {
  metrics: GscMetric[];
  timeseries: GscTimePoint[];
  queries: GscRow[];
  pages: GscRow[];
  countries: GscRow[];
  devices: GscRow[];
  searchAppearance: GscRow[];
}

/** Raised when the Search Console Site URL is not saved in Admin Settings. */
export class GscNotConfiguredError extends Error {
  constructor(
    message = "Google Search Console has not been configured. Please complete the setup in Admin → Settings.",
  ) {
    super(message);
    this.name = "GscNotConfiguredError";
  }
}

/** Raised when the connected account lacks access to the configured property. */
export class GscPermissionError extends Error {
  constructor(message = "Access denied for this Search Console property.") {
    super(message);
    this.name = "GscPermissionError";
  }
}

// ---------------------------------------------------------------------------
// Edge function shape
// ---------------------------------------------------------------------------

interface GscReportResponse {
  error?: string;
  message?: string;
  siteUrl?: string;
  totals?: { clicks: number; impressions: number; ctr: number; position: number };
  changes?: { clicks: number; impressions: number; ctr: number; position: number };
  timeseries?: GscTimePoint[];
  queries?: GscRow[];
  pages?: GscRow[];
  countries?: GscRow[];
  devices?: GscRow[];
  searchAppearance?: GscRow[];
}

export interface GscResult {
  siteUrl: string;
  data: GscData;
}

export interface GscFetchArgs {
  range: GscDateRangeKey;
  searchType: GscSearchType;
  /** Required when range === "custom". */
  startDate?: string;
  endDate?: string;
}

/** Reads the saved Site URL (non-sensitive) from integration settings. */
export async function getSavedSiteUrl(): Promise<string | null> {
  const settings = await getIntegrationSettings();
  const gsc = settings.google_search_console;
  const siteUrl = (gsc?.config as { siteUrl?: string } | undefined)?.siteUrl;
  if (gsc && gsc.enabled === false) return null;
  return siteUrl && siteUrl.trim() ? siteUrl.trim() : null;
}

/**
 * Fetch Search Console data via the secure edge function.
 * Throws GscNotConfiguredError / GscPermissionError for those states.
 */
export async function fetchGscData(args: GscFetchArgs): Promise<GscResult> {
  const siteUrl = await getSavedSiteUrl();
  if (!siteUrl) {
    throw new GscNotConfiguredError();
  }

  const { data, error } = await supabase.functions.invoke<GscReportResponse>("gsc-report", {
    body: args,
  });

  if (error) {
    console.error("[gsc] gsc-report invocation failed", error);
    throw new Error(error.message || "Failed to load Search Console data");
  }
  if (!data) {
    throw new Error("No response from Search Console service");
  }
  if (data.error) {
    if (data.error === "not_configured") throw new GscNotConfiguredError(data.message);
    if (data.error === "permission_error") throw new GscPermissionError(data.message);
    console.error("[gsc] gsc-report returned error", data.error, data.message);
    throw new Error(data.message || "Google Search Console request failed");
  }

  return { siteUrl: data.siteUrl ?? siteUrl, data: toGscData(data) };
}

function toGscData(res: GscReportResponse): GscData {
  const t = res.totals ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const c = res.changes ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };

  const metrics: GscMetric[] = [
    { key: "clicks", label: "Total Clicks", value: t.clicks, change: c.clicks, icon: MousePointerClick, format: "compact" },
    { key: "impressions", label: "Total Impressions", value: t.impressions, change: c.impressions, icon: Eye, format: "compact" },
    { key: "ctr", label: "Average CTR", value: t.ctr, change: c.ctr, icon: Percent, format: "percent" },
    { key: "position", label: "Average Position", value: t.position, change: c.position, icon: ArrowUpDown, format: "position" },
  ];

  return {
    metrics,
    timeseries: res.timeseries ?? [],
    queries: res.queries ?? [],
    pages: res.pages ?? [],
    countries: res.countries ?? [],
    devices: res.devices ?? [],
    searchAppearance: res.searchAppearance ?? [],
  };
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export function formatGscValue(metric: GscMetric): string {
  switch (metric.format) {
    case "compact":
      return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(metric.value);
    case "percent":
      return `${metric.value.toFixed(1)}%`;
    case "position":
      return metric.value.toFixed(1);
    default:
      return new Intl.NumberFormat("en").format(metric.value);
  }
}

export function formatCellValue(value: number, kind: "clicks" | "impressions" | "ctr" | "position"): string {
  switch (kind) {
    case "ctr":
      return `${value.toFixed(2)}%`;
    case "position":
      return value.toFixed(1);
    default:
      return value.toLocaleString();
  }
}
