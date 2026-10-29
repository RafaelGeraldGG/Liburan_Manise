// ============================================================
// DATA.JS — Sumber Data Destinasi Wisata Liburan Manise
// ============================================================
// File ini berisi SEMUA data yang ditampilkan di website.
// Setiap destinasi telah disediakan 3 slot foto dan 1 tautan Google Maps.
//
// PANDUAN PENGISIAN:
// 1. FOTO DESTINASI (3 FOTO):
//    - Simpan 3 foto Anda di folder assets/images/destinasi/<nama-folder>/
//    - Beri nama: foto-1.jpg, foto-2.jpg, foto-3.jpg (atau sesuaikan url di bawah)
//    - Isi alt (deskripsi foto) dan source (sumber/nama fotografer)
//
// 2. TAUTAN LOKASI GOOGLE MAPS (gmapsUrl):
//    - Buka Google Maps di HP atau laptop (https://maps.google.com)
//    - Cari tempat wisatanya -> Klik tombol "Bagikan" / "Share" -> Salin Tautan / Copy Link
//    - Tempelkan link tersebut ke bagian `gmapsUrl: '...'`
// ============================================================

/**
 * KONFIGURASI HERO SECTION
 * ─────────────────────────
 * • videoUrl         : (Opsional) URL video MP4. Jika kosong, imageUrl yang dipakai.
 * • imageUrl         : Foto latar hero. Default mengarah ke assets/images/hero.jpg
 * • fallbackImageUrl : Cadangan jika file lokal belum dimasukkan ke folder.
 */
const heroConfig = {
  videoUrl: '',
  imageUrl: 'assets/images/hero.jpg', // <-- Masukkan foto hero Anda ke assets/images/hero.jpg
  imageAlt: 'Pesona Liburan Manise',
  fallbackImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
  title: 'Kepingan Surga di Timur Indonesia',
  subtitle: 'Jelajahi pesona Liburan Manise — dari pantai berpasir mutiara hingga benteng bersejarah ratusan tahun. Rasakan hangatnya budaya Gandong dan keindahan bahari yang tak tertandingi.',
  marqueeText: 'Liburan Manise \u2022 Ambon City of Music \u2022 Mutiara dari Timur \u2022 Beta Maluku \u2022 Gandong \u2022 Ale Rasa Beta Rasa \u2022 Pela Gandong \u2022 Baileo \u2022 Katong Samua Basudara \u2022 '
};


/**
 * KONFIGURASI TENTANG WEBSITE & PROFIL PENGEMBANG
 * ────────────────────────────────────────────────
 * Ubah 'assets/images/tentang/profil.jpg' sesuai file foto Anda.
 */
const aboutConfig = {
  websiteDescription: `
    <p class="mb-4">Website ini dibangun sebagai portal pariwisata modern untuk mempromosikan keindahan alam, kekayaan budaya, dan warisan sejarah Pulau Ambon secara luas kepada wisatawan nusantara maupun mancanegara.</p>
    <p class="mb-4">Melalui platform ini, kami menghadirkan dokumentasi komprehensif mengenai destinasi-destinasi unggulan — mulai dari Pantai Liang yang pernah diakui dunia, benteng-benteng bersejarah peninggalan era rempah VOC, pesona bawah laut yang masih alami, hingga kearifan lokal tradisi Pela Gandong yang menjadi teladan kerukunan sejati.</p>
    <p>Kami meyakini bahwa pariwisata yang berbasis kelestarian dan kebudayaan dapat memperkuat ekonomi masyarakat lokal sekaligus menjaga kelestarian alam "Mutiara dari Timur" untuk generasi yang akan datang.</p>
  `,
  developer: {
    name: 'Rafael Gerald Edyson', // <-- Ganti dengan nama lengkap Anda
    role: 'Frontend Developer & UI/UX Designer',
    bio: 'Pengembang website pariwisata Liburan Manise. Memiliki ketertarikan tinggi pada antarmuka modern, interaktivitas web, dan pelestarian pesona wisata Indonesia Timur.',
    // Simpan foto Anda di folder assets/images/tentang/ lalu sesuaikan nama filenya di bawah ini:
    photoUrl: 'assets/images/tentang/profil.jpg',
    // Isi akun email Anda di bawah ini:
    socialLinks: {
      email: 'rafged93@gmail.com' // <-- Masukkan alamat email Anda di sini
    }
  }
};


/**
 * DATA DESTINASI WISATA (12 DESTINASI)
 * ─────────────────────────────────────
 * Setiap destinasi memiliki:
 * - id          : ID unik (angka)
 * - name        : Nama destinasi
 * - categories  : Array kategori (untuk filtering)
 * - location    : Lokasi administratif
 * - shortDesc   : Deskripsi singkat untuk kartu
 * - fullDesc    : Deskripsi lengkap (HTML) untuk modal detail
 * - images      : 3 SLOT FOTO (sesuaikan url, alt, source, dan sourceUrl)
 * - gmapsUrl    : Tautan lokasi Google Maps asli (bisa disalin dari Google Maps)
 * - highlights  : Fitur unggulan
 * - tips        : Tips berkunjung
 */
