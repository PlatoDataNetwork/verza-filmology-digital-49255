import { useState, useMemo } from "react";
import { ArrowDownRight, ArrowUpDown, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatCellValue,
  formatGscValue,
  type GscMetric,
  type GscRow,
  type GscTimePoint,
} from "@/lib/admin/gscData";

const shortDate = (value: string) =>
  new Date(value).toLocaleDateString("en", { month: "short", day: "numeric" });

export function GscStatCard({
  metric,
  active,
  onClick,
}: {
  metric: GscMetric;
  active?: boolean;
  onClick?: () => void;
}) {
  const Icon = metric.icon;
  // For "position", a decrease (lower rank number) is good.
  const positiveIsGood = metric.format !== "position";
  const up = metric.change >= 0;
  const good = positiveIsGood ? up : !up;
  return (
    <Card
      onClick={onClick}
      className={cn(
        "transition-all",
        onClick && "cursor-pointer hover:shadow-md",
        active && "ring-2 ring-primary",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{formatGscValue(metric)}</div>
        <p className="mt-1 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              good ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(metric.change)}
            {metric.format === "position" ? "" : "%"}
          </span>
          <span className="text-muted-foreground">vs previous period</span>
        </p>
      </CardContent>
    </Card>
  );
}

const perfConfig = {
  clicks: { label: "Clicks", color: "hsl(var(--chart-1))" },
  impressions: { label: "Impressions", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export function PerformanceChart({ data }: { data: GscTimePoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Search Performance</CardTitle>
        <CardDescription>Clicks and impressions over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={perfConfig} className="h-[300px] w-full">
          <AreaChart data={data} margin={{ left: 4, right: 4, top: 8 }}>
            <defs>
              {(["clicks", "impressions"] as const).map((k) => (
                <linearGradient key={k} id={`gsc-fill-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`var(--color-${k})`} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={`var(--color-${k})`} stopOpacity={0.03} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={shortDate}
              minTickGap={24}
            />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} width={40} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} width={48} />
            <ChartTooltip content={<ChartTooltipContent labelFormatter={(v) => shortDate(String(v))} />} />
            <Area
              yAxisId="left"
              dataKey="clicks"
              type="monotone"
              stroke="var(--color-clicks)"
              fill="url(#gsc-fill-clicks)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              dataKey="impressions"
              type="monotone"
              stroke="var(--color-impressions)"
              fill="url(#gsc-fill-impressions)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

type SortKey = "key" | "clicks" | "impressions" | "ctr" | "position";

interface DataTableProps {
  title: string;
  description: string;
  /** Header label for the dimension (first) column. */
  dimensionLabel: string;
  rows: GscRow[];
  /** Render the dimension cell (e.g. link styling for pages). */
  renderKey?: (key: string) => React.ReactNode;
}

export function GscDataTable({ title, description, dimensionLabel, rows, renderKey }: DataTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("clicks");
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let cmp: number;
      if (sortKey === "key") cmp = a.key.localeCompare(b.key);
      else cmp = a[sortKey] - b[sortKey];
      return asc ? cmp : -cmp;
    });
    return copy;
  }, [rows, sortKey, asc]);

  const toggle = (key: SortKey) => {
    if (sortKey === key) {
      setAsc((p) => !p);
    } else {
      setSortKey(key);
      // Position sorts ascending by default (rank 1 is best); others descending.
      setAsc(key === "key" || key === "position");
    }
  };

  const SortHeader = ({ label, col, numeric }: { label: string; col: SortKey; numeric?: boolean }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => toggle(col)}
      className={cn("-mx-2 h-8 px-2 font-medium", numeric && "ml-auto")}
    >
      {label}
      {sortKey === col ? (
        asc ? <ChevronUp className="ml-1 h-3.5 w-3.5" /> : <ChevronDown className="ml-1 h-3.5 w-3.5" />
      ) : (
        <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-40" />
      )}
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">
                <SortHeader label={dimensionLabel} col="key" />
              </TableHead>
              <TableHead className="text-right">
                <SortHeader label="Clicks" col="clicks" numeric />
              </TableHead>
              <TableHead className="text-right">
                <SortHeader label="Impressions" col="impressions" numeric />
              </TableHead>
              <TableHead className="text-right">
                <SortHeader label="CTR" col="ctr" numeric />
              </TableHead>
              <TableHead className="pr-6 text-right">
                <SortHeader label="Position" col="position" numeric />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((row) => (
              <TableRow key={row.key}>
                <TableCell className="max-w-[280px] truncate pl-6 font-medium">
                  {renderKey ? renderKey(row.key) : row.key}
                </TableCell>
                <TableCell className="text-right tabular-nums">{formatCellValue(row.clicks, "clicks")}</TableCell>
                <TableCell className="text-right tabular-nums">{formatCellValue(row.impressions, "impressions")}</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">{formatCellValue(row.ctr, "ctr")}</TableCell>
                <TableCell className="pr-6 text-right tabular-nums text-muted-foreground">{formatCellValue(row.position, "position")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
