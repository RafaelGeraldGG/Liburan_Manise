========================================================================
PANDUAN LENGKAP PENGISIAN ASET FOTO & LOKASI GMAPS "LIBURAN MANISE"
========================================================================

Website Liburan Manise telah disiapkan agar Anda dapat mengisi dan menyesuaikan
seluruh foto serta titik lokasi Google Maps dengan sangat mudah.

------------------------------------------------------------------------
1. FOTO HERO / BERANDA
------------------------------------------------------------------------
- Lokasi file: assets/images/hero.jpg
- Pengaturan : Buka file `data.js` -> `heroConfig` -> `imageUrl`

------------------------------------------------------------------------
2. FOTO PROFIL TENTANG KAMI
------------------------------------------------------------------------
- Lokasi file: assets/images/tentang/profil.jpg
- Pengaturan : Buka file `data.js` -> `aboutConfig` -> `developer.photoUrl`

------------------------------------------------------------------------
3. FOTO 12 DESTINASI WISATA (3 FOTO PER DESTINASI)
------------------------------------------------------------------------
Simpan 3 foto Anda ke dalam masing-masing folder berikut:

1.  Pantai Liang                : assets/images/destinasi/pantai-liang/
2.  Pantai Natsepa              : assets/images/destinasi/pantai-natsepa/
3.  Pintu Kota                  : assets/images/destinasi/pintu-kota/
4.  Benteng Amsterdam           : assets/images/destinasi/benteng-amsterdam/
5.  Pantai Ora                  : assets/images/destinasi/pantai-ora/
6.  Desa Wisata Rutong          : assets/images/destinasi/desa-wisata-rutong/
7.  Gong Perdamaian Dunia       : assets/images/destinasi/gong-perdamaian-dunia/
8.  Pantai Lubang Buaya Morella : assets/images/destinasi/pantai-lubang-buaya-morella/
9.  Jembatan Merah Putih        : assets/images/destinasi/jembatan-merah-putih/
10. Nusa Pombo                  : assets/images/destinasi/nusa-pombo/
11. Masjid Tua Wapauwe          : assets/images/destinasi/masjid-tua-wapauwe/
12. Gereja Tua Imanuel Hila     : assets/images/destinasi/gereja-tua-imanuel-hila/

Nama file default yang disiapkan di `data.js`:
- foto-1.jpg  (akan menjadi foto sampul kartu destinasi & foto utama modal)
- foto-2.jpg
- foto-3.jpg

Jika nama file Anda berbeda, cukup buka `data.js` lalu ubah baris `url`-nya:
```javascript
images: [
  {
    url: 'assets/images/destinasi/pantai-liang/foto-pantai-1.jpg',
    alt: 'Pantai Liang Pasir Putih',
    source: 'Koleksi Pribadi Rafael',
    sourceUrl: '#'
  },
  // ...
]
```

------------------------------------------------------------------------
4. MENGISI TAUTAN LOKASI GOOGLE MAPS (gmapsUrl)
------------------------------------------------------------------------
Anda tidak perlu lagi mencari angka koordinat lat/lng!
Cukup salin link tempat wisata langsung dari Google Maps:
1. Buka Google Maps (https://maps.google.com atau lewat aplikasi Google Maps).
2. Cari nama tempat wisata (misal: "Pantai Liang").
3. Klik tombol "Bagikan" / "Share" lalu pilih "Salin Tautan" / "Copy Link".
4. Buka file `data.js`, lalu tempelkan link tersebut ke baris `gmapsUrl`:
   ```javascript
   gmapsUrl: 'https://maps.app.goo.gl/...',
   ```
Tombol "Buka Titik Asli di Google Maps ↗" di website akan otomatis mengarahkan
pengunjung langsung ke titik lokasi resmi tersebut.
========================================================================
