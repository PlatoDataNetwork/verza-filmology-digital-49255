import { AlertCircle, RefreshCw, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  bare?: boolean;
}

export function ErrorState({
  icon: Icon = AlertCircle,
  title = "Something went wrong",
  description = "We couldn’t load this data. Please try again.",
  onRetry,
  retryLabel = "Try again",
  bare,
}: ErrorStateProps) {
  const body = (
    <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
      <Icon className="h-8 w-8 text-destructive" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="h-4 w-4" /> {retryLabel}
        </Button>
      )}
    </div>
  );

  if (bare) return body;
  return (
    <Card>
      <CardContent className="p-0">{body}</CardContent>
    </Card>
  );
}
