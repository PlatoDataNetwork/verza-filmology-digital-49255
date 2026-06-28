import { useCallback, useEffect, useState } from "react";
import { BarChart3, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { StatCard } from "@/components/admin/shared/StatCard";
import { DateRangeFilter } from "@/components/admin/shared/DateRangeFilter";
import { EmptyState } from "@/components/admin/shared/EmptyState";
import { ErrorState } from "@/components/admin/shared/ErrorState";
import { LoadingState } from "@/components/admin/shared/LoadingState";
import { ConnectCard } from "@/components/admin/analytics/ConnectCard";
import {
  CountriesCard,
  DonutChart,
  OverviewChart,
  RealtimeCard,
  TopPagesCard,
  TrafficSourcesCard,
} from "@/components/admin/analytics/AnalyticsCharts";
import {
  DATE_RANGES,
  formatGaValue,
  getAnalyticsConnection,
  getAnalyticsData,
  getAnalyticsRealtime,
  type AnalyticsData,
  type DateRangeKey,
  type GaConnection,
  type GaProperty,
  type GaRealtime,
} from "@/lib/admin/analyticsData";

type Status = "loading" | "ready" | "error" | "empty";

const GoogleAnalytics = () => {
  const [connection, setConnection] = useState<GaConnection | null>(null);
  const [property, setProperty] = useState<GaProperty | null>(null);
  const [range, setRange] = useState<DateRangeKey>("28d");

  const [data, setData] = useState<AnalyticsData | null>(null);
  const [realtime, setRealtime] = useState<GaRealtime | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let active = true;
    getAnalyticsConnection().then((c) => {
      if (!active) return;
      setConnection(c);
      setProperty(c.connected ? c.property : null);
    });
    return () => {
      active = false;
    };
  }, []);

  const loadData = useCallback(async () => {
    setStatus("loading");
    try {
      const [report, rt] = await Promise.all([getAnalyticsData(range), getAnalyticsRealtime()]);
      if (!report.timeseries.length) {
        setStatus("empty");
        return;
      }
      setData(report);
      setRealtime(rt);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [range]);

  useEffect(() => {
    if (!property) return;
    loadData();
  }, [property, loadData]);

  const actions = property ? (
    <>
      <Badge variant="secondary" className="hidden sm:inline-flex">
        {property.measurementId}
      </Badge>
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
        description={property ? property.displayName : "Traffic and audience insights (GA4)."}
        actions={actions}
      />

      {!connection && <LoadingState cards={6} cardColumns={6} blocks={1} />}

      {connection && !property && (
        <ConnectCard connection={connection} onConnect={(p) => setProperty(p)} />
      )}

      {connection && property && (
        <>
          {status === "error" && (
            <ErrorState
              title="Couldn’t load analytics"
              description="Something went wrong fetching data for this property."
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
        </>
      )}
    </div>
  );
};

export default GoogleAnalytics;
