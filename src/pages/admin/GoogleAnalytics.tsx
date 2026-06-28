import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Calendar, RefreshCw, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { StatCard } from "@/components/admin/shared/StatCard";
import { DateRangeFilter } from "@/components/admin/shared/DateRangeFilter";
import { EmptyState } from "@/components/admin/shared/EmptyState";
import { ErrorState } from "@/components/admin/shared/ErrorState";
import { LoadingState } from "@/components/admin/shared/LoadingState";
import {
  CountriesCard,
  DonutChart,
  OverviewChart,
  RealtimeCard,
  TopPagesCard,
  TrafficSourcesCard,
} from "@/components/admin/analytics/AnalyticsCharts";
import {
  AnalyticsNotConfiguredError,
  DATE_RANGES,
  fetchAnalytics,
  formatGaValue,
  type AnalyticsData,
  type DateRangeKey,
  type GaRealtime,
} from "@/lib/admin/analyticsData";

type Status = "loading" | "ready" | "error" | "empty" | "not_configured";

const GoogleAnalytics = () => {
  const [range, setRange] = useState<DateRangeKey>("28d");
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [realtime, setRealtime] = useState<GaRealtime | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loadData = useCallback(async () => {
    setStatus("loading");
    try {
      const result = await fetchAnalytics(range);
      setPropertyId(result.propertyId);
      if (!result.data.timeseries.length && !result.data.metrics.some((m) => m.value > 0)) {
        setData(result.data);
        setRealtime(result.realtime);
        setStatus("empty");
        return;
      }
      setData(result.data);
      setRealtime(result.realtime);
      setStatus("ready");
    } catch (e) {
      if (e instanceof AnalyticsNotConfiguredError) {
        setStatus("not_configured");
        return;
      }
      console.error("[GoogleAnalytics] failed to load", e);
      setErrorMessage(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
    }
  }, [range]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const actions =
    status === "ready" || status === "empty" || status === "loading" ? (
      <>
        {propertyId && (
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Property {propertyId}
          </Badge>
        )}
        <DateRangeFilter<DateRangeKey>
          value={range}
          onChange={setRange}
          options={DATE_RANGES}
          icon={Calendar}
          ariaLabel="Date range"
          className="w-[170px]"
        />
        <Button variant="outline" size="icon" onClick={loadData} aria-label="Refresh">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </>
    ) : undefined;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        icon={BarChart3}
        title="Google Analytics"
        description="Live traffic and audience insights (GA4)."
        actions={actions}
      />

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
          title="Couldn’t load analytics"
          description={errorMessage || "Something went wrong fetching data from Google Analytics."}
          onRetry={loadData}
        />
      )}

      {status === "empty" && (
        <EmptyState description="There’s no analytics data for the selected period." />
      )}

      {status === "loading" && <LoadingState cards={6} cardColumns={6} blocks={1} />}

      {status === "ready" && data && realtime && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {data.metrics.map((m) => (
              <StatCard
                key={m.key}
                label={m.label}
                value={formatGaValue(m)}
                change={m.change}
                icon={m.icon}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OverviewChart data={data.timeseries} />
            </div>
            <RealtimeCard data={realtime} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <TrafficSourcesCard data={data.trafficSources} />
            <DonutChart
              title="Device Breakdown"
              description="Sessions by device category"
              data={data.devices}
              unit="%"
            />
            <CountriesCard data={data.countries} />
          </div>

          <TopPagesCard data={data.topPages} />
        </>
      )}
    </div>
  );
};

export default GoogleAnalytics;
