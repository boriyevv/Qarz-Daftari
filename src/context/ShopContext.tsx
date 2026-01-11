"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { Shop, ShopPlan } from "@/types/shop";
import { PLAN_LIMITS } from "@/lib/planLimits";
import { getDebtCount } from "@/lib/debtService";

type ShopContextType = {
  shop: Shop | null;
  loading: boolean;
  debtCount: number;
  canAddDebt: boolean;
  refreshShop: () => Promise<void>;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [debtCount, setDebtCount] = useState(0);
  const [canAddDebt, setCanAddDebt] = useState(true);

  const fetchShop = async () => {
    // 👇 MUHIM: har doim loading true’dan boshlanadi
    setLoading(true);

    // USER YO‘Q bo‘lsa — loadingni o‘chirib chiqib ketamiz
    if (!user) {
      setShop(null);
      setDebtCount(0);
      setCanAddDebt(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("shops")
      .select("*")
      .eq("owner_id", user.id)
      .single();

    // SHOP YO‘Q (create-shop ga ketadi)
    if (error && error.code === "PGRST116") {
      setShop(null);
      setDebtCount(0);
      setCanAddDebt(true);
      setLoading(false);
      return;
    }

    // BOSHQA XATO
    if (error) {
      console.error("Shop fetch error:", error);
      setLoading(false);
      return;
    }

    // SHOP BOR
    const plan = (["free", "plus", "pro"].includes(data.plan)
      ? data.plan
      : "free") as ShopPlan;

    const count = await getDebtCount(data.id);
    const limit = PLAN_LIMITS[plan];

    setDebtCount(count);
    setCanAddDebt(limit === null || count < limit);

    setShop({
      ...data,
      plan,
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ShopContext.Provider
      value={{
        shop,
        loading,
        debtCount,
        canAddDebt,
        refreshShop: fetchShop,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return ctx;
}
