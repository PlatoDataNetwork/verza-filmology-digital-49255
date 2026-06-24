import {
  Users,
  UserCheck,
  MousePointerClick,
  Eye,
  Search,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

/**
 * Admin dashboard data layer.
 *
 * Everything here is mock data shaped to mirror what real API responses
 * (Google Analytics, Search Console, app DB) would return. Swap the bodies of
 * the `getAdmin*` functions for real fetches later — component code stays the same.
 */

export interface StatMetric {
  key: string;
  label: string;
  value: number;
  /** Percentage change vs. previous period (e.g. 12.4 = +12.4%). */
  change: number;
  icon: LucideIcon;
  /** How to render the value. */
  format?: "number" | "compact";
}

export interface TrafficPoint {
  date: string;
  pageViews: number;
  sessions: number;
}

export interface UsersPoint {
  date: string;
  newUsers: number;
  returningUsers: number;
}

export interface EngagementSlice {
  channel: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string; // ISO string
}

export interface DashboardData {
  stats: StatMetric[];
  traffic: TrafficPoint[];
  users: UsersPoint[];
  engagement: EngagementSlice[];
  activity: ActivityItem[];
}

const STAT_DEFS: StatMetric[] = [
  { key: "totalUsers", label: "Total Users", value: 48293, change: 12.4, icon: Users, format: "compact" },
  { key: "activeUsers", label: "Active Users", value: 8124, change: 4.8, icon: UserCheck, format: "compact" },
  { key: "totalSessions", label: "Total Sessions", value: 132540, change: 9.1, icon: BarChart3, format: "compact" },
  { key: "pageViews", label: "Page Views", value: 421980, change: -2.3, icon: Eye, format: "compact" },
  { key: "searchClicks", label: "Search Clicks", value: 18760, change: 18.7, icon: MousePointerClick, format: "compact" },
  { key: "searchImpressions", label: "Search Impressions", value: 962400, change: 6.5, icon: Search, format: "compact" },
];

function buildTraffic(): TrafficPoint[] {
  const days = 14;
  const out: TrafficPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const base = 8000 + Math.round(Math.sin(i / 2) * 1500);
    out.push({
      date: d.toISOString().slice(0, 10),
      pageViews: base + Math.round(Math.random() * 2500),
      sessions: Math.round(base * 0.42) + Math.round(Math.random() * 800),
    });
  }
  return out;
}

function buildUsers(): UsersPoint[] {
  const days = 14;
  const out: UsersPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({
      date: d.toISOString().slice(0, 10),
      newUsers: 320 + Math.round(Math.random() * 280),
      returningUsers: 540 + Math.round(Math.random() * 320),
    });
  }
  return out;
}

const ENGAGEMENT: EngagementSlice[] = [
  { channel: "Organic Search", value: 42 },
  { channel: "Direct", value: 26 },
  { channel: "Social", value: 18 },
  { channel: "Referral", value: 9 },
  { channel: "Email", value: 5 },
];

function buildActivity(): ActivityItem[] {
  const now = Date.now();
  const min = 60 * 1000;
  return [
    { id: "1", actor: "New user", action: "signed up", target: "via Google", timestamp: new Date(now - 3 * min).toISOString() },
    { id: "2", actor: "Traffic spike", action: "detected on", target: "/investors", timestamp: new Date(now - 22 * min).toISOString() },
    { id: "3", actor: "Search Console", action: "synced", target: "962K impressions", timestamp: new Date(now - 65 * min).toISOString() },
    { id: "4", actor: "New user", action: "signed up", target: "via Email", timestamp: new Date(now - 3 * 60 * min).toISOString() },
    { id: "5", actor: "Analytics", action: "report ready", target: "Weekly summary", timestamp: new Date(now - 8 * 60 * min).toISOString() },
    { id: "6", actor: "Page Views", action: "milestone reached", target: "400K total", timestamp: new Date(now - 26 * 60 * min).toISOString() },
  ];
}

/** Replace the bodies below with real API calls when available. */
export async function getAdminDashboardData(): Promise<DashboardData> {
  return {
    stats: STAT_DEFS,
    traffic: buildTraffic(),
    users: buildUsers(),
    engagement: ENGAGEMENT,
    activity: buildActivity(),
  };
}

export function formatStatValue(metric: StatMetric): string {
  if (metric.format === "compact") {
    return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(metric.value);
  }
  return new Intl.NumberFormat("en").format(metric.value);
}
