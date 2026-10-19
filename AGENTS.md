# Aturan untuk AI Agent

Baca file ini sebelum mengerjakan apa pun. Aturan di sini berlaku untuk setiap prompt.

## Tentang proyek

Aplikasi katalog produk UMKM. Pengunjung melihat katalog dan detail produk, lalu memesan lewat WhatsApp. Pemilik toko masuk ke halaman admin untuk mengganti password dan mengelola produk.

Sebelum mengerjakan fitur, baca:

- `docs/PRD.md` untuk tujuan dan ruang lingkup
- `docs/user-stories.md` untuk kriteria selesai setiap fitur (US-01, US-02, dan seterusnya)
- `docs/rancangan-teknis.md` untuk alur data dan struktur folder
- `DESIGN.md` untuk aturan tampilan

## Stack (jangan diganti)

- Next.js 16 dengan App Router, JavaScript (bukan TypeScript)
- Tailwind CSS 4, token warna ada di `app/globals.css`
- Supabase (`@supabase/supabase-js` dan `@supabase/ssr` sudah terpasang)
- Hosting di Vercel

## Aturan keamanan (wajib)

1. Supabase hanya boleh diakses dari server: Server Component, Server Action, atau Route Handler. Jangan membuat client Supabase di file yang memakai `"use client"`.
2. Environment variable tidak boleh memakai awalan `NEXT_PUBLIC_`. Nama variabel: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY` (lihat `.env.example`).
3. Setiap aksi yang mengubah data (ganti password, tambah, ubah, hapus produk) wajib memeriksa di server bahwa admin sudah login sebelum dijalankan.
4. Semua halaman di bawah `/admin` (kecuali `/admin/login`) hanya boleh dibuka admin yang sudah login.
5. Jangan menulis kunci, password, atau email admin di dalam kode.
6. Jangan mematikan Row Level Security (RLS) dan jangan mengubah aturan di `docs/schema.sql` tanpa diminta.

## Catatan Next.js 16

- `params` pada halaman dinamis berupa Promise: gunakan `const { id } = await params`.
- File untuk memproteksi rute bernama `proxy.js` di root proyek (pengganti `middleware.js`).
- Gunakan Server Action untuk memproses form.

## Data

Tabel `produk` dengan kolom: `id`, `nama`, `harga`, `deskripsi`, `foto_url`, `kategori`, `created_at`. Jangan mengganti nama kolom. Data contoh di `lib/data-contoh.js` memakai nama kolom yang sama dan tidak dipakai lagi setelah halaman terhubung ke database.

Identitas toko (nama, nomor WhatsApp, alamat, jam buka) ada di `lib/toko.js`.

## Cara bekerja

1. Kerjakan satu fitur atau satu user story per prompt.
2. Ubah hanya file yang disebut atau yang memang dibutuhkan fitur itu.
3. Pakai komponen yang sudah ada di `components/` sebelum membuat yang baru.
4. Jangan memasang paket npm baru tanpa diminta.
5. Jangan menjalankan perintah Git apa pun (commit, push, dan lainnya dilakukan manual oleh pengguna).
6. Hapus komponen `CatatanBelumAktif` dari halaman yang fiturnya sudah selesai.
7. Setelah selesai, jelaskan singkat: file apa saja yang diubah dan cara mengetesnya.

## Aturan umum untuk agent

1. Proyek memakai Next.js 16 (App Router). Di versi ini `params`, `searchParams`, dan `cookies()` bersifat async (harus di-await). Kalau ragu soal API Next.js 16, cek dokumentasi resmi; jangan menebak dari versi lama.
2. Jangan mengubah tampilan: jangan ubah className, CSS, atau struktur markup komponen yang sudah ada kecuali diminta. Elemen UI baru harus mengikuti DESIGN.md dan gaya komponen yang sudah ada.
3. Jangan mengarang nama tabel atau kolom. Periksa dulu skema yang dipakai dari kode yang ada (lib/data-contoh.js, app/page.jsx, components/KartuProduk.jsx, docs/). Kalau kolom yang dibutuhkan belum ada, BERHENTI, jelaskan kolom apa yang kurang, dan tulis SQL-nya sebagai teks. Jangan menjalankan perubahan database sendiri.
4. Rahasia (SUPABASE_SECRET_KEY, ANTHROPIC_API_KEY) hanya dipakai di kode server, tidak pernah diawali NEXT_PUBLIC_, tidak pernah di-import ke Client Component, dan tidak pernah dicetak ke log.
5. Setiap Server Action yang mengubah data wajib memeriksa login di server dengan supabase.auth.getUser() (bukan getSession) dan menolak kalau belum login. Jangan hanya mengandalkan proxy.js.
6. Perubahan seminimal mungkin: hanya sentuh file yang disebut di tugas atau yang benar-benar perlu. Jangan refactor, jangan ganti library, jangan hapus file lain.
7. Semua teks yang tampil ke pengguna memakai Bahasa Indonesia.
8. Jangan menambah dependency baru kecuali tugas menyebutnya atau tidak ada cara lain; kalau menambah, sebutkan alasannya.
9. Setelah selesai: jalankan `npm run build`, perbaiki error yang muncul dari perubahanmu, lalu laporkan (a) file yang dibuat/diubah, (b) cara mengetesnya langkah demi langkah, (c) hal yang belum bisa dikerjakan atau kamu asumsikan. Jangan melakukan git commit.
