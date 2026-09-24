import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Confirms the calling user has the 'admin' role (via user_roles + RLS "read own role").
 * Throws if not — call this at the top of every admin-only server function handler,
 * before doing any writes with the service-role client.
 */
export async function assertAdmin(supabase: SupabaseClient, userId: string | undefined) {
  if (!userId) throw new Error("Unauthorized: No user ID found in token");

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Unauthorized: Admin role required");
}
