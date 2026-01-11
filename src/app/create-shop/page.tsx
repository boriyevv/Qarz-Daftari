"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";

export default function CreateShopPage() {
  const { user, loading: authLoading } = useAuth();
  const { shop, loading: shopLoading, refreshShop } = useShop();
  const router = useRouter();

  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !shopLoading && shop) {
      router.replace("/dashboard");
    }
  }, [authLoading, shopLoading, shop, router]);

  if (authLoading || shopLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const submit = async () => {
    if (!user) return;

    if (!name.trim()) {
      setError("Do‘kon nomini kiriting");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
 
      const { data: shopData, error: shopError } = await supabase
        .from("shops")
        .insert({
          name,
          owner_id: user.id,
          plan: "free",
          is_blocked: false,
        })
        .select()
        .single();

      if (shopError) throw shopError;

      const { error: folderError } = await supabase.from("folders").insert({
        shop_id: shopData.id,
        name: "Qarzlar",
        is_default: true,
      });

      if (folderError) throw folderError;
 
      await refreshShop();

      router.replace("/dashboard");
    } catch (e: any) {
      console.error(e);
      setError("Xatolik yuz berdi. Qayta urinib ko‘ring.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border rounded-lg p-6 w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold text-center">
          Do‘kon yaratish
        </h1>

        <p className="text-sm text-gray-500 text-center">
          Davom etish uchun do‘kon nomini kiriting
        </p>

        <input
          className="border p-2 w-full rounded"
          placeholder="Masalan: Asadbek Market"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        <button
          onClick={submit}
          disabled={submitting}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Yaratilmoqda..." : "Do‘kon yaratish"}
        </button>
      </div>
    </div>
  );
}
