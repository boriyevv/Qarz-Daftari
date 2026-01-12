// import { supabase } from "@/lib/supabaseClient";

export async function getAllShops() {
  const res = await fetch("/api/admin/shops", {method:"GET", credentials: "include"});
  if (!res.ok) throw new Error("Admin shops fetch failed");
  return res.json();
}



export async function createShop(name: string, ownerId: string) {
  const res = await fetch("/api/admin/create-shop", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, ownerId }),
  });

  if (!res.ok) throw new Error("Shop create failed");
  return res.json();
}

export async function updateShopStatus(shopId: string, action: string) {
  const res = await fetch("/api/admin/shop-status", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shopId, action }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("API error:", data);
    throw new Error(data.error || "Status update failed");
  }

  return data;
}


