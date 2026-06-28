import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Settings as SettingsIcon, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { StatCard } from "@/components/admin/shared/StatCard";
import { EmptyState } from "@/components/admin/shared/EmptyState";
import { ErrorState } from "@/components/admin/shared/ErrorState";
import { LoadingState } from "@/components/admin/shared/LoadingState";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { EngagementChart, TrafficChart } from "@/components/admin/DashboardCharts";
import { TopPagesCard } from "@/components/admin/analytics/AnalyticsCharts";
import { getRecentActivity } from "@/lib/admin/dashboardData";
import {
  AnalyticsNotConfiguredError,
  fetchAnalytics,
  formatGaValue,
  type AnalyticsResult,
} from "@/lib/admin/analyticsData";
import {
  fetchGscData,
  formatGscValue,
  type GscMetric,
} from "@/lib/admin/gscData";

type Status = "loading" | "ready" | "error" | "not_configured";

const AdminDashboard = () => {
  const [result, setResult] = useState<AnalyticsResult | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const [gscMetrics, setGscMetrics] = useState<GscMetric[] | null>(null);
  const [gscStatus, setGscStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetchAnalytics("28d");
      setResult(res);
      setStatus("ready");
    } catch (e) {
      if (e instanceof AnalyticsNotConfiguredError) {
        setStatus("not_configured");
        return;
      }
      console.error("[AdminDashboard] failed to load analytics", e);
      setErrorMessage(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
    }
  }, []);

  const loadGsc = useCallback(async () => {
    setGscStatus("loading");
    try {
      const res = await fetchGscData({ range: "28d", searchType: "web" });
      setGscMetrics(res.data.metrics);
      setGscStatus("ready");
    } catch (e) {
      // Search Console is optional on the dashboard — degrade gracefully.
      console.warn("[AdminDashboard] Search Console unavailable", e);
      setGscStatus("unavailable");
    }
  }, []);

  useEffect(() => {
    load();
    loadGsc();
  }, [load, loadGsc]);

  const activity = getRecentActivity();


  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        icon={LayoutDashboard}
        title="Dashboard"
        description="Overview of traffic, users, and engagement (GA4 · last 28 days)."
      />

      {status === "loading" && <LoadingState cards={6} cardColumns={6} blocks={1} />}

      {status === "not_configured" && (
        <EmptyState
          icon={SettingsIcon}
          title="Google Analytics not configured"
          description="Google Analytics Property ID is not configured. Please add it in Admin Settings."
          action={
            <Button asChild variant="outline">
              <Link to="/admin/settings">
                <SettingsIcon className="h-4 w-4" /> Go to Settings
              </Link>
            </Button>
          }
        />
      )}

      {status === "error" && (
        <ErrorState
          title="Couldn’t load dashboard"
          description={errorMessage || "Something went wrong fetching analytics data."}
          onRetry={load}
        />
      )}

      {/* Search Console overview (independent of GA configuration) */}
      {gscStatus !== "unavailable" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground">Search Console · last 28 days</h2>
            <Button asChild variant="link" size="sm" className="h-auto p-0 text-xs">
              <Link to="/admin/google-gsc">View details</Link>
            </Button>
          </div>
          {gscStatus === "loading" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[116px] rounded-xl" />
              ))}
            </div>
          )}
          {gscStatus === "ready" && gscMetrics && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gscMetrics.map((m) => (
                <StatCard
                  key={m.key}
                  label={m.label.replace("Total ", "Search ").replace("Average ", "Avg. ")}
                  value={formatGscValue(m)}
                  change={m.change}
                  changeSuffix={m.format === "position" ? "" : "%"}
                  icon={m.icon}
                  lowerIsBetter={m.format === "position"}
                  caption="vs last period"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {status === "ready" && result && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard
              label="Active Users"
              value={new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(
                result.realtime.activeUsers,
              )}
              icon={UserCheck}
              caption="right now"
            />
            {result.data.metrics
              .filter((m) => ["users", "sessions", "pageViews", "newUsers", "engagementRate"].includes(m.key))
              .map((m) => (
                <StatCard
                  key={m.key}
                  label={m.label}
                  value={formatGaValue(m)}
                  change={m.change}
                  icon={m.icon}
                  caption="vs last period"
                />
              ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TrafficChart data={result.data.timeseries} />
            </div>
            <EngagementChart
              data={result.data.trafficSources.map((s) => ({ channel: s.label, value: s.value }))}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TopPagesCard data={result.data.topPages} />
            </div>
            <RecentActivity items={activity} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
