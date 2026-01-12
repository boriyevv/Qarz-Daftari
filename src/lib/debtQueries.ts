import { createClient } from "./supabaseClient";
import { DebtDB } from "@/types/debt";
import { mapDebtFromDB } from "@/lib/debtMapper";
import { Debt } from "@/types/debt";

export async function getDebtsByShopAndFolder(

  
  shopId: string,
  folderId: string
): Promise<Debt[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .eq("shop_id", shopId)
    .eq("folder_id", folderId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data as DebtDB[]).map(mapDebtFromDB);
}
