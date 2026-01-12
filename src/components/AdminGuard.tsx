"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user || loading) return;

    const supabase = createClient();

    supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (!data) router.push("/dashboard");
        else setIsAdmin(true);
      });
  }, [user, loading, router]);

  if (!user || isAdmin === null) return <p>Loading...</p>;

  return <>{children}</>;
}