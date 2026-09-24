import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createPublicSupabase } from "./public-supabase.server";
import type { Registration } from "./types";

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        name: z.string().trim().min(2, "Please enter your name").max(120),
        profession: z.string().trim().max(120).optional().default(""),
        city: z.string().trim().max(120).optional().default(""),
        desired_score: z.string().trim().max(40).optional().default(""),
        age: z
          .number()
          .int()
          .min(10, "Age must be at least 10")
          .max(100, "Please enter a valid age")
          .nullable()
          .optional(),
        course: z.string().min(1, "Please select a course"),
        phone: z
          .string()
          .trim()
          .min(7, "Please enter a valid phone number")
          .max(25)
          .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid phone number"),
        extra_remarks: z.string().trim().max(1000).optional().default(""),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = createPublicSupabase();
    const { error } = await supabase.from("registrations").insert({
      name: data.name,
      profession: data.profession || null,
      city: data.city || null,
      desired_score: data.desired_score || null,
      age: data.age ?? null,
      course: data.course,
      phone: data.phone,
      extra_remarks: data.extra_remarks || null,
    });
    if (error) throw new Error(error.message);

    const { sendRegistrationNotification } = await import("./email.server");
    await sendRegistrationNotification({
      name: data.name,
      phone: data.phone,
      city: data.city || null,
      profession: data.profession || null,
      desired_score: data.desired_score || null,
      age: data.age ?? null,
      course: data.course,
      extra_remarks: data.extra_remarks || null,
    });

    return { ok: true };
  });

export const listRegistrations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Registration[]> => {
    const supabase = context.supabase as unknown as SupabaseClient;
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return (data ?? []) as Registration[];
  });
