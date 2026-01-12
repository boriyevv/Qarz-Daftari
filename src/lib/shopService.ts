import { createClient } from "./supabaseClient";
import { Shop } from "@/types/shop";

export async function getMyShop(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("owner_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data as Shop | null;
}

export async function createShop(name: string, userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("shops")
    .insert({
      name,
      owner_id: userId,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Shop;
}
