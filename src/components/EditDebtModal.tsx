"use client";

import { useState } from "react";
import { Debt } from "@/types/debt";
import { updateDebt } from "@/lib/debtService";

type Props = {
  debt: Debt;
  onClose: () => void;
  onSaved: () => void;
};

export function EditDebtModal({ debt, onClose, onSaved }: Props) {
  const [fullName, setFullName] = useState(debt.fullName);
  const [phone, setPhone] = useState(debt.phone);
  const [amount, setAmount] = useState(debt.amount.toString());
  const [dueDate, setDueDate] = useState(debt.dueDate);
  const [note, setNote] = useState(debt.note || "");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await updateDebt({
        id: debt.id,
        full_name: fullName,
        phone,
        amount: Number(amount),
        due_date: dueDate,
        note,
      });

      onSaved();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded space-y-3">
        <h2 className="text-lg font-bold">Qarzni tahrirlash</h2>

        <input className="border p-2 w-full" value={fullName} onChange={e => setFullName(e.target.value)} />
        <input className="border p-2 w-full" value={phone} onChange={e => setPhone(e.target.value)} />
        <input className="border p-2 w-full" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <input className="border p-2 w-full" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <textarea className="border p-2 w-full" value={note} onChange={e => setNote(e.target.value)} />

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="border px-4 py-2">
            Bekor
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="bg-black text-white px-4 py-2"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}
