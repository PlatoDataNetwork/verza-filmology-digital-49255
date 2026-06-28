import { supabase } from "@/integrations/supabase/client";
import type { GscFetchArgs } from "@/lib/admin/gscData";

/**
 * Thin wrapper around the secure `gsc-report` Supabase Edge Function.
 *
 * Kept separate so the calling convention for the Search Console backend lives
 * in one place and can be reused/mocked independently of the data-shaping logic
 * in `gscData.ts` (searchConsoleService).
 */
export async function invokeSearchConsoleEdgeFunction<T = unknown>(args: GscFetchArgs) {
  return supabase.functions.invoke<T>("gsc-report", { body: args });
}
