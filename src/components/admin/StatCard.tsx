import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatStatValue, type StatMetric } from "@/lib/admin/dashboardData";

interface StatCardProps {
  metric: StatMetric;
}

export function StatCard({ metric }: StatCardProps) {
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
        <div className="text-2xl font-semibold tracking-tight">{formatStatValue(metric)}</div>
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
          <span className="text-muted-foreground">vs last period</span>
        </p>
      </CardContent>
    </Card>
  );
}
