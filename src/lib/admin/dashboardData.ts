/**
 * Admin dashboard data layer.
 *
 * Traffic, user and engagement stats come from Google Analytics (GA4) via the
 * secure `ga4-report` edge function (see `analyticsData.ts`). Only the recent
 * activity feed below remains local/mock — replace it with a real audit/event
 * source when one exists.
 */

export interface TrafficPoint {
  date: string;
  pageViews: number;
  sessions: number;
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

/** Recent activity feed (local placeholder until a real event source exists). */
export function getRecentActivity(): ActivityItem[] {
  const now = Date.now();
  const min = 60 * 1000;
  return [
    { id: "1", actor: "New user", action: "signed up", target: "via Google", timestamp: new Date(now - 3 * min).toISOString() },
    { id: "2", actor: "Traffic spike", action: "detected on", target: "/investors", timestamp: new Date(now - 22 * min).toISOString() },
    { id: "3", actor: "Search Console", action: "synced", target: "search performance", timestamp: new Date(now - 65 * min).toISOString() },
    { id: "4", actor: "New user", action: "signed up", target: "via Email", timestamp: new Date(now - 3 * 60 * min).toISOString() },
    { id: "5", actor: "Analytics", action: "report ready", target: "Weekly summary", timestamp: new Date(now - 8 * 60 * min).toISOString() },
    { id: "6", actor: "Page Views", action: "milestone reached", target: "monthly total", timestamp: new Date(now - 26 * 60 * min).toISOString() },
  ];
}
