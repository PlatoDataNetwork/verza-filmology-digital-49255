import { useState } from "react";
import { Check, Link2, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GscConnection, GscProperty } from "@/lib/admin/gscData";

interface ConnectGscCardProps {
  connection: GscConnection;
  onConnect: (property: GscProperty) => void;
}

/**
 * Connect-property UI. Today this just selects a mock property. Later, "Connect"
 * should use the Search Console connection (OAuth via the connector gateway,
 * handled on the backend), then list the user's verified properties to choose.
 */
export function ConnectGscCard({ connection, onConnect }: ConnectGscCardProps) {
  const [linking, setLinking] = useState(false);
  const [linked, setLinked] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const handleLink = () => {
    setLinking(true);
    // Placeholder for the OAuth round-trip. Replace with the real flow.
    setTimeout(() => {
      setLinking(false);
      setLinked(true);
    }, 900);
  };

  const handleConnect = () => {
    const prop = connection.availableProperties.find((p) => p.siteUrl === selected);
    if (prop) onConnect(prop);
  };

  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Link2 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base">Connect Google Search Console</CardTitle>
            <CardDescription>
              Link your Google account and select a verified property to view search data.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!linked ? (
          <Button onClick={handleLink} disabled={linking}>
            {linking ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Connecting…
              </>
            ) : (
              <>
                <Search className="h-4 w-4" /> Connect Google account
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Check className="h-4 w-4" /> Google account linked
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Select value={selected} onValueChange={setSelected}>
                <SelectTrigger className="sm:w-[360px]">
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  {connection.availableProperties.map((p) => (
                    <SelectItem key={p.siteUrl} value={p.siteUrl}>
                      {p.displayName} · {p.type === "DOMAIN" ? "Domain" : "URL prefix"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleConnect} disabled={!selected}>
                View search data
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
