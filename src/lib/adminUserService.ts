// import { supabase } from "@/lib/supabaseClient";

/**
 * Barcha userlarni olish (admin only)
 */
export async function getAllUsers() {
    const res = await fetch("/api/admin/users");
    if (!res.ok) throw new Error("Admin API error");
    return res.json();
}




// user yaratish

export async function createUser(email: string, password: string) {
  const res = await fetch("/api/admin/create-user", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("User create failed");
  return res.json();
}


