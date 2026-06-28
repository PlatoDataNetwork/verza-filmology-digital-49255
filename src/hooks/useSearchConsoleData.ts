import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchGscData,
  GscNotConfiguredError,
  GscPermissionError,
  type GscData,
  type GscDateRangeKey,
  type GscResult,
  type GscSearchType,
} from "@/lib/admin/gscData";

export type GscStatus =
  | "loading"
  | "ready"
  | "empty"
  | "error"
  | "not_configured"
  | "permission_error";

export interface UseSearchConsoleDataArgs {
  range: GscDateRangeKey;
  searchType: GscSearchType;
  startDate?: string;
  endDate?: string;
}

interface CacheEntry {
  expires: number;
  result: GscResult;
}

/** Short-lived in-memory cache to avoid refetching identical queries. */
const CACHE = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function cacheKey(args: UseSearchConsoleDataArgs): string {
  return [args.range, args.searchType, args.startDate ?? "", args.endDate ?? ""].join("|");
}

export interface UseSearchConsoleData {
  data: GscData | null;
  siteUrl: string | null;
  status: GscStatus;
  errorMessage: string;
  refresh: () => void;
}

/**
 * Loads Google Search Console data through the secure edge function, with
 * short-term caching and refetch-on-filter-change. Custom ranges only fetch
 * once both start and end dates are provided.
 */
export function useSearchConsoleData(args: UseSearchConsoleDataArgs): UseSearchConsoleData {
  const [data, setData] = useState<GscData | null>(null);
  const [siteUrl, setSiteUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<GscStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const reqId = useRef(0);

  const isCustomIncomplete = args.range === "custom" && (!args.startDate || !args.endDate);

  const load = useCallback(
    async (force = false) => {
      if (isCustomIncomplete) {
        setStatus("empty");
        return;
      }
      const key = cacheKey(args);
      const now = Date.now();
      const cached = CACHE.get(key);
      const id = ++reqId.current;

      if (!force && cached && cached.expires > now) {
        setSiteUrl(cached.result.siteUrl);
        setData(cached.result.data);
        setStatus(cached.result.data.timeseries.length ? "ready" : "empty");
        return;
      }

      setStatus("loading");
      try {
        const result = await fetchGscData(args);
        if (id !== reqId.current) return; // a newer request superseded this one
        CACHE.set(key, { expires: now + CACHE_TTL, result });
        setSiteUrl(result.siteUrl);
        setData(result.data);
        setStatus(
          result.data.timeseries.length || result.data.metrics.some((m) => m.value > 0)
            ? "ready"
            : "empty",
        );
      } catch (e) {
        if (id !== reqId.current) return;
        if (e instanceof GscNotConfiguredError) {
          setStatus("not_configured");
          return;
        }
        if (e instanceof GscPermissionError) {
          setErrorMessage(e.message);
          setStatus("permission_error");
          return;
        }
        console.error("[useSearchConsoleData] failed", e);
        setErrorMessage(e instanceof Error ? e.message : "Unknown error");
        setStatus("error");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [args.range, args.searchType, args.startDate, args.endDate, isCustomIncomplete],
  );

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(() => {
    CACHE.delete(cacheKey(args));
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return { data, siteUrl, status, errorMessage, refresh };
}
