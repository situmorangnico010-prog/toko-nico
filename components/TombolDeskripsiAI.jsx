"use client";

import { useState, useTransition } from "react";
import Tombol from "@/components/Tombol";
import { buatDeskripsi } from "@/app/admin/actions";

export default function TombolDeskripsiAI({ formRef, onDeskripsi }) {
  const [pesanError, setPesanError] = useState("");
  const [isPending, startTransition] = useTransition();

  function buatDraf() {
    const form = formRef.current;
    if (!form) return;

    const nama = form.elements.namedItem("nama")?.value ?? "";
    const kategori = form.elements.namedItem("kategori")?.value ?? "";

    setPesanError("");
    startTransition(async () => {
      try {
        const hasil = await buatDeskripsi({ nama, kategori });
        if (hasil.error) {
          setPesanError(hasil.error);
          return;
        }
        onDeskripsi(hasil.deskripsi);
      } catch {
        setPesanError("Terjadi gangguan saat membuat deskripsi. Silakan coba lagi.");
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Tombol type="button" varian="garis" onClick={buatDraf} disabled={isPending}>
        {isPending ? "Sedang membuat..." : "Buat deskripsi dengan AI"}
      </Tombol>
      {pesanError && (
        <p role="alert" className="text-sm font-medium text-bahaya">
          {pesanError}
        </p>
      )}
    </div>
  );
}
