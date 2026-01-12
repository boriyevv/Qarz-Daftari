import { createClient } from "@/lib/supabaseClient";

export type CreateDebtPayload = {
  shop_id: string;
  folder_id: string;

  full_name: string;
  phone: string;
  amount: number;

  due_date: string;
  note?: string;
};

export type UpdateDebtPayload = {
  id: string;

  full_name: string;
  phone: string;
  amount: number;

  due_date: string;
  note?: string;
};

export async function getDebtCount(shopId: string): Promise<number> {
  const supabase = createClient();
  
  const { count, error } = await supabase
    .from("debts")
    .select("*", { count: "exact", head: true })
    .eq("shop_id", shopId);

  if (error) throw error;

  return count ?? 0;
}

export async function getDebtsByShopAndFolder(
  shopId: string,
  folderId: string
) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("debts")
    .select(`
      id,
      shop_id,
      folder_id,
      full_name,
      phone,
      amount,
      due_date,
      note,
      created_at
    `)
    .eq("shop_id", shopId)
    .eq("folder_id", folderId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function createDebt(payload: CreateDebtPayload) {
  const supabase = createClient();
  
  const { error } = await supabase.from("debts").insert({
    shop_id: payload.shop_id,
    folder_id: payload.folder_id,

    full_name: payload.full_name,
    phone: payload.phone,
    amount: payload.amount,

    due_date: payload.due_date,
    note: payload.note ?? null,
  });

  if (error) throw error;
}

export async function updateDebt(payload: UpdateDebtPayload) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from("debts")
    .update({
      full_name: payload.full_name,
      phone: payload.phone,
      amount: payload.amount,
      due_date: payload.due_date,
      note: payload.note ?? null,
    })
    .eq("id", payload.id);

  if (error) throw error;
}

export async function moveDebtToFolder(
  debtId: string,
  folderId: string
) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from("debts")
    .update({ folder_id: folderId })
    .eq("id", debtId);

  if (error) throw error;
}

export async function deleteDebt(debtId: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from("debts")
    .delete()
    .eq("id", debtId);

  if (error) throw error;
}