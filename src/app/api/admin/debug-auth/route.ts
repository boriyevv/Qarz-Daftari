import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  // 1. Cookie'larni ko'rish
  const authCookies = allCookies.filter(c => c.name.includes('sb-'));

  // 2. Server client sessiyasi
  const supabase = await supabaseServer();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  // 3. Admin tekshiruvi
  let adminCheck = null;
  if (user) {
    const { data, error } = await supabaseAdmin
      .from("admins")
      .select("*")
      .eq("user_id", user.id)
      .single();
    adminCheck = { data, error: error?.message };
  }

  return NextResponse.json({
    cookies: {
      all: allCookies.length,
      auth: authCookies.map(c => ({ name: c.name, hasValue: !!c.value })),
    },
    user: {
      id: user?.id,
      email: user?.email,
      error: userError?.message,
    },
    session: {
      exists: !!session,
      expiresAt: session?.expires_at,
      error: sessionError?.message,
    },
    admin: adminCheck,
    env: {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  });
}