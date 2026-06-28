import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

/**
 * Configuration for a single third-party integration is stored as a row in the
 * `integration_settings` table, keyed by `provider`. The `config` column is a
 * flexible JSON object so new integrations can be added without schema changes.
 *
 * Only non-sensitive configuration (property IDs, site URLs) is stored here and
 * read by the frontend. Actual credentials (service-account keys, OAuth tokens)
 * must live in backend secrets and are never read by the client.
 */

export type IntegrationProvider = "google_analytics" | "google_search_console";

export interface IntegrationRow<C = Record<string, unknown>> {
  provider: IntegrationProvider;
  enabled: boolean;
  config: C;
  updated_at: string | null;
}

/** A persisted setting is "connected" when it is enabled and has its key field set. */
export type ConnectionStatus = "connected" | "disconnected";

// ---------------------------------------------------------------------------
// Validation schemas
// ---------------------------------------------------------------------------

export const googleAnalyticsSchema = z.object({
  propertyId: z
    .string()
    .trim()
    .min(1, { message: "GA4 Property ID is required" })
    .regex(/^\d{6,15}$/, { message: "Property ID should be 6-15 digits (e.g. 543104833)" }),
  measurementId: z
    .string()
    .trim()
    .regex(/^G-[A-Z0-9]{6,12}$/, { message: "Measurement ID should look like G-XXXXXXXX" })
    .or(z.literal(""))
    .optional(),
});

export const googleSearchConsoleSchema = z.object({
  siteUrl: z
    .string()
    .trim()
    .min(1, { message: "Site URL is required" })
    .url({ message: "Enter a valid URL (e.g. https://verzatv.io/)" }),
});

export type GoogleAnalyticsConfig = z.infer<typeof googleAnalyticsSchema>;
export type GoogleSearchConsoleConfig = z.infer<typeof googleSearchConsoleSchema>;

// ---------------------------------------------------------------------------
// Data access
// ---------------------------------------------------------------------------

/** Load all integration rows, keyed by provider for easy lookup. */
export async function getIntegrationSettings(): Promise<
  Partial<Record<IntegrationProvider, IntegrationRow>>
> {
  const { data, error } = await supabase
    .from("integration_settings")
    .select("provider, enabled, config, updated_at");

  if (error) throw error;

  const map: Partial<Record<IntegrationProvider, IntegrationRow>> = {};
  for (const row of data ?? []) {
    map[row.provider as IntegrationProvider] = {
      provider: row.provider as IntegrationProvider,
      enabled: row.enabled,
      config: (row.config ?? {}) as Record<string, unknown>,
      updated_at: row.updated_at,
    };
  }
  return map;
}

/** Insert or update a single integration's configuration. */
export async function saveIntegrationSettings(
  provider: IntegrationProvider,
  config: Record<string, unknown>,
  enabled: boolean,
): Promise<void> {
  const { data: auth } = await supabase.auth.getUser();
  const { error } = await supabase.from("integration_settings").upsert(
    {
      provider,
      config,
      enabled,
      updated_by: auth.user?.id ?? null,
    },
    { onConflict: "provider" },
  );
  if (error) throw error;
}

/** Format a stored ISO timestamp for display, or return null when never saved. */
export function formatUpdatedAt(updatedAt: string | null | undefined): string | null {
  if (!updatedAt) return null;
  try {
    return new Date(updatedAt).toLocaleString();
  } catch {
    return null;
  }
}