const destinations = [

  // ── 1. PANTAI LIANG (HUNIMUA) ──────────────────────────────
  {
    id: 1,
    name: 'Pantai Liang (Hunimua)',
    categories: ['Bahari', 'Alam'],
    location: 'Salahutu, Maluku Tengah',
    shortDesc: 'Pantai legendaris yang pernah dinobatkan PBB sebagai pantai terindah di Indonesia tahun 1990. Hamparan pasir putih halus sepanjang mata memandang.',
    fullDesc: `
      <p class="mb-4">Pantai Liang, atau yang lebih dikenal dengan nama Pantai Hunimua, merupakan salah satu permata tersembunyi di pesisir utara Pulau Ambon yang sudah melegenda. Pada tahun 1990, PBB (Perserikatan Bangsa-Bangsa) menobatkan pantai ini sebagai pantai terindah di Indonesia — sebuah pengakuan yang hingga kini masih menjadi kebanggaan masyarakat Maluku.</p>
      <p class="mb-4">Membentang sepanjang kurang lebih 2 kilometer, pasir putih halus Pantai Liang terasa lembut bagaikan tepung di bawah kaki. Air lautnya yang jernih bergradasi dari biru muda di tepi hingga biru tua di kedalaman, menciptakan panorama yang memukau. Deretan pohon kelapa dan pepohonan rindang di sepanjang garis pantai memberikan keteduhan alami yang sempurna untuk bersantai.</p>
      <p class="mb-4">Di balik keindahannya, Pantai Liang juga menyimpan kekayaan bawah laut yang luar biasa. Terumbu karang yang masih terjaga dengan baik menjadi rumah bagi beragam ikan tropis berwarna-warni. Area perairannya yang tenang dan dangkal di bagian tepi menjadikannya ramah untuk keluarga dengan anak-anak.</p>
      <p>Pantai ini mudah dijangkau dari pusat Kota Ambon dengan perjalanan darat sekitar 45 menit. Sepanjang perjalanan, Anda akan dimanjakan oleh pemandangan perbukitan hijau dan desa-desa nelayan tradisional yang menambah pesona perjalanan menuju surga kecil ini.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/pantai-liang/foto-1.jpg', // <-- Sesuaikan nama file foto Anda
        alt: 'Pantai Liang — Foto 1',                          // <-- Sesuaikan deskripsi alt
        source: 'TikTok / @itupsky',                // <-- Sesuaikan nama sumber
        sourceUrl: '#'                                         // <-- Sesuaikan link sumber (atau biarkan '#')
      },
      {
        url: 'assets/images/destinasi/pantai-liang/foto-2.jpg',
        alt: 'Pantai Liang — Foto 2',
        source: 'TikTok / @itupsky',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pantai-liang/foto-3.jpg',
        alt: 'Pantai Liang — Foto 3',
        source: 'TikTok / @fauziehhhhhhh',
        sourceUrl: '#'
      }
    ],
    // Tempelkan tautan lokasi Google Maps tempat wisata Anda di sini:
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Liang+Hunimua+Maluku+Tengah',
    highlights: ['Pasir putih selembut tepung', 'Dinobatkan PBB 1990', 'Snorkeling & diving', 'Ramah keluarga'],
    tips: 'Waktu terbaik berkunjung adalah pagi hari saat air laut sangat jernih. Bawa peralatan snorkeling sendiri untuk pengalaman terbaik.'
  },

  // ── 2. PANTAI NATSEPA ──────────────────────────────────────
  {
    id: 2,
    name: 'Pantai Natsepa',
    categories: ['Bahari', 'Alam'],
    location: 'Suli, Maluku Tengah',
    shortDesc: 'Pantai ikonik Ambon yang tak lengkap tanpa mencicipi Rujak Natsepa legendaris. Pasir putih lembut dengan suasana pantai yang hidup dan ramai.',
    fullDesc: `
      <p class="mb-4">Jika ada satu pantai yang wajib dikunjungi saat singgah di Ambon, maka Pantai Natsepa adalah jawabannya. Terletak di Desa Suli, sekitar 18 kilometer dari pusat kota, pantai ini telah menjadi ikon pariwisata Maluku selama puluhan tahun dan tak pernah kehilangan pesonanya.</p>
      <p class="mb-4">Daya tarik utama Natsepa bukan hanya keindahan pantainya yang memukau — pasir putih halus yang membentang luas dengan air laut biru kehijauan yang menenangkan — tetapi juga kuliner legendaris yang tak bisa ditemukan di tempat lain: Rujak Natsepa. Sambal kacang khas Maluku yang pedas, manis, dan gurih ini disajikan dengan irisan buah-buahan segar seperti mangga muda, nanas, dan kedondong. Rasanya yang unik telah menjadi magnet tersendiri bagi wisatawan.</p>
      <p class="mb-4">Suasana Pantai Natsepa selalu hidup dan ceria. Pada akhir pekan dan hari libur, pantai ini dipenuhi keluarga lokal yang piknik, anak-anak bermain pasir, dan pedagang kuliner yang menjajakan aneka makanan khas. Terdapat juga penyewaan ban pelampung, perahu, dan berbagai wahana air yang menambah keseruan berkunjung.</p>
      <p>Natsepa juga menawarkan momen senja yang sangat indah. Saat matahari mulai condong ke barat, langit berubah menjadi kanvas warna jingga dan merah muda yang terpantul sempurna di permukaan air laut yang tenang — momen yang sayang untuk dilewatkan.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/pantai-natsepa/foto-1.jpg',
        alt: 'Pantai Natsepa — Foto 1',
        source: 'Website / maluku.indozone.id',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pantai-natsepa/foto-2.jpg',
        alt: 'Pantai Natsepa — Foto 2',
        source: 'TikTok / @g.pttnktta',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pantai-natsepa/foto-3.jpg',
        alt: 'Pantai Natsepa — Foto 3',
        source: 'TikTok / @jhofran105',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Natsepa+Suli+Maluku+Tengah',
    highlights: ['Rujak Natsepa legendaris', 'Pasir putih lembut', 'Wahana air lengkap', 'Sunset memukau'],
    tips: 'Jangan lupa cicipi Rujak Natsepa dari pedagang di pinggir pantai — cari yang antrian paling panjang, biasanya paling enak!'
  },

  // ── 3. PINTU KOTA ──────────────────────────────────────────
  {
    id: 3,
    name: 'Pintu Kota',
    categories: ['Alam'],
    location: 'Nusaniwe, Ambon',
    shortDesc: 'Formasi tebing karang berlubang raksasa yang menjorok ke Laut Banda — ikon alam Ambon yang paling fotogenik dan dramatis.',
    fullDesc: `
      <p class="mb-4">Pintu Kota adalah salah satu keajaiban geologi paling menakjubkan di Maluku. Terletak di ujung selatan Pulau Ambon, tepatnya di kawasan Nusaniwe, formasi tebing karang ini telah dibentuk oleh erosi laut selama ribuan tahun hingga membentuk lubang raksasa menyerupai pintu gerbang alami — sehingga dinamakan "Pintu Kota" oleh masyarakat setempat.</p>
      <p class="mb-4">Tebing karang ini menjorok langsung ke Laut Banda yang biru pekat, menciptakan pemandangan dramatis yang sulit dilupakan. Dari atas tebing, Anda bisa melihat ombak memecah di bawah kaki dengan suara gemuruh yang konstan. Angin laut yang kencang dan segar menambah sensasi petualangan saat berdiri di tepian tebing.</p>
      <p class="mb-4">Bagi fotografer, Pintu Kota adalah surga. Formasi batuan karangnya yang unik, kontras antara tebing kecokelatan dengan laut biru tua, serta langit yang luas menjadikan setiap sudut layak dijadikan foto. Waktu terbaik untuk fotografi adalah saat golden hour di pagi atau sore hari, ketika cahaya matahari memberikan warna keemasan pada tebing karang.</p>
      <p>Untuk mencapai Pintu Kota, Anda perlu menuruni jalan setapak dari area parkir selama sekitar 15-20 menit. Jalurnya cukup terjal di beberapa bagian, jadi pastikan mengenakan alas kaki yang nyaman dan membawa air minum yang cukup. Perjalanan yang sedikit menantang ini akan terbayar lunas begitu Anda melihat keagungan Pintu Kota secara langsung.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/pintu-kota/foto-1.jpg',
        alt: 'Pintu Kota — Foto 1',
        source: 'TikTok / @chhiiiiaaaa',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pintu-kota/foto-2.jpg',
        alt: 'Pintu Kota — Foto 2',
        source: 'TikTok / @rin_tirta',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pintu-kota/foto-3.jpg',
        alt: 'Pintu Kota — Foto 3',
        source: 'TikTok / @anittamalikbandasangadji',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Pintu+Kota+Nusaniwe+Ambon',
    highlights: ['Formasi geologi unik', 'Panorama Laut Banda', 'Spot fotografi premium', 'Trekking ringan'],
    tips: 'Kenakan sepatu trekking dan bawa air minum. Hindari berkunjung saat hujan karena jalur setapak bisa licin.'
  },

  // ── 4. BENTENG AMSTERDAM ───────────────────────────────────
  {
    id: 4,
    name: 'Benteng Amsterdam',
    categories: ['Sejarah'],
    location: 'Hila, Maluku Tengah',
    shortDesc: 'Benteng peninggalan VOC abad ke-17 yang masih kokoh berdiri. Saksi bisu perdagangan rempah-rempah yang mengubah sejarah dunia.',
    fullDesc: `
      <p class="mb-4">Benteng Amsterdam adalah salah satu peninggalan kolonial Belanda yang paling terawat di Maluku. Dibangun oleh Portugis pada awal abad ke-17 dan kemudian diambil alih serta diperkuat oleh VOC (Vereenigde Oostindische Compagnie), benteng ini menjadi saksi bisu era perdagangan rempah-rempah yang mengubah peta geopolitik dunia.</p>
      <p class="mb-4">Terletak di Desa Hila, pesisir utara Pulau Ambon, Benteng Amsterdam memiliki posisi strategis yang menghadap langsung ke laut. Dari atas benteng, Anda bisa menyaksikan panorama Laut Banda yang membentang luas — pemandangan yang sama persis dengan yang dilihat para penjaga benteng ratusan tahun silam ketika mengawasi kapal-kapal dagang yang berlalu-lalang.</p>
      <p class="mb-4">Arsitektur benteng ini menampilkan ciri khas pertahanan kolonial Eropa: dinding batu tebal, menara pengawas di setiap sudut, dan lorong-lorong gelap yang dulunya berfungsi sebagai gudang senjata dan penyimpanan rempah-rempah berharga seperti cengkeh, pala, dan lada. Beberapa meriam kuno masih terpajang di posisi aslinya, menambah atmosfer historis yang kental.</p>
      <p>Berkunjung ke Benteng Amsterdam seperti melangkah mundur ke masa lalu. Setiap batu bata di dindingnya menyimpan cerita tentang penjelajah Eropa, pedagang rempah, dan masyarakat Maluku yang hidup di era penuh gejolak. Lokasi ini wajib dikunjungi bagi siapa saja yang ingin memahami mengapa Maluku pernah dijuluki "Spice Islands" yang diperebutkan bangsa-bangsa Eropa.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/benteng-amsterdam/foto-1.jpg',
        alt: 'Benteng Amsterdam — Foto 1',
        source: 'TikTok / @ig.nuken38',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/benteng-amsterdam/foto-2.jpg',
        alt: 'Benteng Amsterdam — Foto 2',
        source: 'TikTok / @gaaaaa10_',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/benteng-amsterdam/foto-3.jpg',
        alt: 'Benteng Amsterdam — Foto 3',
        source: 'TikTok / @grads11571',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Benteng+Amsterdam+Hila+Maluku+Tengah',
    highlights: ['Peninggalan VOC abad 17', 'Meriam kuno asli', 'Panorama laut', 'Nilai sejarah tinggi'],
    tips: 'Datang pagi hari untuk menghindari panas. Sewa pemandu lokal untuk mendapatkan cerita sejarah yang lebih lengkap dan menarik.'
  },

  // ── 5. PANTAI ORA ──────────────────────────────────────────
  {
    id: 5,
    name: 'Pantai Ora',
    categories: ['Bahari', 'Alam'],
    location: 'Seram Utara, Maluku Tengah',
    shortDesc: 'Surga tersembunyi Maluku yang kerap disebut "Maladewa-nya Indonesia". Resort terapung di atas air laut sejernih kristal.',
    fullDesc: `
      <p class="mb-4">Pantai Ora adalah definisi sempurna dari surga tersembunyi. Terletak di pesisir utara Pulau Seram, pantai ini hanya bisa dijangkau melalui perjalanan darat dan laut yang cukup panjang dari Kota Ambon — tetapi setiap menit perjalanan akan terbayar lunas begitu Anda tiba di destinasi yang luar biasa ini.</p>
      <p class="mb-4">Yang paling ikonik dari Pantai Ora adalah resort terapungnya — deretan cottage kayu yang berdiri di atas air laut sejernih kristal. Dari teras cottage, Anda bisa langsung melihat dasar laut beserta ikan-ikan berwarna-warni yang berenang di bawah kaki. Sensasi bangun pagi dengan suara deburan ombak lembut dan pemandangan laut yang membentang tanpa batas adalah pengalaman yang sulit dilupakan.</p>
      <p class="mb-4">Perairan Pantai Ora merupakan bagian dari kawasan konservasi Teluk Sawai yang kaya akan biodiversitas laut. Terumbu karang yang masih pristine menjadi habitat bagi ratusan spesies ikan tropis, kima raksasa, dan bahkan sesekali penyu yang lewat. Bagi penyelam dan snorkeler, ini adalah playground bawah laut yang tiada duanya.</p>
      <p>Di daratan, hutan tropis lebat Pulau Seram — yang merupakan habitat burung endemik Maluku seperti Nuri Bayan dan Kakatua Maluku — menambah dimensi petualangan. Trekking singkat ke air terjun tersembunyi di belakang resort melengkapi pengalaman wisata alam yang holistik di Pantai Ora.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/pantai-ora/foto-1.jpg',
        alt: 'Pantai Ora — Foto 1',
        source: 'TikTok / @itupsky',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pantai-ora/foto-2.jpg',
        alt: 'Pantai Ora — Foto 2',
        source: 'Instagram / @saragih_erick',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pantai-ora/foto-3.jpg',
        alt: 'Pantai Ora — Foto 3',
        source: 'Instagram / @saragih_erick',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Ora+Seram+Utara+Maluku',
    highlights: ['Resort terapung ikonik', 'Air sejernih kristal', 'Snorkeling & diving kelas dunia', 'Hutan tropis Seram'],
    tips: 'Pesan penginapan jauh-jauh hari karena kapasitas terbatas. Bawa obat mabuk laut untuk perjalanan speed boat.'
  },

  // ── 6. DESA WISATA RUTONG ──────────────────────────────────
  {
    id: 6,
    name: 'Desa Wisata Rutong',
    categories: ['Budaya'],
    location: 'Leitimur Selatan, Ambon',
    shortDesc: 'Desa adat yang teguh mempertahankan arsitektur tradisional Maluku. Pusat ekowisata sagu dan kehidupan masyarakat adat yang autentik.',
    fullDesc: `
      <p class="mb-4">Desa Wisata Rutong menawarkan pengalaman wisata budaya yang jarang ditemukan di tempat lain. Terletak di kawasan Leitimur Selatan, bagian selatan Pulau Ambon, desa ini merupakan salah satu dari sedikit pemukiman adat di Maluku yang masih teguh mempertahankan arsitektur tradisional dan kearifan lokal warisan nenek moyang.</p>
      <p class="mb-4">Rumah-rumah adat di Desa Rutong dibangun dengan teknik konstruksi tradisional menggunakan material lokal seperti kayu, bambu, dan atap daun sagu (gaba-gaba). Setiap rumah memiliki makna simbolis tersendiri dalam tatanan sosial masyarakat adat Maluku. Di pusat desa terdapat Baileo — rumah adat tempat musyawarah dan upacara adat — yang masih aktif digunakan hingga saat ini.</p>
      <p class="mb-4">Salah satu daya tarik utama Desa Rutong adalah ekowisata sagunya. Pengunjung dapat menyaksikan dan ikut serta dalam proses pengolahan sagu secara tradisional — mulai dari penebangan pohon sagu, penumbukan, penyaringan, hingga pembuatan papeda dan sagu lempeng yang merupakan makanan pokok masyarakat Maluku. Pengalaman hands-on ini memberikan pemahaman mendalam tentang hubungan harmonis masyarakat lokal dengan alam.</p>
      <p>Masyarakat Desa Rutong menyambut wisatawan dengan kehangatan khas Maluku. Anda bisa menikmati tarian tradisional Cakalele (tarian perang), mendengarkan musik totobuang (gamelan Maluku), dan merasakan kuliner autentik seperti ikan bakar dengan sambal colo-colo yang khas. Kunjungan ke Desa Rutong bukan sekadar wisata — melainkan perjalanan mendalami jiwa dan budaya orang Maluku.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/desa-wisata-rutong/foto-1.jpg',
        alt: 'Desa Wisata Rutong — Foto 1',
        source: 'TikTok / @crown9680',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/desa-wisata-rutong/foto-2.jpg',
        alt: 'Desa Wisata Rutong — Foto 2',
        source: 'TikTok / @crown9680',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/desa-wisata-rutong/foto-3.jpg',
        alt: 'Desa Wisata Rutong — Foto 3',
        source: 'TikTok / @uluputty_taken',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Desa+Wisata+Rutong+Leitimur+Selatan+Ambon',
    highlights: ['Arsitektur tradisional Maluku', 'Ekowisata sagu', 'Tarian Cakalele', 'Kuliner autentik'],
    tips: 'Hubungi kepala desa terlebih dahulu untuk mengatur kunjungan. Bawa oleh-oleh kecil sebagai tanda penghormatan.'
  },

  // ── 7. GONG PERDAMAIAN DUNIA ───────────────────────────────
  {
    id: 7,
    name: 'Gong Perdamaian Dunia',
    categories: ['Sejarah'],
    location: 'Pusat Kota Ambon',
    shortDesc: 'Monumen simbol kerukunan dan perdamaian di Maluku. Dibangun pasca konflik sebagai pengingat abadi bahwa Maluku adalah tanah Pela Gandong.',
    fullDesc: `
      <p class="mb-4">Gong Perdamaian Dunia adalah monumen yang sangat bermakna bagi masyarakat Maluku. Terletak di pusat Kota Ambon, gong raksasa ini dibangun sebagai simbol rekonsiliasi dan perdamaian setelah konflik sosial yang melanda Maluku pada tahun 1999-2004. Monumen ini menjadi pengingat bahwa masyarakat Maluku — yang beragam suku dan agama — sesungguhnya terikat oleh ikatan persaudaraan Pela Gandong yang jauh lebih kuat daripada perbedaan.</p>
      <p class="mb-4">Gong Perdamaian Ambon merupakan salah satu dari jaringan Gong Perdamaian Dunia yang tersebar di berbagai negara. Gong ini dibuat dari perpaduan logam yang dikumpulkan dari berbagai daerah di Indonesia, melambangkan persatuan dalam keberagaman. Setiap tahun, pada tanggal-tanggal bersejarah, gong ini ditabuh dalam upacara khusus yang dihadiri tokoh agama, adat, dan pemerintah.</p>
      <p class="mb-4">Area sekitar monumen ditata sebagai taman terbuka yang asri dengan bangku-bangku taman, pepohonan rindang, dan jalur pedestrian yang nyaman. Pada sore hari, taman ini menjadi tempat favorit warga Ambon untuk bersantai, berolahraga, atau sekadar menikmati udara segar sambil memandangi Teluk Ambon yang indah.</p>
      <p>Berkunjung ke Gong Perdamaian Dunia bukan hanya tentang melihat sebuah monumen — melainkan merenungi nilai-nilai kemanusiaan yang universal. Di tengah dunia yang sering terpecah oleh perbedaan, Maluku memberikan pelajaran berharga bahwa perdamaian selalu mungkin dicapai ketika ada kemauan bersama untuk saling menghargai.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/gong-perdamaian-dunia/foto-1.jpg',
        alt: 'Gong Perdamaian Dunia — Foto 1',
        source: 'Google Maps / David OCTA RENGGA',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/gong-perdamaian-dunia/foto-2.jpg',
        alt: 'Gong Perdamaian Dunia — Foto 2',
        source: 'Tiktok / @fardy_sabban',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/gong-perdamaian-dunia/foto-3.jpg',
        alt: 'Gong Perdamaian Dunia — Foto 3',
        source: 'Tiktok / @fardy_sabban',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gong+Perdamaian+Dunia+Kota+Ambon',
    highlights: ['Simbol perdamaian Maluku', 'Nilai sejarah mendalam', 'Taman kota asri', 'Pusat kota mudah dijangkau'],
    tips: 'Kunjungi sore hari menjelang sunset untuk suasana terbaik. Cocok dikombinasikan dengan wisata kuliner di pusat kota.'
  },

  // ── 8. PANTAI LUBANG BUAYA (MORELLA) ───────────────────────
  {
    id: 8,
    name: 'Pantai Lubang Buaya (Morella)',
    categories: ['Bahari', 'Alam'],
    location: 'Leihitu, Maluku Tengah',
    shortDesc: 'Spot snorkeling dan diving tersembunyi dengan terumbu karang pristine yang luar biasa terjaga. Kejernihan airnya tak tertandingi.',
    fullDesc: `
      <p class="mb-4">Pantai Lubang Buaya di Desa Morella adalah salah satu hidden gem terbaik di Pulau Ambon bagi para pencinta dunia bawah laut. Terletak di pesisir utara pulau, pantai ini mungkin tidak sepopuler Natsepa atau Liang, tetapi justru itulah yang menjadi keunggulannya — ketenangan dan keaslian yang sulit ditemukan di pantai-pantai mainstream.</p>
      <p class="mb-4">Terumbu karang di perairan Pantai Lubang Buaya termasuk yang paling terjaga di Pulau Ambon. Kejernihan air yang luar biasa — visibility bisa mencapai 15-20 meter — memungkinkan Anda melihat keindahan bawah laut bahkan tanpa harus menyelam. Cukup dengan snorkeling di area dangkal, Anda sudah bisa menyaksikan taman karang berwarna-warni yang dihuni oleh ikan-ikan nemo (clownfish), ikan angel, ikan kupu-kupu, dan puluhan spesies tropis lainnya.</p>
      <p class="mb-4">Bagi penyelam berpengalaman, spot diving di sekitar Pantai Lubang Buaya menawarkan wall dive yang menakjubkan. Dinding karang yang terjun vertikal ke kedalaman dihiasi oleh kipas laut raksasa, sponge berwarna cerah, dan sesekali bisa dijumpai kumpulan ikan barracuda atau bahkan hiu karang yang ramah.</p>
      <p>Nama "Lubang Buaya" sendiri berasal dari formasi batuan karang di tepi pantai yang membentuk ceruk atau lubang kecil menyerupai mulut buaya. Konon, di masa lalu, lubang ini memang pernah menjadi tempat buaya muara berjemur. Meskipun kini sudah tidak ada buaya, nama tersebut tetap melekat dan menjadi daya tarik tersendiri.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/pantai-lubang-buaya-morella/foto-1.jpg',
        alt: 'Pantai Lubang Buaya — Foto 1',
        source: 'Instagram / @shduly_',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pantai-lubang-buaya-morella/foto-2.jpg',
        alt: 'Pantai Lubang Buaya — Foto 2',
        source: 'TikTok / @fdyassa_',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/pantai-lubang-buaya-morella/foto-3.jpg',
        alt: 'Pantai Lubang Buaya — Foto 3',
        source: 'TikTok / @fdyassa_',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Lubang+Buaya+Morella+Maluku+Tengah',
    highlights: ['Terumbu karang pristine', 'Visibility 15-20 meter', 'Wall dive spektakuler', 'Suasana sepi & tenang'],
    tips: 'Bawa peralatan snorkeling sendiri karena belum banyak penyewaan. Waktu terbaik menyelam adalah April—November.'
  },

  // ── 9. JEMBATAN MERAH PUTIH ────────────────────────────────
  {
    id: 9,
    name: 'Jembatan Merah Putih',
    categories: ['Ikon Kota'],
    location: 'Teluk Ambon',
    shortDesc: 'Jembatan cable-stayed terpanjang di Indonesia Timur yang membentang megah melintasi Teluk Ambon. Pemandangan malam harinya sangat spektakuler.',
    fullDesc: `
      <p class="mb-4">Jembatan Merah Putih adalah kebanggaan infrastruktur modern Kota Ambon dan seluruh Maluku. Diresmikan pada tahun 2016, jembatan cable-stayed ini membentang sepanjang 1.140 meter melintasi Teluk Ambon Dalam, menghubungkan kawasan Galala di sisi barat dengan kawasan Poka di sisi timur. Jembatan ini secara signifikan mempersingkat waktu tempuh yang sebelumnya harus memutar lewat jalan darat selama berjam-jam.</p>
      <p class="mb-4">Dinamakan "Merah Putih" sebagai simbol nasionalisme, jembatan ini memiliki menara pylon setinggi 125 meter yang menjulang gagah di tengah teluk. Kabel-kabel baja yang tertata rapi membentang dari pylon ke dek jembatan, menciptakan siluet yang anggun dan modern. Desain arsitekturalnya yang megah telah menjadikan jembatan ini ikon baru Kota Ambon.</p>
      <p class="mb-4">Keindahan Jembatan Merah Putih mencapai puncaknya di malam hari. Lampu-lampu LED berwarna-warni yang menghiasi seluruh struktur jembatan menciptakan pertunjukan cahaya yang memukau, terpantul sempurna di permukaan air Teluk Ambon yang tenang. Banyak fotografer dan warga kota yang sengaja datang ke titik-titik strategis di sekitar teluk untuk menikmati dan mengabadikan keindahan malam jembatan ini.</p>
      <p>Selain fungsi transportasinya, Jembatan Merah Putih juga memiliki jalur pedestrian di kedua sisi yang memungkinkan pejalan kaki dan pengunjung menikmati pemandangan Teluk Ambon dari ketinggian. Angin laut yang segar, panorama 360 derajat kota dan laut, serta sensasi berjalan di atas air menjadikan pengalaman melintasi jembatan ini tak terlupakan.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/jembatan-merah-putih/foto-1.jpg',
        alt: 'Jembatan Merah Putih — Foto 1',
        source: 'TikTok / @riomarasabessy',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/jembatan-merah-putih/foto-2.jpg',
        alt: 'Jembatan Merah Putih — Foto 2',
        source: 'TikTok / @pattiruhuofficial',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/jembatan-merah-putih/foto-3.jpg',
        alt: 'Jembatan Merah Putih — Foto 3',
        source: 'Instagram / @itups_',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jembatan+Merah+Putih+Teluk+Ambon',
    highlights: ['Jembatan terpanjang Indonesia Timur', 'Iluminasi malam spektakuler', 'Panorama 360° Teluk Ambon', 'Jalur pedestrian'],
    tips: 'Datang saat senja untuk melihat transisi dari golden hour ke pemandangan malam. Titik foto terbaik ada di sisi Galala.'
  },

  // ── 10. NUSA POMBO ─────────────────────────────────────────
  {
    id: 10,
    name: 'Nusa Pombo',
    categories: ['Alam', 'Bahari'],
    location: 'Selat Haruku, Maluku Tengah',
    shortDesc: 'Pulau tak berpenghuni berpasir putih di tengah Selat Haruku. Surga sejati bagi penyelam dan pencinta kesunyian alam.',
    fullDesc: `
      <p class="mb-4">Nusa Pombo adalah sebuah pulau mungil tak berpenghuni yang terletak di Selat Haruku, di antara Pulau Ambon dan Pulau Haruku. Pulau seluas kurang lebih 1 hektar ini dikelilingi oleh pasir putih bersih dan air laut biru kehijauan yang begitu jernih hingga Anda bisa melihat dasar laut tanpa alat bantu apapun.</p>
      <p class="mb-4">Keunikan Nusa Pombo terletak pada ekosistem lautnya yang sangat kaya dan masih perawan. Terumbu karang yang mengelilingi pulau ini menjadi habitat bagi ratusan spesies ikan tropis, nudibranch (siput laut) yang berwarna-warni, bintang laut, dan berbagai jenis invertebrata laut lainnya. Bagi penyelam, Nusa Pombo menawarkan pengalaman diving kelas dunia dengan visibility yang luar biasa.</p>
      <p class="mb-4">Saat air surut, Anda bisa berjalan kaki dari satu sisi pulau ke sisi lainnya hanya dalam beberapa menit, menyusuri hamparan pasir putih yang di beberapa titik berubah menjadi sandbar yang memanjang ke tengah laut. Fenomena alam ini menciptakan spot foto yang sangat instagramable — seolah-olah Anda berjalan di atas air.</p>
      <p>Karena statusnya sebagai pulau tak berpenghuni, fasilitas di Nusa Pombo sangat minim. Pengunjung perlu menyewa perahu dari Tulehu atau pelabuhan terdekat dan membawa sendiri semua kebutuhan termasuk makanan, air minum, dan perlengkapan. Justru itulah yang membuat pengalaman di Nusa Pombo terasa eksklusif — Anda bisa merasa memiliki pulau pribadi, walau hanya untuk sehari.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/nusa-pombo/foto-1.jpg',
        alt: 'Nusa Pombo — Foto 1',
        source: 'TikTok / @vaniiiiiiiiiii__',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/nusa-pombo/foto-2.jpg',
        alt: 'Nusa Pombo — Foto 2',
        source: 'TikTok / @rennofebrian24',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/nusa-pombo/foto-3.jpg',
        alt: 'Nusa Pombo — Foto 3',
        source: 'TikTok / @senittaklaku',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pulau+Pombo+Selat+Haruku+Maluku',
    highlights: ['Pulau tak berpenghuni', 'Diving & snorkeling premium', 'Sandbar saat surut', 'Eksklusivitas alami'],
    tips: 'Sewa perahu dari Tulehu (30 menit). Bawa semua kebutuhan sendiri termasuk payung/tenda untuk berteduh.'
  },

  // ── 11. MASJID TUA WAPAUWE ─────────────────────────────────
  {
    id: 11,
    name: 'Masjid Tua Wapauwe',
    categories: ['Sejarah', 'Budaya'],
    location: 'Kaitetu, Leihitu, Maluku Tengah',
    shortDesc: 'Masjid tertua di Maluku yang dibangun tahun 1414, terbuat dari pelepah sagu (gaba-gaba). Bukti sejarah penyebaran Islam di Indonesia Timur.',
    fullDesc: `
      <p class="mb-4">Masjid Tua Wapauwe adalah salah satu bangunan keagamaan tertua di Indonesia Timur dan menjadi bukti otentik sejarah penyebaran Islam di Kepulauan Maluku. Dibangun pada tahun 1414 Masehi di Negeri (Desa) Kaitetu, Kecamatan Leihitu, masjid ini telah berdiri selama lebih dari enam abad dan masih terawat hingga hari ini.</p>
      <p class="mb-4">Keunikan arsitektur Masjid Wapauwe terletak pada material bangunannya yang seluruhnya berasal dari alam lokal. Dinding masjid terbuat dari anyaman pelepah sagu atau gaba-gaba — material tradisional yang sangat umum digunakan dalam konstruksi bangunan di Maluku. Tiang-tiang penyangga terbuat dari batang kayu keras lokal, sementara atapnya menggunakan daun sagu kering yang disusun rapi berlapis-lapis.</p>
      <p class="mb-4">Meskipun terlihat sederhana, Masjid Wapauwe menyimpan berbagai benda bersejarah yang sangat berharga. Di dalamnya tersimpan Al-Quran kuno yang ditulis tangan di atas kulit kayu, serta beberapa artefak peninggalan para pedagang dan mubaligh yang menyebarkan Islam ke Maluku berabad-abad silam. Benda-benda ini dijaga dengan penuh kehormatan oleh masyarakat adat setempat.</p>
      <p>Masjid Tua Wapauwe bukan sekadar tempat ibadah — ia adalah simbol harmoni antara ajaran Islam dan kearifan lokal masyarakat Maluku. Arsitekturnya yang menggunakan material tradisional menunjukkan bagaimana Islam beradaptasi dan berdialog dengan budaya setempat tanpa menghilangkan identitas lokal. Kunjungan ke sini memberikan perspektif mendalam tentang keberagaman religius dan toleransi yang telah berlangsung di Maluku sejak berabad-abad lalu.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/masjid-tua-wapauwe/foto-1.jpg',
        alt: 'Masjid Tua Wapauwe — Foto 1',
        source: 'Instagram / @lia1196',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/masjid-tua-wapauwe/foto-2.jpg',
        alt: 'Masjid Tua Wapauwe — Foto 2',
        source: 'Instagram / @lia1196',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/masjid-tua-wapauwe/foto-3.jpg',
        alt: 'Masjid Tua Wapauwe — Foto 3',
        source: 'Instagram / @itups_',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid+Tua+Wapauwe+Kaitetu+Maluku',
    highlights: ['Dibangun tahun 1414', 'Material gaba-gaba asli', 'Al-Quran kuno tulisan tangan', 'Simbol toleransi'],
    tips: 'Hormati aturan berpakaian saat memasuki area masjid. Minta izin kepada penjaga sebelum memotret benda-benda bersejarah di dalamnya.'
  },

  // ── 12. GEREJA TUA IMANUEL HILA ────────────────────────────
  {
    id: 12,
    name: 'Gereja Tua Imanuel Hila',
    categories: ['Sejarah', 'Budaya'],
    location: 'Hila, Maluku Tengah',
    shortDesc: 'Gereja peninggalan era kolonial Belanda dengan arsitektur kayu khas Maluku. Berdiri megah di kawasan bersejarah Desa Hila bersama Benteng Amsterdam.',
    fullDesc: `
      <p class="mb-4">Gereja Tua Imanuel Hila merupakan salah satu gereja tertua di Maluku yang dibangun pada masa kolonial Belanda. Terletak di Desa Hila, bersebelahan dengan Benteng Amsterdam, gereja ini menjadi bagian dari kluster situs bersejarah yang menggambarkan kompleksitas sejarah kolonial di Maluku — di mana benteng, gereja, dan masjid saling berdampingan sebagai cerminan keberagaman yang telah ada sejak ratusan tahun lalu.</p>
      <p class="mb-4">Arsitektur Gereja Imanuel Hila menampilkan perpaduan menarik antara gaya Eropa dan sentuhan lokal Maluku. Struktur utama bangunan menggunakan kayu-kayu keras lokal yang diukir dengan detail oleh pengrajin setempat. Atap gereja yang tinggi menjulang, jendela-jendela kaca patri bergaya Gothic, dan menara lonceng yang masih berdiri kokoh menjadi saksi keahlian pertukangan masa lalu.</p>
      <p class="mb-4">Di dalam gereja, bangku-bangku kayu tua masih tertata rapi, dan mimbar kayu berukir halus masih digunakan dalam ibadah reguler hingga hari ini. Beberapa ornamen dan perabot gereja asli dari era kolonial masih dipertahankan, termasuk lonceng tua yang konon didatangkan langsung dari Belanda dan masih berbunyi nyaring setiap hari Minggu memanggil jemaat untuk beribadah.</p>
      <p>Kombinasi kunjungan ke Gereja Tua Imanuel Hila dan Benteng Amsterdam yang berdekatan memberikan gambaran lengkap tentang kehidupan di Hila pada masa kolonial. Desa Hila sendiri merupakan salah satu pusat peradaban tertua di Maluku, dan berjalan menyusuri jalan-jalan desanya yang teduh terasa seperti melangkah ke dalam halaman buku sejarah.</p>
    `,
    images: [
      {
        url: 'assets/images/destinasi/gereja-tua-imanuel-hila/foto-1.jpg',
        alt: 'Gereja Tua Imanuel Hila — Foto 1',
        source: 'TikTok / @asikha1902',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/gereja-tua-imanuel-hila/foto-2.jpg',
        alt: 'Gereja Tua Imanuel Hila — Foto 2',
        source: 'TikTok / @LatumahinaMual',
        sourceUrl: '#'
      },
      {
        url: 'assets/images/destinasi/gereja-tua-imanuel-hila/foto-3.jpg',
        alt: 'Gereja Tua Imanuel Hila — Foto 3',
        source: 'TikTok / @asikha1902',
        sourceUrl: '#'
      }
    ],
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gereja+Tua+Imanuel+Hila+Maluku',
    highlights: ['Arsitektur kayu khas Maluku', 'Kaca patri bergaya Gothic', 'Lonceng asli dari Belanda', 'Dekat Benteng Amsterdam'],
    tips: 'Kunjungi bersamaan dengan Benteng Amsterdam yang jaraknya hanya beberapa ratus meter. Hari Minggu bisa menyaksikan ibadah dengan nyanyian khas Maluku.'
  }

];


/**
 * DAFTAR KATEGORI UNTUK FILTER
 * Tambahkan kategori baru di sini jika diperlukan.
 */
const categoryList = ['Semua', 'Alam', 'Bahari', 'Sejarah', 'Budaya', 'Ikon Kota'];
