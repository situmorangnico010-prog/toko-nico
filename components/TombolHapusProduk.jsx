"use client";

import { useTransition } from "react";
import Tombol from "@/components/Tombol";
import { hapusProduk } from "@/app/admin/actions";

export default function TombolHapusProduk({ id, nama }) {
  const [isPending, startTransition] = useTransition();

  const handleHapus = () => {
    const yakin = window.confirm(`Yakin ingin menghapus "${nama}"?`);
    if (!yakin) return;

    startTransition(async () => {
      const res = await hapusProduk(id);
      if (res?.error) {
        alert(res.error);
      }
    });
  };

  return (
    <Tombol
      type="button"
      varian="bahaya"
      onClick={handleHapus}
      disabled={isPending}
    >
      Hapus
    </Tombol>
  );
}

