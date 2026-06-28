import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  /** Pre-formatted display value (e.g. "48.3K", "62.7%", "12.4"). */
  value: string;
  /** Period-over-period change. Omit to hide the delta row. */
  change?: number;
  /** Suffix appended to the change number. Defaults to "%". */
  changeSuffix?: string;
  /** Caption next to the delta. Defaults to "vs previous period". */
  caption?: string;
  icon: LucideIcon;
  /** When true (e.g. search position), a negative change is the good direction. */
  lowerIsBetter?: boolean;
  /** Optional selectable behaviour. */
  active?: boolean;
  onClick?: () => void;
}

/**
 * Generic admin metric card. Shared across the Dashboard, Google Analytics
 * and Search Console pages. Pass an already-formatted `value` string.
 */
export function StatCard({
  label,
  value,
  change,
  changeSuffix = "%",
  caption = "vs previous period",
  icon: Icon,
  lowerIsBetter = false,
  active,
  onClick,
}: StatCardProps) {
  const up = (change ?? 0) >= 0;
  const good = lowerIsBetter ? !up : up;

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
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {change !== undefined && (
          <p className="mt-1 flex items-center gap-1 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium",
                good ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
              )}
            >
              {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}
              {changeSuffix}
            </span>
            <span className="text-muted-foreground">{caption}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
