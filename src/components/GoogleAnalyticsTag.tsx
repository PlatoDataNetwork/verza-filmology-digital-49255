import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const GA_SCRIPT_ID = "ga-gtag-src";
const GA_INLINE_ID = "ga-gtag-init";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Loads the Google Analytics (gtag.js) snippet on every public page using the
 * Measurement ID configured in /admin/settings. The snippet is intentionally
 * NOT loaded on /admin routes so internal admin usage isn't tracked.
 *
 * The Measurement ID is a publishable value (it is exposed to every visitor's
 * browser by design), fetched via the `get_ga_measurement_id` RPC.
 */
export const GoogleAnalyticsTag = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  // Load the gtag script once, only on public pages.
  useEffect(() => {
    if (isAdmin) return;
    if (document.getElementById(GA_SCRIPT_ID)) return;

    let cancelled = false;

    (async () => {
      const { data: measurementId, error } = await supabase.rpc("get_ga_measurement_id");
      if (cancelled || error || !measurementId) return;
      if (document.getElementById(GA_SCRIPT_ID)) return;

      const script = document.createElement("script");
      script.id = GA_SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      const inline = document.createElement("script");
      inline.id = GA_INLINE_ID;
      inline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', { send_page_view: false });
      `;
      document.head.appendChild(inline);
    })();

    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  // Send a page_view on every public route change (SPA navigation).
  useEffect(() => {
    if (isAdmin) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, isAdmin]);

  return null;
};
