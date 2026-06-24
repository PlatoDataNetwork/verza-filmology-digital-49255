import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GoogleGSC = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Search className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Google Search Console</h1>
          <p className="text-muted-foreground">Search performance and indexing.</p>
        </div>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          Google Search Console integration coming soon.
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleGSC;
