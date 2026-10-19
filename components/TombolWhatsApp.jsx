import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk, jumlah = 1, varian = "", total }) {
  const totalHarga = total !== undefined ? total : (produk?.harga ?? 0) * jumlah;
  const teksVarian = varian ? ` (Varian: ${varian})` : "";
  const pesan = `Halo, saya ingin memesan ${produk?.nama || "produk"}${teksVarian} sebanyak ${jumlah} pcs dengan total ${formatRupiah(totalHarga)}.`;
  const urlWhatsApp = `https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

  return (
    <a
      href={urlWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
    >
      Pesan via WhatsApp
    </a>
  );
}