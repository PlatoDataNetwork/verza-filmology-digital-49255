import { useEffect, useMemo, useState } from "react";
import { BarChart3, Search, Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { LoadingState } from "@/components/admin/shared/LoadingState";
import { ErrorState } from "@/components/admin/shared/ErrorState";
import { IntegrationCard } from "@/components/admin/settings/IntegrationCard";
import {
  formatUpdatedAt,
  getIntegrationSettings,
  googleAnalyticsSchema,
  googleSearchConsoleSchema,
  saveIntegrationSettings,
  type ConnectionStatus,
  type IntegrationProvider,
  type IntegrationRow,
} from "@/lib/admin/settingsData";

type Status = "loading" | "ready" | "error";

const Settings = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [settings, setSettings] = useState<
    Partial<Record<IntegrationProvider, IntegrationRow>>
  >({});

  // Google Analytics form state
  const [gaPropertyId, setGaPropertyId] = useState("");
  const [gaMeasurementId, setGaMeasurementId] = useState("");
  const [gaErrors, setGaErrors] = useState<Record<string, string>>({});
  const [gaSaving, setGaSaving] = useState(false);

  // Google Search Console form state
  const [gscSiteUrl, setGscSiteUrl] = useState("");
  const [gscErrors, setGscErrors] = useState<Record<string, string>>({});
  const [gscSaving, setGscSaving] = useState(false);

  const load = async () => {
    setStatus("loading");
    try {
      const data = await getIntegrationSettings();
      setSettings(data);

      const ga = data.google_analytics?.config as
        | { propertyId?: string; measurementId?: string }
        | undefined;
      setGaPropertyId(ga?.propertyId ?? "");
      setGaMeasurementId(ga?.measurementId ?? "");

      const gsc = data.google_search_console?.config as { siteUrl?: string } | undefined;
      setGscSiteUrl(gsc?.siteUrl ?? "");

      setStatus("ready");
    } catch (e) {
      console.error("Failed to load integration settings", e);
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const gaStatus: ConnectionStatus = useMemo(
    () => (settings.google_analytics?.enabled ? "connected" : "disconnected"),
    [settings.google_analytics],
  );
  const gscStatus: ConnectionStatus = useMemo(
    () => (settings.google_search_console?.enabled ? "connected" : "disconnected"),
    [settings.google_search_console],
  );

  const handleSaveGa = async () => {
    setGaErrors({});
    const parsed = googleAnalyticsSchema.safeParse({
      propertyId: gaPropertyId,
      measurementId: gaMeasurementId,
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setGaErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setGaSaving(true);
    try {
      const config = {
        propertyId: parsed.data.propertyId,
        measurementId: parsed.data.measurementId ?? "",
      };
      await saveIntegrationSettings("google_analytics", config, true);
      toast.success("Google Analytics settings saved");
      await load();
    } catch (e) {
      console.error(e);
      toast.error("Could not save Google Analytics settings");
    } finally {
      setGaSaving(false);
    }
  };

  const handleSaveGsc = async () => {
    setGscErrors({});
    const parsed = googleSearchConsoleSchema.safeParse({ siteUrl: gscSiteUrl });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setGscErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setGscSaving(true);
    try {
      await saveIntegrationSettings(
        "google_search_console",
        { siteUrl: parsed.data.siteUrl },
        true,
      );
      toast.success("Google Search Console settings saved");
      await load();
    } catch (e) {
      console.error(e);
      toast.error("Could not save Google Search Console settings");
    } finally {
      setGscSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        description="Configure third-party integrations used across the admin panel."
      />

      {status === "loading" && <LoadingState />}
      {status === "error" && (
        <ErrorState
          description="We couldn't load your integration settings."
          onRetry={load}
        />
      )}

      {status === "ready" && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Integrations</h2>
            <p className="text-sm text-muted-foreground">
              Configuration is stored securely and used by backend functions for API
              requests. Sensitive credentials are never exposed to the browser.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Google Analytics */}
            <IntegrationCard
              icon={BarChart3}
              title="Google Analytics"
              description="GA4 reporting integration"
              status={gaStatus}
              onSave={handleSaveGa}
              saving={gaSaving}
              lastUpdatedLabel={formatUpdatedAt(settings.google_analytics?.updated_at)}
            >
              <div className="space-y-2">
                <Label htmlFor="ga-property-id">GA4 Property ID</Label>
                <Input
                  id="ga-property-id"
                  inputMode="numeric"
                  placeholder="543104833"
                  value={gaPropertyId}
                  onChange={(e) => setGaPropertyId(e.target.value)}
                  aria-invalid={!!gaErrors.propertyId}
                />
                {gaErrors.propertyId && (
                  <p className="text-sm text-destructive">{gaErrors.propertyId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ga-measurement-id">
                  Measurement ID{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="ga-measurement-id"
                  placeholder="G-XXXXXXXXXX"
                  value={gaMeasurementId}
                  onChange={(e) => setGaMeasurementId(e.target.value)}
                  aria-invalid={!!gaErrors.measurementId}
                />
                {gaErrors.measurementId && (
                  <p className="text-sm text-destructive">{gaErrors.measurementId}</p>
                )}
              </div>
            </IntegrationCard>

            {/* Google Search Console */}
            <IntegrationCard
              icon={Search}
              title="Google Search Console"
              description="Search performance integration"
              status={gscStatus}
              onSave={handleSaveGsc}
              saving={gscSaving}
              lastUpdatedLabel={formatUpdatedAt(
                settings.google_search_console?.updated_at,
              )}
            >
              <div className="space-y-2">
                <Label htmlFor="gsc-site-url">Site URL</Label>
                <Input
                  id="gsc-site-url"
                  placeholder="https://verzatv.io/"
                  value={gscSiteUrl}
                  onChange={(e) => setGscSiteUrl(e.target.value)}
                  aria-invalid={!!gscErrors.siteUrl}
                />
                {gscErrors.siteUrl && (
                  <p className="text-sm text-destructive">{gscErrors.siteUrl}</p>
                )}
              </div>
            </IntegrationCard>
          </div>
        </section>
      )}
    </div>
  );
};

export default Settings;
