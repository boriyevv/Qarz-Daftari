"use client";

import { useState } from "react";
import { useShopStatus } from "@/hooks/useShopStatus";
import { AddDebtModal } from "@/components/AddDebtModal";

export function AddDebtButton() {
  const status = useShopStatus();
  const blocked = status === "BLOCKED";

  const [open, setOpen] = useState(false);
  const [showPay, setShowPay] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          if (blocked) setShowPay(true);
          else setOpen(true);
        }}
        className={`px-4 py-2 rounded ${
          blocked
            ? "bg-gray-300 text-gray-600"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        Qarz qo‘shish
      </button>

      {open && <AddDebtModal onClose={() => setOpen(false)} />}

      {showPay && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">
              To‘lov muddati tugagan
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Davom etish uchun tarifni yangilang.
            </p>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-2 text-sm"
                onClick={() => setShowPay(false)}
              >
                Yopish
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={() => alert("To‘lov sahifasi keyingi bosqich")}
              >
                To‘lov qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
