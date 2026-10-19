"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/server";

export async function login(prevState, formData) {
  const data =
    formData instanceof FormData
      ? formData
      : prevState instanceof FormData
        ? prevState
        : null;

  const email = data?.get("email")?.toString().trim();
  const password = data?.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let errorPesan = null;

  try {
    const supabase = await createAuthClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      errorPesan =
        error.message === "Invalid login credentials"
          ? "Email atau password salah."
          : error.message || "Gagal masuk.";
    }
  } catch (err) {
    errorPesan = err.message || "Gagal terhubung ke layanan otentikasi.";
  }

  if (errorPesan) {
    return { error: errorPesan };
  }

  redirect("/admin");
}

export async function logout() {
  try {
    const supabase = await createAuthClient();
    await supabase.auth.signOut();
  } catch {
    // Abaikan jika sesi sudah berakhir
  }

  redirect("/admin/login");
}

