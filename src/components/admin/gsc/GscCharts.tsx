import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { ChartCard } from "@/components/admin/shared/ChartCard";
import type { GscTimePoint } from "@/lib/admin/gscData";

const shortDate = (value: string) =>
  new Date(value).toLocaleDateString("en", { month: "short", day: "numeric" });

const perfConfig = {
  clicks: { label: "Clicks", color: "hsl(var(--chart-1))" },
  impressions: { label: "Impressions", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const ctrPosConfig = {
  ctr: { label: "CTR (%)", color: "hsl(var(--chart-3))" },
  position: { label: "Avg. Position", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

export function PerformanceChart({ data }: { data: GscTimePoint[] }) {
  return (
    <ChartCard title="Search Performance" description="Clicks and impressions over time">
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
    </ChartCard>
  );
}

export function CtrPositionChart({ data }: { data: GscTimePoint[] }) {
  return (
    <ChartCard title="CTR & Average Position" description="Click-through rate and ranking over time">
      <ChartContainer config={ctrPosConfig} className="h-[300px] w-full">
        <AreaChart data={data} margin={{ left: 4, right: 4, top: 8 }}>
          <defs>
            {(["ctr", "position"] as const).map((k) => (
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
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            width={40}
            reversed
          />
          <ChartTooltip content={<ChartTooltipContent labelFormatter={(v) => shortDate(String(v))} />} />
          <Area
            yAxisId="left"
            dataKey="ctr"
            type="monotone"
            stroke="var(--color-ctr)"
            fill="url(#gsc-fill-ctr)"
            strokeWidth={2}
          />
          <Area
            yAxisId="right"
            dataKey="position"
            type="monotone"
            stroke="var(--color-position)"
            fill="url(#gsc-fill-position)"
            strokeWidth={2}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
}

