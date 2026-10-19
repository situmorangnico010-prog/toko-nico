const fotoPengganti = {
  "sepatu-sneakers.svg": "/produk/sepatu-sneakers.jpg",
  "sepatu-lari.svg": "/produk/sepatu-lari.jpg",
  "celana-jeans.svg": "/produk/celana-jeans.jpg",
  "celana-chino.svg": "/produk/celana-chino.jpg",
  "kaos-polos.svg": "/produk/kaos-polos.jpg",
  "kemeja-formal.svg": "/produk/kemeja-formal.jpg",
};

export function getFotoProduk(produk) {
  const sumber = typeof produk?.foto_url === "string" ? produk.foto_url.trim() : "";
  const namaFile = sumber.split(/[?#]/, 1)[0].split("/").pop()?.toLowerCase();

  if (namaFile && fotoPengganti[namaFile]) {
    return fotoPengganti[namaFile];
  }

  const namaProduk = typeof produk?.nama === "string" ? produk.nama.toLowerCase() : "";
  if (namaProduk.includes("workshirt")) {
    return "/produk/workshirt.jpg";
  }

  return sumber;
}
