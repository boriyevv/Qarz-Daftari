"use client";

import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { AddDebtModal } from "./AddDebtModal";

export function AddDebtButton() {
  const { canAddDebt } = useShop();
  const [open, setOpen] = useState(false);

  if (!canAddDebt) {
    return (
      <button disabled className="bg-gray-300 px-4 py-2 rounded">
        Limit tugadi
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" fixed md:static
  bottom-6 right-6
  bg-black text-white
  px-4 py-3 rounded-full shadow-lg max-w-[calc(100vw-2rem)] fixed bottom-5 right-5
"
      >
        Qarz qo‘shish +
      </button>

      {open && <AddDebtModal onClose={() => setOpen(false)} />}
    </>
  );
}
