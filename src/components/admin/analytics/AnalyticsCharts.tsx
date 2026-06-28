import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
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
import { cn } from "@/lib/utils";
import {
  formatDuration,
  formatGaValue,
  type GaDimensionRow,
  type GaMetric,
  type GaRealtime,
  type GaTimePoint,
  type GaTopPage,
} from "@/lib/admin/analyticsData";

const shortDate = (value: string) =>
  new Date(value).toLocaleDateString("en", { month: "short", day: "numeric" });

const PIE_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function GaStatCard({ metric }: { metric: GaMetric }) {
  const Icon = metric.icon;
  const positive = metric.change >= 0;
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{formatGaValue(metric)}</div>
        <p className="mt-1 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              positive ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(metric.change)}%
          </span>
          <span className="text-muted-foreground">vs previous period</span>
        </p>
      </CardContent>
    </Card>
  );
}

const overviewConfig = {
  sessions: { label: "Sessions", color: "hsl(var(--chart-1))" },
  users: { label: "Users", color: "hsl(var(--chart-2))" },
  pageViews: { label: "Page Views", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export function OverviewChart({ data }: { data: GaTimePoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Traffic Overview</CardTitle>
        <CardDescription>Sessions, users and page views over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={overviewConfig} className="h-[280px] w-full">
          <AreaChart data={data} margin={{ left: 4, right: 4, top: 8 }}>
            <defs>
              {(["sessions", "users", "pageViews"] as const).map((k) => (
                <linearGradient key={k} id={`fill-${k}`} x1="0" y1="0" x2="0" y2="1">
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
            <ChartTooltip content={<ChartTooltipContent labelFormatter={(v) => shortDate(String(v))} />} />
            <Area dataKey="sessions" type="monotone" stroke="var(--color-sessions)" fill="url(#fill-sessions)" strokeWidth={2} />
            <Area dataKey="users" type="monotone" stroke="var(--color-users)" fill="url(#fill-users)" strokeWidth={2} />
            <Area dataKey="pageViews" type="monotone" stroke="var(--color-pageViews)" fill="url(#fill-pageViews)" strokeWidth={2} />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function DonutChart({
  title,
  description,
  data,
  unit = "%",
}: {
  title: string;
  description: string;
  data: GaDimensionRow[];
  unit?: string;
}) {
  const config = Object.fromEntries(
    data.map((d, i) => [d.label, { label: d.label, color: PIE_COLORS[i % PIE_COLORS.length] }]),
  ) satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="mx-auto h-[260px] w-full">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="label" formatter={(v, n) => `${n}: ${v}${unit}`} />}
            />
            <Pie data={data} dataKey="value" nameKey="label" innerRadius={55} outerRadius={90} paddingAngle={2}>
              {data.map((entry, i) => (
                <Cell key={entry.label} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="label" />} className="flex-wrap" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function TrafficSourcesCard({ data }: { data: GaDimensionRow[] }) {
  return (
    <DonutChart
      title="Traffic Sources"
      description="Share of sessions by channel"
      data={data}
      unit="%"
    />
  );
}

export function CountriesCard({ data }: { data: GaDimensionRow[] }) {
  const config = { value: { label: "Users", color: "hsl(var(--chart-2))" } } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Users by Country</CardTitle>
        <CardDescription>Top locations by active users</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[280px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 12 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="label"
              tickLine={false}
              axisLine={false}
              width={110}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function TopPagesCard({ data }: { data: GaTopPage[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top Pages</CardTitle>
        <CardDescription>Most viewed pages in the selected period</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Page</TableHead>
              <TableHead className="text-right">Page Views</TableHead>
              <TableHead className="pr-6 text-right">Avg. Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((p) => (
              <TableRow key={p.path}>
                <TableCell className="pl-6">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.path}</div>
                </TableCell>
                <TableCell className="text-right tabular-nums">{p.pageViews.toLocaleString()}</TableCell>
                <TableCell className="pr-6 text-right tabular-nums text-muted-foreground">
                  {formatDuration(p.avgTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const realtimeConfig = {
  users: { label: "Active Users", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export function RealtimeCard({ data }: { data: GaRealtime }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <CardTitle className="text-base">Real-Time</CardTitle>
        </div>
        <CardDescription>Active users in the last 30 minutes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-semibold tracking-tight">{data.activeUsers.toLocaleString()}</div>
        <p className="mb-3 text-xs text-muted-foreground">active users right now</p>
        <ChartContainer config={realtimeConfig} className="h-[90px] w-full">
          <BarChart data={data.perMinute} margin={{ top: 4 }}>
            <Bar dataKey="users" fill="var(--color-users)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Active pages</p>
          {data.topPages.map((p) => (
            <div key={p.path} className="flex items-center justify-between text-sm">
              <span className="truncate text-muted-foreground">{p.path}</span>
              <span className="font-medium tabular-nums">{p.users}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
