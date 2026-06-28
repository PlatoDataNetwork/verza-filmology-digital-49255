import { useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Search, Settings as SettingsIcon, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { StatCard } from "@/components/admin/shared/StatCard";
import { ChartCard } from "@/components/admin/shared/ChartCard";
import { DataTable, type DataTableColumn } from "@/components/admin/shared/DataTable";
import { DateRangeFilter } from "@/components/admin/shared/DateRangeFilter";
import { EmptyState } from "@/components/admin/shared/EmptyState";
import { ErrorState } from "@/components/admin/shared/ErrorState";
import { LoadingState } from "@/components/admin/shared/LoadingState";
import { CtrPositionChart, PerformanceChart } from "@/components/admin/gsc/GscCharts";
import { useSearchConsoleData } from "@/hooks/useSearchConsoleData";
import {
  GSC_DATE_RANGES,
  GSC_SEARCH_TYPES,
  formatCellValue,
  formatGscValue,
  type GscDateRangeKey,
  type GscRow,
  type GscSearchType,
} from "@/lib/admin/gscData";

/** Column factory shared by every GSC dimension table. */
function gscColumns(
  dimensionLabel: string,
  opts: { withRanking?: boolean; renderKey?: (key: string) => React.ReactNode } = {},
): DataTableColumn<GscRow>[] {
  const { withRanking = true, renderKey } = opts;
  const cols: DataTableColumn<GscRow>[] = [
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
  ];
  if (withRanking) {
    cols.push(
      { key: "ctr", header: "CTR", align: "right", sortValue: (r) => r.ctr, cell: (r) => <span className="text-muted-foreground">{formatCellValue(r.ctr, "ctr")}</span> },
      { key: "position", header: "Position", align: "right", sortValue: (r) => r.position, defaultSortDir: "asc", cell: (r) => <span className="text-muted-foreground">{formatCellValue(r.position, "position")}</span> },
    );
  }
  return cols;
}

const GoogleGSC = () => {
  const [range, setRange] = useState<GscDateRangeKey>("28d");
  const [searchType, setSearchType] = useState<GscSearchType>("web");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, siteUrl, status, errorMessage, refresh } = useSearchConsoleData({
    range,
    searchType,
    startDate: range === "custom" ? startDate : undefined,
    endDate: range === "custom" ? endDate : undefined,
  });

  const showFilters = status !== "not_configured";

  const actions = showFilters ? (
    <>
      {siteUrl && (
        <Badge variant="secondary" className="hidden max-w-[220px] truncate sm:inline-flex">
          {siteUrl}
        </Badge>
      )}
      <DateRangeFilter<GscSearchType>
        value={searchType}
        onChange={setSearchType}
        options={GSC_SEARCH_TYPES}
        ariaLabel="Search type"
        className="w-[120px]"
      />
      <DateRangeFilter<GscDateRangeKey>
        value={range}
        onChange={setRange}
        options={GSC_DATE_RANGES}
        ariaLabel="Date range"
        className="w-[160px]"
      />
      <Button variant="outline" size="icon" onClick={refresh} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </>
  ) : undefined;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        icon={Search}
        title="Google Search Console"
        description={siteUrl ?? "Search performance and indexing."}
        actions={actions}
      />

      {range === "custom" && showFilters && (
        <div className="flex flex-wrap items-end gap-3 rounded-lg border bg-card p-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Start date</label>
            <Input type="date" value={startDate} max={endDate || undefined} onChange={(e) => setStartDate(e.target.value)} className="w-[170px]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">End date</label>
            <Input type="date" value={endDate} min={startDate || undefined} onChange={(e) => setEndDate(e.target.value)} className="w-[170px]" />
          </div>
          {(!startDate || !endDate) && (
            <p className="text-sm text-muted-foreground">Pick a start and end date to load data.</p>
          )}
        </div>
      )}

      {status === "not_configured" && (
        <EmptyState
          icon={SettingsIcon}
          title="Google Search Console not configured"
          description="Google Search Console has not been configured. Please complete the setup in Admin → Settings."
          action={
            <Button asChild variant="outline">
              <Link to="/admin/settings">
                <SettingsIcon className="h-4 w-4" /> Go to Settings
              </Link>
            </Button>
          }
        />
      )}

      {status === "permission_error" && (
        <ErrorState
          icon={ShieldAlert}
          title="Access denied for this property"
          description={errorMessage || "The connected Google account doesn’t have access to this Search Console property."}
          onRetry={refresh}
        />
      )}

      {status === "error" && (
        <ErrorState
          title="Couldn’t load search data"
          description={errorMessage || "Something went wrong fetching data for this property."}
          onRetry={refresh}
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
          <CtrPositionChart data={data.timeseries} />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <ChartCard title="Top Queries" description="Search terms driving traffic" padded={false}>
              <DataTable
                columns={gscColumns("Query")}
                data={data.queries}
                getRowKey={(r) => r.key}
                initialSortKey="clicks"
                pageSize={10}
              />
            </ChartCard>
            <ChartCard title="Top Pages" description="Best performing pages in search" padded={false}>
              <DataTable
                columns={gscColumns("Page", { renderKey: (key) => <span className="text-primary">{key}</span> })}
                data={data.pages}
                getRowKey={(r) => r.key}
                initialSortKey="clicks"
                pageSize={10}
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
                pageSize={10}
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

          {data.searchAppearance.length > 0 && (
            <ChartCard title="Search Appearance" description="Performance by search result feature" padded={false}>
              <DataTable
                columns={gscColumns("Appearance")}
                data={data.searchAppearance}
                getRowKey={(r) => r.key}
                initialSortKey="clicks"
              />
            </ChartCard>
          )}
        </>
      )}
    </div>
  );
};

export default GoogleGSC;
