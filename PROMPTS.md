# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:*Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.*

**Hasil:**

**Perbaikan:**

## US-02 Detail produk

**Prompt:*Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.*

**Hasil:**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:*Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.*

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:*Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.*

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:*Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.*

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:*Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.*

**Hasil:**

**Perbaikan:**

## US-07 List produk di halaman admin dari database [SENDIRI]

**Prompt:** Lanjut ke US-07. Patuhi aturan umum di AGENTS.md. Ubah app/admin/page.jsx supaya produk diambil dari tabel "produk" di Supabase lewat createServerClient di lib/supabase/server.js, diurutkan dari yang terbaru (created_at menurun). Hapus pemakaian data contoh dari halaman ini dan pakai TabelProduk.jsx apa adanya tanpa mengubah tampilan. Kalau gagal mengambil data, tampilkan pesan error yang jelas. Kalau tabel kosong, tampilkan "Belum ada produk" dan jangan render tabel kosong.

**Hasil:** Halaman /admin menampilkan daftar produk dari database, urut dari yang terbaru. Tabel kosong menampilkan "Belum ada produk" dan kegagalan koneksi menampilkan pesan error.

**Perbaikan:**

## US-08 Tambah produk (terkunci login) [SENDIRI]

**Prompt:** Lanjut ke US-08. Patuhi aturan umum di AGENTS.md. Buat Server Action tambahProduk di app/admin/actions.js dan sambungkan ke form di app/admin/produk/baru/page.jsx tanpa mengubah tampilannya. Urutan di dalam action: cek login dengan supabase.auth.getUser(), validasi di server (nama wajib, harga bilangan bulat lebih dari 0), insert ke tabel "produk", revalidatePath untuk "/" dan "/admin", lalu redirect ke /admin. Kalau gagal, tampilkan pesan error yang jelas di form tanpa menghapus isian. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:** Admin yang sudah login bisa menambah produk lewat form; produk baru muncul di /admin dan di katalog. Data tidak valid ditolak dengan pesan error, dan pemanggilan tanpa login ditolak di server.

**Perbaikan:**

## US-09 Ubah produk (terkunci login) [SENDIRI]

**Prompt:** Lanjut ke US-09. Patuhi aturan umum di AGENTS.md. Ubah app/admin/produk/[id]/ubah/page.jsx supaya form terisi data produk dari Supabase berdasarkan id di URL (notFound() kalau tidak ditemukan). Buat Server Action ubahProduk di app/admin/actions.js dengan pola dan validasi yang sama seperti tambahProduk (cek login dulu, nama wajib, harga bilangan bulat lebih dari 0), update hanya baris dengan id tersebut, lalu revalidatePath untuk "/", "/produk/[id]", dan "/admin" dan redirect ke /admin. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:** Form ubah terisi data produk saat ini. Perubahan tersimpan dan terlihat di /admin, katalog, dan halaman detail. ID yang tidak ada menampilkan halaman not-found, dan pemanggilan tanpa login ditolak.

**Perbaikan:**

## US-10 Hapus produk (terkunci login) [SENDIRI]

**Prompt:** Lanjut ke US-10. Patuhi aturan umum di AGENTS.md. Buat Server Action hapusProduk di app/admin/actions.js: cek login dengan getUser(), validasi id, hapus baris dari tabel "produk", lalu revalidatePath untuk "/" dan "/admin". Sambungkan ke tombol Hapus di daftar produk admin dengan konfirmasi sebelum menghapus. Hanya tombolnya yang menjadi Client Component kecil, tampilannya tidak diubah. Kalau gagal, tampilkan pesan error yang jelas.

**Hasil:** Tombol Hapus meminta konfirmasi lebih dulu; produk yang dikonfirmasi hilang dari /admin dan dari katalog. Pemanggilan tanpa login ditolak di server.

**Perbaikan:**

## US-11 Filter kategori atau pencarian [SENDIRI]

**Prompt:** Lanjut ke US-11. Patuhi aturan umum di AGENTS.md. Di app/page.jsx baca searchParams (di-await): q untuk pencarian nama dan kategori untuk filter. Penyaringan dilakukan di query Supabase di server (nama tidak peka huruf besar/kecil, kategori kecocokan persis), dengan input q dibersihkan. Tambahkan kontrol pencarian dan filter kategori di atas daftar memakai form GET sehingga URL bisa dibagikan, gaya mengikuti DESIGN.md, KartuProduk tidak diubah. Hasil kosong menampilkan "Produk tidak ditemukan"; tabel yang memang kosong tetap menampilkan "Belum ada produk".

