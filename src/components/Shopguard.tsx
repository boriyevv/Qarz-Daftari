"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { getShopStatus } from "@/lib/shopStatus";

export function ShopGuard({ children }: { children: React.ReactNode }) {
  const { shop, loading } = useShop();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!shop) {
      router.push("/no-shop");
      return;
    }

    const status = getShopStatus(shop);

    // faqat BLOCKED da to‘sadi
    if (status === "BLOCKED") {
      router.push("/blocked");
    }
  }, [shop, loading]);

  if (loading || !shop) return null;

  const status = getShopStatus(shop);

  if (status === "BLOCKED") return null;

  return <>{children}</>;
}
