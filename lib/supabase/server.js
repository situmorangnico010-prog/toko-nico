import { createClient } from "@supabase/supabase-js";
import { createServerClient as createSsrClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Koneksi server publik/pengunjung (memakai SUPABASE_SECRET_KEY)
export function createServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/^["']|["']$/g, "").trim();
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.replace(/^["']|["']$/g, "").trim();

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Koneksi sesi admin (memakai SUPABASE_PUBLISHABLE_KEY dan cookies via @supabase/ssr)
export async function createAuthClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/^["']|["']$/g, "").trim();
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY?.replace(/^["']|["']$/g, "").trim();

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  return createSsrClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Method `setAll` dipanggil dari Server Component.
          // Ini bisa diabaikan jika middleware/proxy menyegarkan sesi.
        }
      },
    },
  });
}

export { createServerClient as createClient, createAuthClient as createSessionClient };
export default createServerClient;
