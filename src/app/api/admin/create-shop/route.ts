import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { supabaseServer } from "@/lib/supabaseServer";
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req: Request) {
  // 1️⃣ session orqali kim chaqiryapti
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  // 2️⃣ adminmi?
  const ok = await isAdmin(user.id);
  if (!ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3️⃣ data
  const { name, ownerId } = await req.json();
  if (!name || !ownerId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // 4️⃣ 7 kun trial
  const trialUntil = new Date();
  trialUntil.setDate(trialUntil.getDate() + 7);

  // 5️⃣ shop yaratamiz
  const { data: shop, error } = await supabaseAdmin
    .from("shops")
    .insert({
      name,
      owner_id: ownerId,
      trial_until: trialUntil.toISOString().slice(0, 10),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // 6️⃣ shop_users
  const { error: linkError } = await supabaseAdmin.from("shop_users").insert({
    shop_id: shop.id,
    user_id: ownerId,
    role: "owner",
  });

  if (linkError) {
    return NextResponse.json(
      { error: linkError.message },
      { status: 400 }
    );
  }

  return NextResponse.json(shop);
}
