import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { supabaseServer } from "@/lib/supabaseServer";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { shopId, action } = await req.json();
  const cookieStore = await cookies();
  console.log("API COOKIES:", cookieStore.getAll());

  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No auth" }, { status: 401 });
  }

  const { data: admin } = await supabaseAdmin
    .from("admins")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!admin) {
    return NextResponse.json({ error: "Not admin" }, { status: 403 });
  }

  const updates: any = {};

  if (action === "BLOCK") updates.is_blocked = true;
  if (action === "UNBLOCK") updates.is_blocked = false;
  if (action === "GRACE")
    updates.grace_until = new Date(Date.now() + 3 * 86400000);
  if (action === "FORCE_ON") updates.force_active = true;
  if (action === "FORCE_OFF") updates.force_active = false;
  
  console.log("🔄 Updating shop:", shopId, updates);
  
  const { error } = await supabaseAdmin
    .from("shops")
    .update(updates)
    .eq("id", shopId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
