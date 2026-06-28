import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ChartCardProps {
  title: string;
  description?: string;
  /** Optional controls rendered on the right of the header. */
  actions?: React.ReactNode;
  className?: string;
  /** Set to false to remove default content padding (e.g. for full-bleed tables). */
  padded?: boolean;
  contentClassName?: string;
  children: React.ReactNode;
}

/**
 * Consistent card wrapper for charts and tables across the admin panel.
 */
export function ChartCard({
  title,
  description,
  actions,
  className,
  padded = true,
  contentClassName,
  children,
}: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader className={cn(actions && "flex flex-row items-start justify-between gap-4 space-y-0")}>
        <div className="space-y-1.5">
          <CardTitle className="text-base">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actions}
      </CardHeader>
      <CardContent className={cn(!padded && "px-0", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
