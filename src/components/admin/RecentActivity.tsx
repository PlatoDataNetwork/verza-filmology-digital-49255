import { formatDistanceToNow } from "date-fns";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActivityItem } from "@/lib/admin/dashboardData";

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Activity className="h-4 w-4 text-muted-foreground" />
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-5 border-l border-border pl-5">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[1.45rem] top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
              <p className="text-sm leading-snug">
                <span className="font-medium">{item.actor}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>{" "}
                <span className="font-medium">{item.target}</span>
              </p>
              <time className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
              </time>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
