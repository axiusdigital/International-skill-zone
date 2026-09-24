import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createPublicSupabase } from "./public-supabase.server";
import type { Testimonial } from "./types";

// ---------- Public ----------

export const getPublishedTestimonials = createServerFn({ method: "GET" }).handler(
  async (): Promise<Testimonial[]> => {
    const supabase = createPublicSupabase();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, student_name, course, quote, rating, is_published, display_order, created_at")
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
    const { error } = await supabase.from("testimonials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
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
