"use client";

import { useEffect, useState } from "react";
import { useShop } from "@/context/ShopContext";
import { useFolders } from "@/context/FolderContext";
import { createDebt } from "@/lib/debtService";

type Props = {
  onClose: () => void;
};

export function AddDebtModal({ onClose }: Props) {
  const { shop, refreshShop } = useShop();
  const { folders, activeFolderId } = useFolders();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [note, setNote] = useState("");

  const [folderId, setFolderId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔑 default folder avtomatik tanlanadi
  useEffect(() => {
    if (activeFolderId) {
      setFolderId(activeFolderId);
    } else {
      const def = folders.find((f) => f.isDefault);
      if (def) setFolderId(def.id);
    }
  }, [activeFolderId, folders]);

  const submit = async () => {
    if (!shop) return;

    if (!fullName || !phone || !amount || !dueDate) {
      setError("Barcha majburiy maydonlarni to‘ldiring");
      return;
    }

   const finalFolderId = activeFolderId;


    if (!finalFolderId) {
      setError("Folder topilmadi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createDebt({
        shop_id: shop.id,
        folder_id: finalFolderId, 
        full_name: fullName,
        phone,
        amount: Number(amount),
        due_date: dueDate,
        note,
      });

      await refreshShop(); // limit yangilanishi uchun
      onClose();
    } catch (e: any) {
      console.error(e);
      setError("Qarz qo‘shishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Qarz qo‘shish</h2>

        {/* Folder */}
        <select
          className="border rounded p-2 w-full"
          value={folderId ?? ""}
          onChange={(e) => setFolderId(e.target.value)}
        >
          {folders.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>

        <input
          className="border rounded p-2 w-full"
          placeholder="Ism familiya"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="border rounded p-2 w-full"
          placeholder="Telefon raqam"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="number"
          className="border rounded p-2 w-full"
          placeholder="Qarz miqdori"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="border rounded p-2 w-full"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <textarea
          className="border rounded p-2 w-full"
          placeholder="Izoh (ixtiyoriy)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="border rounded px-4 py-2"
          >
            Bekor
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
          >
            {loading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </div>
    </div>
  );
}
