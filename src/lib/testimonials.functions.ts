import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAdmin } from "@/integrations/supabase/require-admin.server";
import { createPublicSupabase } from "./public-supabase.server";
import type { Testimonial } from "./types";

// Result images for testimonials reuse the public "results" storage bucket.
const RESULT_IMAGE_BUCKET = "results";
// ~5MB of binary data, base64-encoded (base64 is ~33% larger than raw bytes).
const MAX_BASE64_LENGTH = 7_000_000;

// ---------- Public ----------

export const getPublishedTestimonials = createServerFn({ method: "GET" }).handler(
  async (): Promise<Testimonial[]> => {
    const supabase = createPublicSupabase();
    const { data, error } = await supabase
      .from("testimonials")
      .select(
        "id, student_name, course, quote, rating, is_published, display_order, created_at, result_image_url, result_storage_path",
      )
      .eq("is_published", true)
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Testimonial[];
  },
);

// ---------- Admin (requires signed-in admin) ----------

export const listAllTestimonials = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Testimonial[]> => {
    const supabase = context.supabase as unknown as SupabaseClient;
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Testimonial[];
  });

export const createTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        student_name: z.string().min(1).max(120),
        course: z.string().min(1).max(120),
        quote: z.string().min(1).max(1000),
        rating: z.number().int().min(1).max(5),
        is_published: z.boolean(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }): Promise<Testimonial> => {
    const supabase = context.supabase as unknown as SupabaseClient;
    const { data: maxRow } = await supabase
      .from("testimonials")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextOrder = ((maxRow as { display_order: number } | null)?.display_order ?? 0) + 1;
    const { data: inserted, error } = await supabase
      .from("testimonials")
      .insert({ ...data, display_order: nextOrder })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return inserted as Testimonial;
  });

export const updateTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        id: z.string().uuid(),
        student_name: z.string().min(1).max(120),
        course: z.string().min(1).max(120),
        quote: z.string().min(1).max(1000),
        rating: z.number().int().min(1).max(5),
        is_published: z.boolean(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }): Promise<Testimonial> => {
    const supabase = context.supabase as unknown as SupabaseClient;
    const { id, ...fields } = data;
    const { data: updated, error } = await supabase
      .from("testimonials")
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return updated as Testimonial;
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    const supabase = context.supabase as unknown as SupabaseClient;
    const { data: row } = await supabase
      .from("testimonials")
      .select("result_storage_path")
      .eq("id", data.id)
      .maybeSingle();
    const { error } = await supabase.from("testimonials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    const oldPath = (row as { result_storage_path: string | null } | null)?.result_storage_path;
    if (oldPath) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.storage.from(RESULT_IMAGE_BUCKET).remove([oldPath]);
    }
    return { ok: true };
  });

export const setTestimonialPublished = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ id: z.string().uuid(), is_published: z.boolean() }).parse(data),
  )
  .handler(async ({ context, data }) => {
    const supabase = context.supabase as unknown as SupabaseClient;
    const { error } = await supabase
      .from("testimonials")
      .update({ is_published: data.is_published })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderTestimonials = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ ids: z.array(z.string().uuid()).min(1) }).parse(data),
  )
  .handler(async ({ context, data }) => {
    const supabase = context.supabase as unknown as SupabaseClient;
    for (let i = 0; i < data.ids.length; i++) {
      const { error } = await supabase
        .from("testimonials")
        .update({ display_order: i + 1 })
        .eq("id", data.ids[i]);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const uploadTestimonialResultImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        id: z.string().uuid(),
        fileBase64: z.string().min(1).max(MAX_BASE64_LENGTH),
        fileName: z.string().min(1).max(200),
        contentType: z.string().min(1).max(100),
      })
      .parse(data),
  )
  .handler(async ({ context, data }): Promise<Testimonial> => {
    await assertAdmin(context.supabase as unknown as SupabaseClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("testimonials")
      .select("result_storage_path")
      .eq("id", data.id)
      .maybeSingle();

    const bytes = Uint8Array.from(Buffer.from(data.fileBase64, "base64"));
    const extMatch = /\.([a-zA-Z0-9]+)$/.exec(data.fileName);
    const ext = (extMatch?.[1] ?? "jpg").toLowerCase();
    const path = `testimonial-${data.id}-${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(RESULT_IMAGE_BUCKET)
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(RESULT_IMAGE_BUCKET)
      .getPublicUrl(path);

    const { data: updated, error } = await supabaseAdmin
      .from("testimonials")
      .update({ result_image_url: publicUrlData.publicUrl, result_storage_path: path })
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);

    const oldPath = (existing as { result_storage_path: string | null } | null)?.result_storage_path;
    if (oldPath) {
      await supabaseAdmin.storage.from(RESULT_IMAGE_BUCKET).remove([oldPath]);
    }

    return updated as Testimonial;
  });

export const removeTestimonialResultImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }): Promise<Testimonial> => {
    await assertAdmin(context.supabase as unknown as SupabaseClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("testimonials")
      .select("result_storage_path")
      .eq("id", data.id)
      .maybeSingle();

    const { data: updated, error } = await supabaseAdmin
      .from("testimonials")
      .update({ result_image_url: null, result_storage_path: null })
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);

    const oldPath = (existing as { result_storage_path: string | null } | null)?.result_storage_path;
    if (oldPath) {
      await supabaseAdmin.storage.from(RESULT_IMAGE_BUCKET).remove([oldPath]);
    }

    return updated as Testimonial;
  });
