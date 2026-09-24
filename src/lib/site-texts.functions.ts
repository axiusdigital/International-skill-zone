import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAdmin } from "@/integrations/supabase/require-admin.server";
import { createPublicSupabase } from "./public-supabase.server";

// ---------- Public ----------

/** Returns all site text overrides as a flat { key: value } map. Missing keys mean "use the default copy". */
export const getSiteTexts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, string>> => {
    const supabase = createPublicSupabase();
    const { data, error } = await supabase.from("site_texts").select("key, value");
    if (error) throw new Error(error.message);
    const map: Record<string, string> = {};
    for (const row of data ?? []) map[row.key] = row.value;
    return map;
  },
);

// ---------- Admin (requires signed-in admin) ----------

export const saveSiteTexts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        entries: z
          .array(z.object({ key: z.string().min(1).max(80), value: z.string().max(4000) }))
          .min(1),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as unknown as SupabaseClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_texts")
      .upsert(
        data.entries.map((e) => ({ key: e.key, value: e.value, updated_at: new Date().toISOString() })),
        { onConflict: "key" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });
