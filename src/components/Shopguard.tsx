"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";

export function ShopGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { shop, loading: shopLoading } = useShop();
  const router = useRouter();

  useEffect(() => {
    if (authLoading || shopLoading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (!shop) {
      router.replace("/create-shop");
      return;
    }
  }, [user, shop, authLoading, shopLoading, router]);

  if (authLoading || shopLoading) {
    return <div className="p-6 text-sm">Loading...</div>;
  }

  if (shop?.isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="border p-6 rounded text-center">
          <h1 className="text-xl font-bold text-red-600">
            Do‘kon bloklangan
          </h1>
          <p className="text-sm mt-2">
            To‘lov amalga oshirilmagan
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
