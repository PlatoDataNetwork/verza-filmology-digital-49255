import {
  MousePointerClick,
  Eye,
  Percent,
  ArrowUpDown,
  type LucideIcon,
} from "lucide-react";

/**
 * Google Search Console data layer.
 *
 * Everything here is mock data shaped to mirror what the Search Console
 * Search Analytics API returns (the `searchAnalytics.query` endpoint).
 * When the real integration is built, replace the bodies of the `getGsc*`
 * functions with calls to a secure backend edge function that proxies the
 * GSC API using the server-side OAuth connection.
 *
 * IMPORTANT: GSC credentials / OAuth tokens must live ONLY on the server
 * (edge function + connector gateway). The frontend never holds them — it only
 * ever calls our own backend, which proxies the Search Console API.
 */

export type GscDateRangeKey = "7d" | "28d" | "90d";

export const GSC_DATE_RANGES: { key: GscDateRangeKey; label: string; days: number }[] = [
  { key: "7d", label: "Last 7 days", days: 7 },
  { key: "28d", label: "Last 28 days", days: 28 },
  { key: "90d", label: "Last 90 days", days: 90 },
];

export type GscSearchType = "web" | "image" | "video" | "news";

export const GSC_SEARCH_TYPES: { key: GscSearchType; label: string }[] = [
  { key: "web", label: "Web" },
  { key: "image", label: "Image" },
  { key: "video", label: "Video" },
  { key: "news", label: "News" },
];

export interface GscProperty {
  /** Property URL as registered in Search Console, e.g. "https://verzatv.io/". */
  siteUrl: string;
  displayName: string;
  /** "URL-prefix" or "Domain" property type. */
  type: "URL_PREFIX" | "DOMAIN";
}

export interface GscConnection {
  connected: boolean;
  /** The currently selected property (null when not connected). */
  property: GscProperty | null;
  /** Available properties to choose from once an account is linked. */
  availableProperties: GscProperty[];
}

export interface GscMetric {
  key: string;
  label: string;
  value: number;
  /** Percentage change vs. previous period (e.g. 12.4 = +12.4%). */
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
  key: string; // query text, page url, country, or device
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
}

const MOCK_PROPERTIES: GscProperty[] = [
  { siteUrl: "https://verzatv.io/", displayName: "verzatv.io", type: "DOMAIN" },
  { siteUrl: "https://verza-filmology-digital-49255.lovable.app/", displayName: "verza-filmology-digital (lovable.app)", type: "URL_PREFIX" },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Connection status. Wire this to the real GSC connector state later.
 * Defaults to "not connected" so the connect UI and empty states are visible.
 */
export async function getGscConnection(): Promise<GscConnection> {
  await delay(250);
  return {
    connected: false,
    property: null,
    availableProperties: MOCK_PROPERTIES,
  };
}

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}

function buildTimeseries(days: number, typeFactor: number): GscTimePoint[] {
  const out: GscTimePoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const impressions = Math.round((4200 + Math.sin(i / 4) * 900 + rand(0, 1100)) * typeFactor);
    const clicks = Math.round(impressions * (0.04 + Math.random() * 0.03));
    out.push({
      date: d.toISOString().slice(0, 10),
      clicks,
      impressions,
      ctr: +((clicks / impressions) * 100).toFixed(2),
      position: +(6 + Math.random() * 8).toFixed(1),
    });
  }
  return out;
}

function sum<T>(rows: T[], pick: (r: T) => number) {
  return rows.reduce((acc, r) => acc + pick(r), 0);
}

const QUERY_SAMPLES = [
  "verza tv", "verzatv app", "micro drama streaming", "alan mruvka", "larry namer",
  "vertical video app", "watch micro dramas", "verza originals", "buy sell miami show",
  "storage pirates show", "sugar babies miami", "creator revenue share app", "the vertical tea",
  "digital theatre app", "verza tv download",
];

const PAGE_SAMPLES = [
  "/", "/investors", "/about", "/team", "/faq", "/news", "/login", "/contact",
];

function buildRows(samples: string[], scale: number, typeFactor: number): GscRow[] {
  return samples
    .map((key) => {
      const impressions = Math.round(rand(400, 9000) * scale * typeFactor);
      const clicks = Math.round(impressions * (0.02 + Math.random() * 0.08));
      return {
        key,
        clicks,
        impressions,
        ctr: +((clicks / impressions) * 100).toFixed(2),
        position: +(1 + Math.random() * 24).toFixed(1),
      };
    })
    .sort((a, b) => b.clicks - a.clicks);
}

/**
 * Main report fetch. Replace with a secure backend call that proxies the GSC
 * `searchAnalytics.query` endpoint for the given range / search type.
 */
export async function getGscData(range: GscDateRangeKey, searchType: GscSearchType): Promise<GscData> {
  await delay(600);
  const def = GSC_DATE_RANGES.find((r) => r.key === range) ?? GSC_DATE_RANGES[1];
  const typeFactor = searchType === "web" ? 1 : searchType === "image" ? 0.45 : searchType === "video" ? 0.2 : 0.12;
  const timeseries = buildTimeseries(def.days, typeFactor);

  const totalClicks = sum(timeseries, (t) => t.clicks);
  const totalImpressions = sum(timeseries, (t) => t.impressions);
  const avgCtr = totalImpressions ? +((totalClicks / totalImpressions) * 100).toFixed(2) : 0;
  const avgPosition = +(sum(timeseries, (t) => t.position) / timeseries.length).toFixed(1);

  const metrics: GscMetric[] = [
    { key: "clicks", label: "Total Clicks", value: totalClicks, change: 9.2, icon: MousePointerClick, format: "compact" },
    { key: "impressions", label: "Total Impressions", value: totalImpressions, change: 4.7, icon: Eye, format: "compact" },
    { key: "ctr", label: "Average CTR", value: avgCtr, change: 1.4, icon: Percent, format: "percent" },
    { key: "position", label: "Average Position", value: avgPosition, change: -0.6, icon: ArrowUpDown, format: "position" },
  ];

  return {
    metrics,
    timeseries,
    queries: buildRows(QUERY_SAMPLES, 1, typeFactor),
    pages: buildRows(PAGE_SAMPLES, 1.4, typeFactor),
    countries: buildRows(
      ["United States", "United Kingdom", "Canada", "Australia", "Germany", "India"],
      1.6,
      typeFactor,
    ),
    devices: buildRows(["Mobile", "Desktop", "Tablet"], 3.2, typeFactor),
  };
}

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
