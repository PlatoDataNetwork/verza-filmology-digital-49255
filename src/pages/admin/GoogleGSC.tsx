import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { StatCard } from "@/components/admin/shared/StatCard";
import { ChartCard } from "@/components/admin/shared/ChartCard";
import { DataTable, type DataTableColumn } from "@/components/admin/shared/DataTable";
import { DateRangeFilter } from "@/components/admin/shared/DateRangeFilter";
import { EmptyState } from "@/components/admin/shared/EmptyState";
import { ErrorState } from "@/components/admin/shared/ErrorState";
import { LoadingState } from "@/components/admin/shared/LoadingState";
import { ConnectGscCard } from "@/components/admin/gsc/ConnectGscCard";
import { PerformanceChart } from "@/components/admin/gsc/GscCharts";
import {
  GSC_DATE_RANGES,
  GSC_SEARCH_TYPES,
  formatCellValue,
  formatGscValue,
  getGscConnection,
  getGscData,
  type GscConnection,
  type GscData,
  type GscDateRangeKey,
  type GscProperty,
  type GscRow,
  type GscSearchType,
} from "@/lib/admin/gscData";

type Status = "loading" | "ready" | "error" | "empty";

/** Column factory shared by every GSC dimension table. */
function gscColumns(dimensionLabel: string, renderKey?: (key: string) => React.ReactNode): DataTableColumn<GscRow>[] {
  return [
    {
      key: "key",
      header: dimensionLabel,
      sortValue: (r) => r.key,
      defaultSortDir: "asc",
      cell: (r) => (renderKey ? renderKey(r.key) : r.key),
      cellClassName: "max-w-[280px] truncate font-medium",
    },
    { key: "clicks", header: "Clicks", align: "right", sortValue: (r) => r.clicks, cell: (r) => formatCellValue(r.clicks, "clicks") },
    { key: "impressions", header: "Impressions", align: "right", sortValue: (r) => r.impressions, cell: (r) => formatCellValue(r.impressions, "impressions") },
    { key: "ctr", header: "CTR", align: "right", sortValue: (r) => r.ctr, cell: (r) => <span className="text-muted-foreground">{formatCellValue(r.ctr, "ctr")}</span> },
    { key: "position", header: "Position", align: "right", sortValue: (r) => r.position, defaultSortDir: "asc", cell: (r) => <span className="text-muted-foreground">{formatCellValue(r.position, "position")}</span> },
  ];
}

const GoogleGSC = () => {
  const [connection, setConnection] = useState<GscConnection | null>(null);
  const [property, setProperty] = useState<GscProperty | null>(null);
  const [range, setRange] = useState<GscDateRangeKey>("28d");
  const [searchType, setSearchType] = useState<GscSearchType>("web");

  const [data, setData] = useState<GscData | null>(null);
  const [status, setStatus] = useState<Status>("loading");

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

  useEffect(() => {
    if (!property) return;
    loadData();
  }, [property, loadData]);

  const actions = property ? (
    <>
      <Badge variant="secondary" className="hidden sm:inline-flex">
        {property.type === "DOMAIN" ? "Domain" : "URL prefix"}
      </Badge>
      <DateRangeFilter
        value={searchType}
        onChange={setSearchType}
        options={GSC_SEARCH_TYPES}
        ariaLabel="Search type"
        className="w-[130px]"
      />
      <DateRangeFilter
        value={range}
        onChange={setRange}
        options={GSC_DATE_RANGES}
        ariaLabel="Date range"
        className="w-[150px]"
      />
      <Button variant="outline" size="icon" onClick={loadData} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </>
  ) : undefined;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        icon={Search}
        title="Google Search Console"
        description={property ? property.displayName : "Search performance and indexing."}
        actions={actions}
      />

      {!connection && <LoadingState cards={4} blocks={1} blockHeight="h-[380px]" />}

      {connection && !property && (
        <ConnectGscCard connection={connection} onConnect={(p) => setProperty(p)} />
      )}

      {connection && property && (
        <>
          {status === "error" && (
            <ErrorState
              title="Couldn’t load search data"
              description="Something went wrong fetching data for this property."
              onRetry={loadData}
            />
          )}

          {status === "empty" && (
            <EmptyState description="There’s no search data for the selected period and type." />
          )}

          {status === "loading" && <LoadingState cards={4} blocks={1} blockHeight="h-[380px]" />}

          {status === "ready" && data && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.metrics.map((m) => (
                  <StatCard
                    key={m.key}
                    label={m.label}
                    value={formatGscValue(m)}
                    change={m.change}
                    changeSuffix={m.format === "position" ? "" : "%"}
                    icon={m.icon}
                    lowerIsBetter={m.format === "position"}
                  />
                ))}
              </div>

              <PerformanceChart data={data.timeseries} />

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <ChartCard title="Top Queries" description="Search terms driving traffic" padded={false}>
                  <DataTable
                    columns={gscColumns("Query")}
                    data={data.queries}
                    getRowKey={(r) => r.key}
                    initialSortKey="clicks"
                  />
                </ChartCard>
                <ChartCard title="Top Pages" description="Best performing pages in search" padded={false}>
                  <DataTable
                    columns={gscColumns("Page", (key) => <span className="text-primary">{key}</span>)}
                    data={data.pages}
                    getRowKey={(r) => r.key}
                    initialSortKey="clicks"
                  />
                </ChartCard>
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <ChartCard title="Countries" description="Performance by country" padded={false}>
                  <DataTable
                    columns={gscColumns("Country")}
                    data={data.countries}
                    getRowKey={(r) => r.key}
                    initialSortKey="clicks"
                  />
                </ChartCard>
                <ChartCard title="Devices" description="Performance by device type" padded={false}>
                  <DataTable
                    columns={gscColumns("Device")}
                    data={data.devices}
                    getRowKey={(r) => r.key}
                    initialSortKey="clicks"
                  />
                </ChartCard>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GoogleGSC;
