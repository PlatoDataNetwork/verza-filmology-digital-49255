import {
  Users,
  UserCheck,
  MousePointerClick,
  Eye,
  Activity,
  Timer,
  type LucideIcon,
} from "lucide-react";

/**
 * Google Analytics (GA4) data layer.
 *
 * Everything here is mock data shaped to mirror what the Google Analytics
 * Data API (GA4) returns. When the real integration is built, replace the
 * bodies of the `getAnalytics*` functions with calls to a secure backend edge
 * function (e.g. `supabase.functions.invoke("ga4-report", { body: { ... } })`).
 *
 * IMPORTANT: Google API credentials / service-account keys must live ONLY on
 * the server (edge function secrets). The frontend should never hold them — it
 * only ever calls our own backend, which proxies the GA4 Data API.
 */

export type DateRangeKey = "7d" | "28d" | "90d";

export const DATE_RANGES: { key: DateRangeKey; label: string; days: number }[] = [
  { key: "7d", label: "Last 7 days", days: 7 },
  { key: "28d", label: "Last 28 days", days: 28 },
  { key: "90d", label: "Last 90 days", days: 90 },
];

export interface GaProperty {
  /** GA4 property id, e.g. "properties/123456789". */
  id: string;
  displayName: string;
  /** Measurement ID, e.g. "G-XXXXXXXXXX". */
  measurementId: string;
}

export interface GaConnection {
  connected: boolean;
  /** The currently selected property (null when not connected). */
  property: GaProperty | null;
  /** Available properties to choose from once an account is linked. */
  availableProperties: GaProperty[];
}

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
  /** Optional secondary value (e.g. sessions vs users). */
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
  /** Active users per minute for the last 30 minutes. */
  perMinute: { minute: number; users: number }[];
  /** Active users by top pages right now. */
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

const MOCK_PROPERTIES: GaProperty[] = [
  { id: "properties/318401234", displayName: "Verza TV — Web", measurementId: "G-VERZA01TV" },
  { id: "properties/318405678", displayName: "Verza TV — App", measurementId: "G-VERZA02AP" },
];

/**
 * Connection status. Wire this to real OAuth / connector state later.
 * Defaults to "not connected" so the connect UI and empty states are visible.
 */
export async function getAnalyticsConnection(): Promise<GaConnection> {
  await delay(250);
  return {
    connected: false,
    property: null,
    availableProperties: MOCK_PROPERTIES,
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildTimeseries(days: number): GaTimePoint[] {
  const out: GaTimePoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const base = 6000 + Math.round(Math.sin(i / 3) * 1400);
    const sessions = base + Math.round(Math.random() * 1800);
    out.push({
      date: d.toISOString().slice(0, 10),
      sessions,
      users: Math.round(sessions * 0.72) + Math.round(Math.random() * 400),
      pageViews: Math.round(sessions * 2.4) + Math.round(Math.random() * 1200),
    });
  }
  return out;
}

function sum<T>(rows: T[], pick: (r: T) => number) {
  return rows.reduce((acc, r) => acc + pick(r), 0);
}

/**
 * Main report fetch. Replace with a secure backend call that proxies the GA4
 * Data API `runReport` endpoint using server-side credentials.
 */
export async function getAnalyticsData(range: DateRangeKey): Promise<AnalyticsData> {
  await delay(600);
  const def = DATE_RANGES.find((r) => r.key === range) ?? DATE_RANGES[1];
  const timeseries = buildTimeseries(def.days);

  const totalSessions = sum(timeseries, (t) => t.sessions);
  const totalUsers = sum(timeseries, (t) => t.users);
  const totalViews = sum(timeseries, (t) => t.pageViews);

  const metrics: GaMetric[] = [
    { key: "sessions", label: "Sessions", value: totalSessions, change: 8.4, icon: Activity, format: "compact" },
    { key: "users", label: "Users", value: totalUsers, change: 5.1, icon: Users, format: "compact" },
    { key: "newUsers", label: "New Users", value: Math.round(totalUsers * 0.41), change: 11.2, icon: UserCheck, format: "compact" },
    { key: "pageViews", label: "Page Views", value: totalViews, change: -1.8, icon: Eye, format: "compact" },
    { key: "engagementRate", label: "Engagement Rate", value: 62.7, change: 3.4, icon: MousePointerClick, format: "percent" },
    { key: "avgSession", label: "Avg. Session", value: 134, change: 2.2, icon: Timer, format: "duration" },
  ];

  return {
    metrics,
    timeseries,
    trafficSources: [
      { label: "Organic Search", value: 42 },
      { label: "Direct", value: 24 },
      { label: "Social", value: 16 },
      { label: "Referral", value: 11 },
      { label: "Email", value: 5 },
      { label: "Paid Search", value: 2 },
    ],
    topPages: [
      { path: "/", title: "Home", pageViews: 48210, avgTime: 96 },
      { path: "/investors", title: "Investors", pageViews: 21940, avgTime: 184 },
      { path: "/about", title: "About", pageViews: 15320, avgTime: 72 },
      { path: "/team", title: "Team", pageViews: 9870, avgTime: 65 },
      { path: "/faq", title: "FAQ", pageViews: 7640, avgTime: 112 },
      { path: "/news", title: "News", pageViews: 6210, avgTime: 58 },
    ],
    devices: [
      { label: "Mobile", value: 58 },
      { label: "Desktop", value: 35 },
      { label: "Tablet", value: 7 },
    ],
    countries: [
      { label: "United States", value: 38450 },
      { label: "United Kingdom", value: 12300 },
      { label: "Canada", value: 8910 },
      { label: "Germany", value: 6740 },
      { label: "Australia", value: 5120 },
      { label: "India", value: 4830 },
    ],
  };
}

/**
 * Realtime active users. Replace with a backend call proxying the GA4
 * `runRealtimeReport` endpoint.
 */
export async function getAnalyticsRealtime(): Promise<GaRealtime> {
  await delay(400);
  const perMinute = Array.from({ length: 30 }).map((_, i) => ({
    minute: i,
    users: 30 + Math.round(Math.abs(Math.sin(i / 4)) * 70) + Math.round(Math.random() * 20),
  }));
  return {
    activeUsers: 248,
    perMinute,
    topPages: [
      { path: "/", users: 96 },
      { path: "/investors", users: 54 },
      { path: "/about", users: 38 },
      { path: "/faq", users: 22 },
    ],
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