**Hasil:** Katalog bisa dicari berdasarkan nama dan disaring berdasarkan kategori, bisa digabung, dan hasilnya tetap sama saat halaman di-refresh atau URL dibuka langsung.

**Perbaikan:**

## US-12 Pilih jumlah atau varian [SENDIRI]

**Prompt:** Lanjut ke US-12. Patuhi aturan umum di AGENTS.md. Di halaman detail produk, buat Client Component kecil untuk memilih jumlah (minimal 1, maksimal 99) dan, hanya kalau produk punya data varian, memilih varian; halaman tetap Server Component. Ubah components/TombolWhatsApp.jsx supaya pesan WhatsApp memuat nama produk, varian (jika ada), jumlah, dan total harga dalam format rupiah dari lib/format.js, tetap di-encode dengan encodeURIComponent dan dibuka di tab baru. Kalau data varian belum ada di database, kerjakan jumlah saja dan jangan membuat kolom sendiri.

**Hasil:** Pembeli bisa memilih jumlah di halaman detail; total ikut berubah dan pesan WhatsApp memuat nama produk, jumlah, dan total dalam rupiah. Jumlah tidak bisa kurang dari 1.

**Perbaikan:**

## US-13 Bisa di-install di HP (PWA) [SENDIRI]

**Prompt:** Lanjut ke US-13. Patuhi aturan umum di AGENTS.md. Jadikan aplikasi PWA: buat app/manifest.js (nama dari lib/toko.js, start_url "/", display "standalone", warna dari DESIGN.md, ikon 192x192 dan 512x512 di public), tambahkan metadata di app/layout.jsx tanpa mengubah tampilan, dan buat public/sw.js sederhana yang didaftarkan lewat Client Component kecil hanya di production. Cache hanya aset statis; jangan cache /admin, Server Action, halaman produk yang berisi data Supabase, atau request ke domain Supabase. Pastikan proxy.js tidak memblokir manifest, sw.js, dan ikon.

**Hasil:** Aplikasi bisa di-install ke layar utama HP dan manifest terbaca tanpa error. Data produk dan area admin tidak tertahan cache sehingga perubahan di admin langsung terlihat di katalog.

**Perbaikan:**

## US-14 Deskripsi produk dibuat AI

**Prompt:** Baca AGENTS.md dan .env.example. Tambahkan tombol untuk membuat draf deskripsi produk dengan Claude API pada form tambah dan ubah produk. Proses permintaan di Server Action yang memeriksa login admin, membaca model dan API key dari environment variable server, dan mengembalikan deskripsi yang bisa diedit sebelum disimpan.

**Hasil:** Tombol AI mengisi draf deskripsi berbahasa Indonesia pada form produk tambah dan ubah.

**Perbaikan:** API key dan model yang kosong menghasilkan pesan yang jelas; kegagalan API tidak menampilkan detail teknis.

## Debugging dan fitur bonus

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.

### US-07 sampai US-14

Semua fitur berikut berjalan normal sejak pertama dijalankan. Tidak ada error yang perlu diperbaiki dan tidak ada prompt perbaikan tambahan.

- **US-07 List produk admin:** daftar produk di /admin tampil dari database. Tidak ada error.
- **US-08 Tambah produk:** produk baru tersimpan dan muncul di admin dan katalog; hanya bisa dilakukan setelah login. Tidak ada error.
- **US-09 Ubah produk:** form terisi data produk dan perubahan tersimpan; hanya bisa dilakukan setelah login. Tidak ada error.
- **US-10 Hapus produk:** produk terhapus setelah konfirmasi; hanya bisa dilakukan setelah login. Tidak ada error.
- **US-11 Filter dan pencarian:** katalog bisa dicari berdasarkan nama dan disaring berdasarkan kategori. Tidak ada error.
- **US-12 Pilih jumlah:** jumlah dan total harga ikut masuk ke pesan WhatsApp. Tidak ada error.
- **US-13 PWA:** aplikasi bisa di-install di HP. Tidak ada error.
- **US-14 Deskripsi AI:** tombol AI mengisi draf deskripsi yang bisa diedit. Tidak ada error.