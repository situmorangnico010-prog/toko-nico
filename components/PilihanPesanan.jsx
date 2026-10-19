"use client";

import { useState } from "react";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import { formatRupiah } from "@/lib/format";

export default function PilihanPesanan({ produk }) {
  const [jumlah, setJumlah] = useState(1);

  const total = (produk?.harga ?? 0) * jumlah;

  const kurang = () => setJumlah((j) => Math.max(1, j - 1));
  const tambah = () => setJumlah((j) => Math.min(99, j + 1));

  return (
    <div className="flex flex-col gap-4">
      {/* Pilih jumlah */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Jumlah</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={kurang}
            disabled={jumlah <= 1}
            aria-label="Kurangi jumlah"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-garis bg-latar text-lg font-bold text-teks hover:border-utama hover:text-utama disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold tabular-nums">{jumlah}</span>
          <button
            type="button"
            onClick={tambah}
            disabled={jumlah >= 99}
            aria-label="Tambah jumlah"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-garis bg-latar text-lg font-bold text-teks hover:border-utama hover:text-utama disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      {/* Total harga */}
      <p className="text-sm text-teks-lembut">
        Total:{" "}
        <span className="font-bold text-harga">{formatRupiah(total)}</span>
      </p>

      {/* Tombol pesan dengan jumlah dan total */}
      <TombolWhatsApp produk={produk} jumlah={jumlah} total={total} />
    </div>
  );
}

