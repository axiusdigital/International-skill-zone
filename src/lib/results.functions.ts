import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAdmin } from "@/integrations/supabase/require-admin.server";
import { createPublicSupabase } from "./public-supabase.server";
import type { Result } from "./types";

const BUCKET = "results";
// ~5MB of binary data, base64-encoded (base64 is ~33% larger than raw bytes).
const MAX_BASE64_LENGTH = 7_000_000;

// ---------- Public ----------

export const getPublishedResults = createServerFn({ method: "GET" }).handler(
  async (): Promise<Result[]> => {
    const supabase = createPublicSupabase();
    const { data, error } = await supabase
      .from("results")
      .select("id, image_url, storage_path, alt_text, display_order, is_published, created_at")
      .eq("is_published", true)
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Result[];
  },
);

// ---------- Admin (requires signed-in admin) ----------

export const listAllResults = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Result[]> => {
    await assertAdmin(context.supabase as unknown as SupabaseClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("results")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Result[];
  });

export const uploadResult = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        fileBase64: z.string().min(1).max(MAX_BASE64_LENGTH),
        fileName: z.string().min(1).max(200),
        contentType: z.string().min(1).max(100),
        altText: z.string().max(200).optional(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }): Promise<Result> => {
    await assertAdmin(context.supabase as unknown as SupabaseClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const bytes = Uint8Array.from(Buffer.from(data.fileBase64, "base64"));
    const extMatch = /\.([a-zA-Z0-9]+)$/.exec(data.fileName);
    const ext = (extMatch?.[1] ?? "jpg").toLowerCase();
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

    const { data: maxRow } = await supabaseAdmin
      .from("results")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextOrder = ((maxRow as { display_order: number } | null)?.display_order ?? 0) + 1;

    const { data: inserted, error } = await supabaseAdmin
      .from("results")
      .insert({
        image_url: publicUrlData.publicUrl,
        storage_path: path,
        alt_text: data.altText || "Student PTE score report",
        display_order: nextOrder,
        is_published: true,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return inserted as Result;
  });

export const updateResult = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        id: z.string().uuid(),
        alt_text: z.string().max(200).optional(),
        is_published: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }): Promise<Result> => {
    await assertAdmin(context.supabase as unknown as SupabaseClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, alt_text, is_published } = data;
    const fields: { alt_text?: string; is_published?: boolean } = {};
    if (alt_text !== undefined) fields.alt_text = alt_text;
    if (is_published !== undefined) fields.is_published = is_published;
    const { data: updated, error } = await supabaseAdmin
      .from("results")
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return updated as Result;
  });

export const deleteResult = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as unknown as SupabaseClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("results")
      .select("storage_path")
      .eq("id", data.id)
      .maybeSingle();
    if (row?.storage_path) {
      await supabaseAdmin.storage.from(BUCKET).remove([row.storage_path]);
    }
    const { error } = await supabaseAdmin.from("results").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderResults = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ ids: z.array(z.string().uuid()).min(1) }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as unknown as SupabaseClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    for (let i = 0; i < data.ids.length; i++) {
      const id = data.ids[i];
      if (!id) continue;
      const { error } = await supabaseAdmin
        .from("results")
        .update({ display_order: i + 1 })
        .eq("id", id);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });
