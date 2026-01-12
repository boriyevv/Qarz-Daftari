import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function isAdmin(userId: string) {
  const { data } = await supabaseAdmin
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  return !!data;
}
