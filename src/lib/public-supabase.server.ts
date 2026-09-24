// Server-only helper: a publishable-key Supabase client for public, unauthenticated
// Data API access (public reads and public form inserts). RLS applies as `anon`.
import { createClient } from "@supabase/supabase-js";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

export function createPublicSupabase() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY");
  }
  return createClient(url, key, {
    global: {
      fetch: (input, init) => {
        const headers = new Headers(
          typeof Request !== "undefined" && input instanceof Request
            ? input.headers
            : undefined,
        );
        if (init?.headers) {
          new Headers(init.headers).forEach((value, header) =>
            headers.set(header, value),
          );
        }
        // New-style keys are opaque, not JWTs — send as apikey only.
        if (isNewSupabaseApiKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
