import { ReactNode } from "react";
import { Loader2, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ConnectionStatus } from "@/lib/admin/settingsData";

interface IntegrationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  status: ConnectionStatus;
  /** Form fields rendered in the card body. */
  children: ReactNode;
  onSave: () => void;
  saving?: boolean;
  /** ISO/locale string shown beside the save button. */
  lastUpdatedLabel?: string | null;
}

/**
 * Generic card shell for a single integration. New integrations can reuse this
 * by supplying their own fields as children and a save handler.
 */
export function IntegrationCard({
  icon: Icon,
  title,
  description,
  status,
  children,
  onSave,
  saving = false,
  lastUpdatedLabel,
}: IntegrationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Badge
            variant={status === "connected" ? "default" : "secondary"}
            className={cn(
              status === "connected"
                ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400"
                : "",
            )}
          >
            <span
              className={cn(
                "mr-1.5 inline-block h-2 w-2 rounded-full",
                status === "connected" ? "bg-emerald-500" : "bg-muted-foreground/50",
              )}
            />
            {status === "connected" ? "Connected" : "Not connected"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">{children}</CardContent>

      <CardFooter className="flex items-center justify-between gap-4 border-t pt-4">
        <span className="text-xs text-muted-foreground">
          {lastUpdatedLabel ? `Last saved ${lastUpdatedLabel}` : "Not saved yet"}
        </span>
        <Button onClick={onSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
