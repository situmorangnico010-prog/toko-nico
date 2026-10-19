"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import TombolDeskripsiAI from "@/components/TombolDeskripsiAI";

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09). Keduanya bonus di jalur offline.
// Nama field sama dengan kolom tabel "produk".
export default function FormProduk({ produk = {}, labelTombol, action }) {
  const dummyAction = async () => {};
  const [state, formAction, isPending] = useActionState(action || dummyAction, null);
  const formRef = useRef(null);

  const initialValues = {
    nama: state?.fields?.nama ?? produk.nama ?? "",
    harga: state?.fields?.harga ?? (produk.harga !== undefined ? produk.harga : ""),
    kategori: state?.fields?.kategori ?? produk.kategori ?? "",
    foto_url: state?.fields?.foto_url ?? produk.foto_url ?? "",
    deskripsi: state?.fields?.deskripsi ?? produk.deskripsi ?? "",
  };
  const [deskripsi, setDeskripsi] = useState(initialValues.deskripsi);

  useEffect(() => {
    setDeskripsi(initialValues.deskripsi);
  }, [state?.timestamp, initialValues.deskripsi]);

  const idValue = state?.fields?.id ?? produk.id;

  return (
    <form
      ref={formRef}
      action={action ? formAction : undefined}
      className="flex max-w-xl flex-col gap-4"
    >
      {idValue && <input type="hidden" name="id" value={idValue} />}
      {state?.error && (
        <p className="rounded-lg border border-garis bg-permukaan p-3 text-sm font-medium text-bahaya">
          {state.error}
        </p>
      )}
      <Input
        label="Nama produk"
        name="nama"
        defaultValue={initialValues.nama}
        key={`nama-${state?.timestamp || 0}`}
        required
      />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={initialValues.harga}
        key={`harga-${state?.timestamp || 0}`}
        required
      />
      <Input
        label="Kategori"
        name="kategori"
        defaultValue={initialValues.kategori}
        key={`kategori-${state?.timestamp || 0}`}
      />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={initialValues.foto_url}
        key={`foto-${state?.timestamp || 0}`}
      />
      <Input
        label="Deskripsi"
        name="deskripsi"
        textarea
        value={deskripsi}
        onChange={(event) => setDeskripsi(event.target.value)}
      />
      <TombolDeskripsiAI formRef={formRef} onDeskripsi={setDeskripsi} />
      <div className="flex gap-3">
        <Tombol type="submit" disabled={isPending}>
          {labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
