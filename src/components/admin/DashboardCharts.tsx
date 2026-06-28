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
import type { EngagementSlice, TrafficPoint } from "@/lib/admin/dashboardData";

const shortDate = (value: string) =>
  new Date(value).toLocaleDateString("en", { month: "short", day: "numeric" });

const trafficConfig = {
  pageViews: { label: "Page Views", color: "hsl(var(--chart-1))" },
  sessions: { label: "Sessions", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const usersConfig = {
  newUsers: { label: "New Users", color: "hsl(var(--chart-1))" },
  returningUsers: { label: "Returning", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const PIE_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function TrafficChart({ data }: { data: TrafficPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Traffic Overview</CardTitle>
        <CardDescription>Page views and sessions over the last 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trafficConfig} className="h-[260px] w-full">
          <AreaChart data={data} margin={{ left: 4, right: 4, top: 8 }}>
            <defs>
              <linearGradient id="fillPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-pageViews)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-pageViews)" stopOpacity={0.03} />
              </linearGradient>
              <linearGradient id="fillSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sessions)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-sessions)" stopOpacity={0.03} />
              </linearGradient>
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
            <Area
              dataKey="pageViews"
              type="monotone"
              stroke="var(--color-pageViews)"
              fill="url(#fillPageViews)"
              strokeWidth={2}
            />
            <Area
              dataKey="sessions"
              type="monotone"
              stroke="var(--color-sessions)"
              fill="url(#fillSessions)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function UsersChart({ data }: { data: UsersPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">New vs Returning Users</CardTitle>
        <CardDescription>Daily user breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={usersConfig} className="h-[260px] w-full">
          <BarChart data={data} margin={{ left: 4, right: 4, top: 8 }}>
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
            <Bar dataKey="newUsers" fill="var(--color-newUsers)" radius={[4, 4, 0, 0]} stackId="u" />
            <Bar dataKey="returningUsers" fill="var(--color-returningUsers)" radius={[4, 4, 0, 0]} stackId="u" />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function EngagementChart({ data }: { data: EngagementSlice[] }) {
  const config = Object.fromEntries(
    data.map((d, i) => [d.channel, { label: d.channel, color: PIE_COLORS[i % PIE_COLORS.length] }]),
  ) satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Engagement by Channel</CardTitle>
        <CardDescription>Share of sessions by source</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="mx-auto h-[260px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="channel" />} />
            <Pie data={data} dataKey="value" nameKey="channel" innerRadius={55} outerRadius={90} paddingAngle={2}>
              {data.map((entry, i) => (
                <Cell key={entry.channel} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="channel" />} className="flex-wrap" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
