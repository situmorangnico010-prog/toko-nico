import KartuProduk from "@/components/KartuProduk";
import Tombol from "@/components/Tombol";
import { toko } from "@/lib/toko";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog({ searchParams }) {
  const sp = await searchParams;
  const rawQ = sp?.q?.toString() || "";
  const rawKategori = sp?.kategori?.toString() || "";

  const q = rawQ.trim().slice(0, 100);
  const kategoriParam = rawKategori.trim();
  const adaFilter = Boolean(q || (kategoriParam && kategoriParam.toLowerCase() !== "semua"));

  let daftarProduk = null;
  let daftarKategori = [];
  let pesanError = null;
  let totalProdukDiTabel = 0;

  try {
    const supabase = createServerClient();

    // Ambil daftar unik kategori dari data produk yang ada
    const { data: semuaKategori, error: errKategori } = await supabase
      .from("produk")
      .select("kategori");

    if (!errKategori && semuaKategori) {
      totalProdukDiTabel = semuaKategori.length;
      daftarKategori = Array.from(
        new Set(
          semuaKategori
            .map((item) => item.kategori?.trim())
            .filter(Boolean)
        )
      ).sort();
    }

    // Query produk dengan filter pencarian dan kategori
    let query = supabase.from("produk").select("*");

    if (q) {
      const sanitizedQ = q.replace(/[%_\\]/g, "\\$&");
      query = query.ilike("nama", `%${sanitizedQ}%`);
    }

    if (kategoriParam && kategoriParam.toLowerCase() !== "semua") {
      // Kecocokan persis (tanpa wildcard %) dan tidak peka huruf besar/kecil
      query = query.ilike("kategori", kategoriParam);
    }

    query = query.order("id", { ascending: true });

    const { data, error } = await query;

    if (error) {
      pesanError = error.message || "Gagal mengambil data produk dari database.";
    } else {
      daftarProduk = data;
    }
  } catch (err) {
    pesanError = err.message || "Gagal terhubung ke database.";
  }

  // Tentukan nilai terpilih untuk dropdown kategori
  const kategoriCocok = daftarKategori.find(
    (k) => k.toLowerCase() === kategoriParam.toLowerCase()
  );
  const kategoriAktif = kategoriCocok || (kategoriParam.toLowerCase() === "semua" ? "" : kategoriParam);

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="judul-produk" className="text-xl font-bold">
            Produk kami
          </h2>

          {/* Form pencarian dan filter tanpa JS klien */}
          <form method="GET" action="/" className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              name="q"
              defaultValue={rawQ}
              placeholder="Cari nama produk..."
              className="rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none sm:w-60"
            />
            <select
              name="kategori"
              defaultValue={kategoriAktif}
              className="rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks focus:border-utama focus:outline-none"
            >
              <option value="">Semua</option>
              {daftarKategori.map((kat) => (
                <option key={kat} value={kat}>
                  {kat}
                </option>
              ))}
            </select>
            <Tombol type="submit">Cari</Tombol>
            {adaFilter && (
              <Tombol href="/" varian="garis">
                Reset
              </Tombol>
            )}
          </form>
        </div>

        {pesanError ? (
          <div className="rounded-xl border border-garis bg-permukaan p-4 text-bahaya">
            <p className="font-semibold">Gagal memuat produk</p>
            <p className="mt-1 text-sm text-teks-lembut">{pesanError}</p>
          </div>
        ) : daftarProduk && daftarProduk.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        ) : adaFilter || totalProdukDiTabel > 0 ? (
          <p className="py-8 text-center text-teks-lembut">Produk tidak ditemukan</p>
        ) : (
          <p className="py-8 text-center text-teks-lembut">Belum ada produk</p>
        )}
      </section>
    </>
  );
}
