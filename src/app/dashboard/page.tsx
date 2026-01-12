"use client";

import { useEffect, useState } from "react";
import { ShopGuard } from "@/components/Shopguard";
import { FolderProvider, useFolders } from "@/context/FolderContext";
import { FolderSidebar } from "@/components/FolderSidebar";
import { useShop } from "@/context/ShopContext";
import {
  getDebtsByShopAndFolder,
  deleteDebt,
} from "@/lib/debtService";
import { AddDebtButton } from "@/components/AddDebtButton";
import { EditDebtModal } from "@/components/EditDebtModal";
import { Debt } from "@/types/debt";
import { MobileFolderTabs } from "@/components/MobileFolderTabs";
import { FolderDndProvider } from "@/components/FolderDndProvider";
import { ShopHeader } from "@/components/ShopHeader";



function DashboardBody() {
  const { editMode } = useFolders();
  return editMode ? null : <DashboardContent />;
}


function DashboardContent() {
  const { shop } = useShop();
  const { activeFolderId, editMode } = useFolders();

  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);



  const loadDebts = async () => {
    if (!shop || !activeFolderId) return;

    setLoading(true);
    try {
      const data = await getDebtsByShopAndFolder(shop.id, activeFolderId);
      setDebts(data);
    } catch (e) {
      console.error("Debt load error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDebts();
  }, [shop?.id, activeFolderId]);

  
  if (editMode) return null;

 
  return (
    <FolderDndProvider>
      <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50 p-4 md:p-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Qarzlar</h1>
            <p className="text-sm text-gray-500">
              Tanlangan folder bo‘yicha qarzlar
            </p>
          </div>

          <AddDebtButton />
        </div>


        {loading && <p className="text-gray-500 text-sm">Yuklanmoqda...</p>}

        {!loading && debts.length === 0 && (
          <div className="border rounded p-6 text-center text-gray-500">
            Bu folderda qarz yo‘q
          </div>
        )}

        {!loading && debts.length > 0 && (
          <div className="space-y-3">
            {debts.map((debt) => (
              <div
                key={debt.id}
                className="w-full max-w-full border rounded-xl p-4 bg-white"
              >
                <div className="space-y-1">
                  <p className="text-semibold text-base">
                    Ism-Familiya : {debt.fullName}
                  </p>
                  Telefon :
                  <a
                    href={"tel:+998" + debt.phone}
                    className="text-sm text-gray-500 ml-1"
                  >
                    {debt.phone}
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    Qaytarish sanasi: {debt.dueDate}
                  </p>
                </div>

                <div className="flex justify-between md:text-right md:block">
                  <p className="font-bold text-lg">
                    Qarz : {debt.amount.toLocaleString()} so‘m
                  </p>

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingDebt(debt)}
                      className="text-sm text-blue-600"
                    >
                      Tahrirlash
                    </button>

                    <button
                      onClick={async () => {
                        if (!confirm("Qarzni o‘chirishni xohlaysizmi?")) return;
                        await deleteDebt(debt.id);
                        loadDebts();
                      }}
                      className="text-sm text-red-500"
                    >
                      O‘chirish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingDebt && (
          <EditDebtModal
            debt={editingDebt}
            onClose={() => setEditingDebt(null)}
            onSaved={loadDebts}
          />
        )}
      </main>
    </FolderDndProvider>
  );
}


export default function DashboardPage() {
  return (
    <ShopGuard>
      <FolderProvider>
        <div className="flex min-h-screen bg-gray-50">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 border-r bg-white">
            <FolderSidebar />
          </aside>

          {/* Main area */}
          <div className="flex-1 flex flex-col">
            {/* Mobile folder tabs */}
            <ShopHeader/>
            <MobileFolderTabs />

            {/* Content (debts) */}
            <DashboardBody />
          </div>
        </div>
      </FolderProvider>
    </ShopGuard>
  );
}
