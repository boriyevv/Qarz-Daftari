"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { Shop } from "@/types/shop";

type ShopContextType = {
  shop: Shop | null;
  loading: boolean;
  error: string | null;
  refreshShop: () => Promise<void>;
};

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShop = useCallback(async () => {
    if (!user) {
      setShop(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // 1. user → shop mapping
      const { data: mapping, error: mapErr } = await supabase
        .from("shop_users")
        .select("shop_id")
        .eq("user_id", user.id)
        .single();

      if (mapErr) throw new Error("Shop mapping topilmadi");
      if (!mapping) throw new Error("Siz hech qanday do'konga ulanmagansiz");

      // 2. shop data
      const { data: shopData, error: shopErr } = await supabase
        .from("shops")
        .select("id, name, plan, trial_until, paid_until, grace_until, force_active")
        .eq("id", mapping.shop_id)
        .single();

      if (shopErr) throw new Error("Shop ma'lumotlari yuklanmadi");
      if (!shopData) throw new Error("Shop topilmadi");

      setShop(shopData as Shop);
    } catch (err) {
      console.error("Shop fetch error:", err);
      setError(err instanceof Error ? err.message : "Noma'lum xatolik");
      setShop(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  return (
    <ShopContext.Provider value={{ shop, loading, error, refreshShop: fetchShop }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}