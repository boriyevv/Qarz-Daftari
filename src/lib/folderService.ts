import { createClient } from "./supabaseClient";
import { Folder } from "@/types/folder";


export async function getFolders(shopId: string): Promise<Folder[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("shop_id", shopId)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((f: any) => ({
    id: f.id,
    shopId: f.shop_id,
    name: f.name,
    isDefault: f.is_default,
    createdAt: f.created_at,
  }));
}

export async function createFolder(
  shopId: string,
  name: string
): Promise<void> {
  const supabase = createClient()
  const { data: last } = await supabase
    .from("folders")
    .select("sort_order")
    .eq("shop_id", shopId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (last?.sort_order ?? 0) + 1;

  const { error } = await supabase.from("folders").insert({
    shop_id: shopId,
    name,
    is_default: false,
    sort_order: nextOrder,
  });

  if (error) throw error;
}

export async function updateFolderOrder(
  folderId: string,
  order: number
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from("folders")
    .update({ sort_order: order })
    .eq("id", folderId);

  if (error) throw error;
}

export async function renameFolder(
  folderId: string,
  name: string
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from("folders")
    .update({ name })
    .eq("id", folderId);

  if (error) throw error;
}

export async function deleteFolderAndMigrateDebts(
  folder: Folder,
  defaultFolderId: string
): Promise<void> {

  const supabase = createClient()

  if (folder.isDefault) {
    throw new Error("Default folderni o‘chirish mumkin emas");
  }

  const { error: migrateError } = await supabase
    .from("debts")
    .update({ folder_id: defaultFolderId })
    .eq("folder_id", folder.id);

  if (migrateError) throw migrateError;

  const { error: deleteError } = await supabase
    .from("folders")
    .delete()
    .eq("id", folder.id);

  if (deleteError) throw deleteError;
}
