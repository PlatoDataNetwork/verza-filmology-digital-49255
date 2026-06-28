import { useCallback, useEffect, useState } from "react";
import { AlertCircle, BarChart3, Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConnectCard } from "@/components/admin/analytics/ConnectCard";
import {
  CountriesCard,
  DonutChart,
  GaStatCard,
  OverviewChart,
  RealtimeCard,
  TopPagesCard,
  TrafficSourcesCard,
} from "@/components/admin/analytics/AnalyticsCharts";
import {
  DATE_RANGES,
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

  // Load connection status once.
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

  // Fetch report data whenever a property is connected or the range changes.
  useEffect(() => {
    if (!property) return;
    loadData();
  }, [property, loadData]);

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Google Analytics</h1>
          <p className="text-muted-foreground">
            {property ? property.displayName : "Traffic and audience insights (GA4)."}
          </p>
        </div>
      </div>
      {property && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {property.measurementId}
          </Badge>
          <Select value={range} onValueChange={(v) => setRange(v as DateRangeKey)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map((r) => (
                <SelectItem key={r.key} value={r.key}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={loadData} aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  // Connection still loading.
  if (!connection) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        {header}
        <Skeleton className="h-[180px] rounded-xl" />
      </div>
    );
  }

  // Not connected → show connect UI.
  if (!property) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        {header}
        <ConnectCard connection={connection} onConnect={(p) => setProperty(p)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {header}

      {status === "error" && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 p-12 text-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <div>
              <p className="font-medium">Couldn’t load analytics</p>
              <p className="text-sm text-muted-foreground">
                Something went wrong fetching data for this property.
              </p>
            </div>
            <Button onClick={loadData} variant="outline">
              <RefreshCw className="h-4 w-4" /> Try again
            </Button>
          </CardContent>
        </Card>
      )}

      {status === "empty" && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 p-12 text-center">
            <Inbox className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-medium">No data yet</p>
              <p className="text-sm text-muted-foreground">
                There’s no analytics data for the selected period.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "loading" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[116px] rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Skeleton className="h-[360px] rounded-xl lg:col-span-2" />
            <Skeleton className="h-[360px] rounded-xl" />
          </div>
        </div>
      )}

      {status === "ready" && data && realtime && (
        <>
          {/* Metric cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {data.metrics.map((m) => (
              <GaStatCard key={m.key} metric={m} />
            ))}
          </div>

          {/* Overview + realtime */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OverviewChart data={data.timeseries} />
            </div>
            <RealtimeCard data={realtime} />
          </div>

          {/* Sources + devices + countries */}
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

          {/* Top pages */}
          <TopPagesCard data={data.topPages} />
        </>
      )}
    </div>
  );
};

export default GoogleAnalytics;
