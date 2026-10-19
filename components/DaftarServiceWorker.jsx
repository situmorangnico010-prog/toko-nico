"use client";

import { useEffect } from "react";

export default function DaftarServiceWorker() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((error) => {
          console.error("Gagal mendaftarkan Service Worker:", error);
        });
    }
  }, []);

  return null;
}
