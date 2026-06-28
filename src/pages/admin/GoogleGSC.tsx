import { useCallback, useEffect, useState } from "react";
import { AlertCircle, Inbox, RefreshCw, Search } from "lucide-react";
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
import { ConnectGscCard } from "@/components/admin/gsc/ConnectGscCard";
import {
  GscDataTable,
  GscStatCard,
  PerformanceChart,
} from "@/components/admin/gsc/GscCharts";
import {
  GSC_DATE_RANGES,
  GSC_SEARCH_TYPES,
  getGscConnection,
  getGscData,
  type GscConnection,
  type GscData,
  type GscDateRangeKey,
  type GscProperty,
  type GscSearchType,
} from "@/lib/admin/gscData";

type Status = "loading" | "ready" | "error" | "empty";

const GoogleGSC = () => {
  const [connection, setConnection] = useState<GscConnection | null>(null);
  const [property, setProperty] = useState<GscProperty | null>(null);
  const [range, setRange] = useState<GscDateRangeKey>("28d");
  const [searchType, setSearchType] = useState<GscSearchType>("web");

  const [data, setData] = useState<GscData | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  // Load connection status once.
  useEffect(() => {
    let active = true;
    getGscConnection().then((c) => {
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
      const report = await getGscData(range, searchType);
      if (!report.timeseries.length) {
        setStatus("empty");
        return;
      }
      setData(report);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [range, searchType]);

  // Fetch report whenever a property is connected or the filters change.
  useEffect(() => {
    if (!property) return;
    loadData();
  }, [property, loadData]);

  const header = (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Search className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Google Search Console</h1>
          <p className="text-muted-foreground">
            {property ? property.displayName : "Search performance and indexing."}
          </p>
        </div>
      </div>
      {property && (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {property.type === "DOMAIN" ? "Domain" : "URL prefix"}
          </Badge>
          <Select value={searchType} onValueChange={(v) => setSearchType(v as GscSearchType)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GSC_SEARCH_TYPES.map((t) => (
                <SelectItem key={t.key} value={t.key}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={range} onValueChange={(v) => setRange(v as GscDateRangeKey)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GSC_DATE_RANGES.map((r) => (
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
        <ConnectGscCard connection={connection} onConnect={(p) => setProperty(p)} />
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
              <p className="font-medium">Couldn’t load search data</p>
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
                There’s no search data for the selected period and type.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "loading" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[116px] rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-[380px] rounded-xl" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Skeleton className="h-[320px] rounded-xl" />
            <Skeleton className="h-[320px] rounded-xl" />
          </div>
        </div>
      )}

      {status === "ready" && data && (
        <>
          {/* Metric cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.metrics.map((m) => (
              <GscStatCard key={m.key} metric={m} />
            ))}
          </div>

          {/* Performance over time */}
          <PerformanceChart data={data.timeseries} />

          {/* Queries + pages */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <GscDataTable
              title="Top Queries"
              description="Search terms driving traffic"
              dimensionLabel="Query"
              rows={data.queries}
            />
            <GscDataTable
              title="Top Pages"
              description="Best performing pages in search"
              dimensionLabel="Page"
              rows={data.pages}
              renderKey={(key) => <span className="text-primary">{key}</span>}
            />
          </div>

          {/* Countries + devices */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <GscDataTable
              title="Countries"
              description="Performance by country"
              dimensionLabel="Country"
              rows={data.countries}
            />
            <GscDataTable
              title="Devices"
              description="Performance by device type"
              dimensionLabel="Device"
              rows={data.devices}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleGSC;
