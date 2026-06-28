import { useState } from "react";
import { BarChart3, Check, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GaConnection, GaProperty } from "@/lib/admin/analyticsData";

interface ConnectCardProps {
  connection: GaConnection;
  onConnect: (property: GaProperty) => void;
}

/**
 * Connect-account UI. Today this just selects a mock property. Later, "Connect"
 * should kick off the Google OAuth / connector flow (handled on the backend),
 * then list real GA4 properties for the user to choose from.
 */
export function ConnectCard({ connection, onConnect }: ConnectCardProps) {
  const [linking, setLinking] = useState(false);
  const [linked, setLinked] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const handleLink = () => {
    setLinking(true);
    // Placeholder for the OAuth round-trip. Replace with the real flow.
    setTimeout(() => {
      setLinking(false);
      setLinked(true);
    }, 900);
  };

  const handleConnect = () => {
    const prop = connection.availableProperties.find((p) => p.id === selectedId);
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
            <CardTitle className="text-base">Connect Google Analytics</CardTitle>
            <CardDescription>
              Link your Google account and select a GA4 property to view live data.
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
                <BarChart3 className="h-4 w-4" /> Connect Google account
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Check className="h-4 w-4" /> Google account linked
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger className="sm:w-[320px]">
                  <SelectValue placeholder="Select a GA4 property" />
                </SelectTrigger>
                <SelectContent>
                  {connection.availableProperties.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.displayName} · {p.measurementId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleConnect} disabled={!selectedId}>
                View analytics
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
