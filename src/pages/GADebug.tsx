import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type LogEntry = { time: string; message: string };

const GA_SCRIPT_ID = "ga-gtag-src";

export default function GADebug() {
  const [measurementId, setMeasurementId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState(true);
  const [idError, setIdError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [gtagReady, setGtagReady] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (message: string) =>
    setLogs((prev) => [
      { time: new Date().toLocaleTimeString(), message },
      ...prev,
    ]);

  // Fetch the configured Measurement ID via the public RPC.
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_ga_measurement_id");
      if (error) {
        setIdError(error.message);
      } else {
        setMeasurementId(data ?? null);
      }
      setLoadingId(false);
    })();
  }, []);

  // Poll for the gtag script + function becoming available.
  useEffect(() => {
    const check = () => {
      setScriptLoaded(!!document.getElementById(GA_SCRIPT_ID));
      setGtagReady(typeof window.gtag === "function");
    };
    check();
    const interval = window.setInterval(check, 500);
    return () => window.clearInterval(interval);
  }, []);

  const firePageView = () => {
    if (typeof window.gtag !== "function") {
      addLog("❌ gtag is not available — cannot send page_view");
      return;
    }
    window.gtag("event", "page_view", {
      page_path: "/ga-debug",
      page_location: window.location.href,
      page_title: "GA Debug",
      debug_mode: true,
    });
    addLog("✅ Sent page_view (debug_mode) for /ga-debug");
  };

  const fireTestEvent = () => {
    if (typeof window.gtag !== "function") {
      addLog("❌ gtag is not available — cannot send event");
      return;
    }
    window.gtag("event", "ga_debug_test", {
      category: "debug",
      label: "manual_test",
      value: 1,
      debug_mode: true,
    });
    addLog("✅ Sent custom event 'ga_debug_test' (debug_mode)");
  };

  const StatusRow = ({ label, ok, value }: { label: string; ok: boolean; value: string }) => (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 font-mono text-sm">
        <span aria-hidden>{ok ? "🟢" : "🔴"}</span>
        <span className={ok ? "text-foreground" : "text-destructive"}>{value}</span>
      </span>
    </div>
  );

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">GA Debug</h1>
      <p className="mt-2 text-muted-foreground">
        Verify the active Google Analytics configuration and fire test hits. Open
        GA4 → Admin → DebugView (or the Realtime report) in another tab to watch
        events arrive.
      </p>

      <section className="mt-8 rounded-lg border border-border p-6">
        <h2 className="mb-2 text-lg font-medium">Status</h2>
        <StatusRow
          label="Measurement ID (from settings)"
          ok={!!measurementId}
          value={loadingId ? "loading…" : idError ? `error: ${idError}` : measurementId ?? "not configured"}
        />
        <StatusRow label="gtag.js script injected" ok={scriptLoaded} value={scriptLoaded ? "loaded" : "not loaded"} />
        <StatusRow label="window.gtag() available" ok={gtagReady} value={gtagReady ? "ready" : "not ready"} />
      </section>

      <section className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={firePageView}
          disabled={!gtagReady}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          Fire test page_view
        </button>
        <button
          onClick={fireTestEvent}
          disabled={!gtagReady}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent disabled:opacity-50"
        >
          Fire custom event
        </button>
      </section>

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-medium">Activity log</h2>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No events fired yet.</p>
        ) : (
          <ul className="space-y-1 font-mono text-sm">
            {logs.map((log, i) => (
              <li key={i} className="text-muted-foreground">
                <span className="text-foreground">[{log.time}]</span> {log.message}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
