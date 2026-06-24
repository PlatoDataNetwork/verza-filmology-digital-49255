import { BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GoogleAnalytics = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Google Analytics</h1>
          <p className="text-muted-foreground">Traffic and audience insights.</p>
        </div>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          Google Analytics integration coming soon.
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAnalytics;
