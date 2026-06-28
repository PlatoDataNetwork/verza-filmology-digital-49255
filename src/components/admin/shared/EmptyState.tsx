import { Inbox, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  /** Render without the surrounding Card (e.g. inside an existing card). */
  bare?: boolean;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = "No data yet",
  description = "There’s nothing to show for the current selection.",
  action,
  bare,
}: EmptyStateProps) {
  const body = (
    <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
      <Icon className="h-8 w-8 text-muted-foreground" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );

  if (bare) return body;
  return (
    <Card>
      <CardContent className="p-0">{body}</CardContent>
    </Card>
  );
}
