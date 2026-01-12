"use client";

import { useShop } from "@/context/ShopContext";
import { useShopStatus } from "@/hooks/useShopStatus";

export function ShopHeader() {
  const { shop } = useShop();
  const status = useShopStatus();

  if (!shop) return null;

  const statusColor =
    status === "ACTIVE"
      ? "text-green-600"
      : status === "GRACE"
      ? "text-yellow-600"
      : "text-red-600";

  const statusText =
    status === "ACTIVE"
      ? "Faol"
      : status === "GRACE"
      ? "To‘lov kutilmoqda"
      : "Bloklangan";

  return (
    <div className="w-full flex items-center justify-between border-b px-4 py-3 bg-white">
      <div>
        <p className="text-sm text-gray-500">Do‘kon</p>
        <p className="text-lg font-semibold">{shop.name}</p>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-sm font-medium ${statusColor}`}>
          {statusText}
        </span>

        {status !== "ACTIVE" && (
          <button
            onClick={() => alert("To‘lov sahifasi keyin ulanadi")}
            className="px-3 py-1 text-sm rounded bg-black text-white"
          >
            To‘lov qilish
          </button>
        )}
      </div>
    </div>
  );
}
