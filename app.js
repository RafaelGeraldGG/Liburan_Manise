// ============================================================
// APP.JS — Logika Utama Website Pariwisata Liburan Manise
// ============================================================
// File ini menangani semua interaksi: rendering destinasi,
// filtering, pencarian, dark mode, modal, galeri, dan animasi.
// ============================================================

(function () {
  'use strict';

  // ── STATE ──────────────────────────────────────────────────
  let currentCategory = 'Semua';
  let searchQuery = '';
  let currentModalId = null;
  let currentGalleryIndex = 0;
  let currentViewMode = localStorage.getItem('manise-view-mode') || 'grid';
  let currentSortMode = localStorage.getItem('manise-sort-mode') || 'default';
  let clockInterval = null;

  // ── DOM CACHE ──────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ── INITIALIZATION ─────────────────────────────────────────
  function initApp() {
    initDarkMode();
    initHero();
    initMarquee();
    initNavbar();
    initFilters();
    initSearch();
    initCatalogViews();
    initAmbonClock();
    initAmbonWeatherAndMarine();
    initWeatherModal();
    renderDestinations();
    initModal();
    initAbout();
    initScrollAnimations();
    initBackToTop();
    initMobileMenu();
  }

  // ── DARK MODE ──────────────────────────────────────────────
  function initDarkMode() {
    const toggles = [$('#dark-mode-toggle'), $('#dark-mode-toggle-mobile')].filter(Boolean);
    if (toggles.length === 0) return;

    // Cek preferensi tersimpan atau sistem
    const savedTheme = localStorage.getItem('maluku-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }

    toggles.forEach(toggle => toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('maluku-theme', isDark ? 'dark' : 'light');
    }));
  }


  // ── HERO SECTION ───────────────────────────────────────────
  function initHero() {
    const heroTitle = $('#hero-title');
    const heroSubtitle = $('#hero-subtitle');
    const heroBg = $('#hero-bg');
    const heroImage = $('#hero-image');

    if (!heroBg) return;

    if (heroConfig.videoUrl) {
      heroBg.innerHTML = `
        <video autoplay muted loop playsinline class="w-full h-full object-cover">
          <source src="${heroConfig.videoUrl}" type="video/mp4">
          <img src="${heroConfig.fallbackImageUrl}" alt="${heroConfig.imageAlt}" class="w-full h-full object-cover">
        </video>
      `;
    } else if (heroImage) {
      heroImage.onerror = function() {
        this.onerror = null;
        this.src = heroConfig.fallbackImageUrl;
      };
      heroImage.src = heroConfig.imageUrl;
      heroImage.alt = heroConfig.imageAlt;
    }

    if (heroTitle) heroTitle.textContent = heroConfig.title;
    if (heroSubtitle) heroSubtitle.textContent = heroConfig.subtitle;

    // Hero search bar
    const heroSearch = $('#hero-search-input');
    if (heroSearch) {
      heroSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        // Sync dengan search di section destinasi
        const destSearch = $('#dest-search-input');
        if (destSearch) destSearch.value = e.target.value;
        renderDestinations();
        // Scroll ke section destinasi jika ada input
        if (searchQuery.length > 0) {
          const destSection = $('#destinations');
          if (destSection) {
            destSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });

      heroSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const destSection = $('#destinations');
          if (destSection) {
            destSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }
  }


  // ── MARQUEE ────────────────────────────────────────────────
  function initMarquee() {
    const track = $('#marquee-track');
    if (!track) return;

    // Buat konten marquee (duplikasi untuk efek seamless)
    const text = heroConfig.marqueeText;
    track.innerHTML = `
      <span class="marquee-content">${text}</span>
      <span class="marquee-content">${text}</span>
      <span class="marquee-content">${text}</span>
      <span class="marquee-content">${text}</span>
    `;
  }


  // ── NAVBAR ─────────────────────────────────────────────────
  function initNavbar() {
    const navbar = $('#navbar');
    if (!navbar) return;

    // Scroll effect: tambah class 'scrolled' saat scroll
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check

    // Smooth scroll untuk nav links
    $$('a[href^="#"]', navbar).forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = $(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Tutup mobile menu jika terbuka
          const mobileMenu = $('#mobile-menu');
          if (mobileMenu) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
            $('#mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }


  // ── FILTER KATEGORI ────────────────────────────────────────
  function initFilters() {
    const container = $('#filter-container');
    if (!container) return;

    // Render tombol filter dari data
    container.innerHTML = categoryList.map(cat => `
      <button class="filter-btn px-4 py-2 rounded-full text-sm font-medium 
                      text-slate-600 dark:text-slate-300 
                      hover:text-teal-600 dark:hover:text-teal-400
                      ${cat === currentCategory ? 'active' : ''}"
              data-category="${cat}"
              aria-label="Filter: ${cat}">
        ${cat}
      </button>
    `).join('');

    // Event listener untuk setiap tombol filter
    $$('.filter-btn', container).forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.dataset.category;

        // Update active state
        $$('.filter-btn', container).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        renderDestinations();
      });
    });
  }


  // ── PENCARIAN REAL-TIME ────────────────────────────────────
  function initSearch() {
    const searchInput = $('#dest-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      // Sync dengan hero search
      const heroSearch = $('#hero-search-input');
      if (heroSearch) heroSearch.value = e.target.value;
      renderDestinations();
    });
  }


  // ── KATALOG VIEW SWITCHER & SORTING ────────────────────────
  function initCatalogViews() {
    const viewBtns = $$('.view-btn');
    const sortSelect = $('#sort-select');

    // Set initial active button
    viewBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === currentViewMode);
      btn.addEventListener('click', () => {
        currentViewMode = btn.dataset.view;
        localStorage.setItem('manise-view-mode', currentViewMode);

        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        renderDestinations();
      });
    });

    if (sortSelect) {
      sortSelect.value = currentSortMode;
      sortSelect.addEventListener('change', (e) => {
        currentSortMode = e.target.value;
        localStorage.setItem('manise-sort-mode', currentSortMode);
        renderDestinations();
      });
    }
  }


  // ── RENDER DESTINASI (Mendukung Grid, List, dan Compact View) ─
  function renderDestinations() {
    const grid = $('#destination-grid');
    if (!grid) return;

    // Filter berdasarkan kategori & pencarian
    let filtered = destinations.filter(dest => {
      const matchCategory = currentCategory === 'Semua' ||
        dest.categories.some(c =>
          c.toLowerCase() === currentCategory.toLowerCase()
        );

      const matchSearch = searchQuery === '' ||
        dest.name.toLowerCase().includes(searchQuery) ||
        dest.location.toLowerCase().includes(searchQuery) ||
        dest.categories.some(c => c.toLowerCase().includes(searchQuery));

      return matchCategory && matchSearch;
    });

    // Pengurutan (Sorting)
    if (currentSortMode === 'name-asc') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'id'));
    } else if (currentSortMode === 'name-desc') {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name, 'id'));
    }

    // Update counter & badge
    const countEl = $('#dest-count');
    const badgeEl = $('#active-filter-badge');
    if (countEl) countEl.textContent = filtered.length;
    if (badgeEl) badgeEl.textContent = currentCategory === 'Semua' ? 'Semua Destinasi' : currentCategory;

    // Layout classes sesuai view mode
    if (currentViewMode === 'list') {
      grid.className = 'flex flex-col gap-5';
    } else if (currentViewMode === 'compact') {
      grid.className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4';
    } else {
      // Default: Grid
      grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
    }

    // Render pesan kosong jika tidak ditemukan
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full w-full flex flex-col items-center justify-center py-20 text-center">
          <div class="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-gray-800 flex items-center justify-center text-teal-500 mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">Destinasi tidak ditemukan</h3>
          <p class="text-sm text-slate-400 dark:text-slate-500 max-w-sm">Coba gunakan kata kunci lain atau pilih kategori yang berbeda</p>
        </div>
      `;
      return;
    }

    // Render kartu sesuai layout aktif
    grid.innerHTML = filtered.map((dest, index) => {
      if (currentViewMode === 'list') {
        return renderListCard(dest, index);
      } else if (currentViewMode === 'compact') {
        return renderCompactCard(dest, index);
      } else {
        return renderGridCard(dest, index);
      }
    }).join('');

    // Trigger fade-in animation setelah render
    requestAnimationFrame(() => {
      $$('.card-destination, .card-destination-list, .card-destination-compact', grid).forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 60);
      });
    });
  }


  // ── TEMPLATE TAMPILAN: GRID VIEW (STANDAR) ─────────────────
  function renderGridCard(dest, index) {
    const primaryImage = dest.images[0];
    const categoryBadges = dest.categories.map(cat => {
      const colors = getCategoryColor(cat);
      return `<span class="category-badge ${colors}">${cat}</span>`;
    }).join(' ');

    return `
      <article class="card-destination fade-in bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
                      shadow-sm dark:shadow-gray-900/30 border border-slate-100 dark:border-gray-700/50 cursor-pointer group flex flex-col justify-between"
               onclick="window.__openModal(${dest.id})"
               role="button" tabindex="0" 
               aria-label="Lihat detail ${dest.name}"
               onkeydown="if(event.key==='Enter')window.__openModal(${dest.id})">
        
        <!-- Card Image -->
        <div>
          <div class="card-img-wrapper aspect-[16/9] relative">
            <img src="${primaryImage.url}" 
                 alt="${primaryImage.alt}" 
                 class="card-img w-full h-full object-cover"
                 onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';"
                 loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Category Badges -->
            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
              ${categoryBadges}
            </div>

            <!-- Image Count -->
            <div class="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              ${dest.images.length}
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-4">
            <p class="text-xs text-slate-400 dark:text-slate-500 mb-1">
              Foto:
              <a href="${primaryImage.sourceUrl}" target="_blank" rel="noopener noreferrer"
                 onclick="event.stopPropagation()"
                 class="underline hover:text-teal-500 transition-colors">${primaryImage.source}</a>
            </p>
            <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300 line-clamp-1">
              ${dest.name}
            </h3>
            
            <!-- Location -->
            <div class="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-2">
              <svg class="w-4 h-4 flex-shrink-0 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="truncate">${dest.location}</span>
            </div>

            <!-- Short Description -->
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
              ${dest.shortDesc}
            </p>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="px-4 pb-4 pt-0">
          <div class="pt-3 border-t border-slate-100 dark:border-gray-700/60 flex items-center justify-between">
            <button class="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 
                           group-hover:gap-2.5 transition-all duration-300"
                    aria-label="Lihat detail ${dest.name}">
              Jelajahi
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            <span class="text-xs text-slate-400 dark:text-slate-500 group-hover:text-teal-500 transition-colors">Lihat detail ↗</span>
          </div>
        </div>
      </article>
    `;
  }


  // ── TEMPLATE TAMPILAN: LIST VIEW (HORIZONTAL & RINCI) ──────
  function renderListCard(dest, index) {
    const primaryImage = dest.images[0];
    const categoryBadges = dest.categories.map(cat => {
      const colors = getCategoryColor(cat);
      return `<span class="category-badge ${colors}">${cat}</span>`;
    }).join(' ');

    const highlightChips = dest.highlights.slice(0, 3).map(h => `
      <span class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium">
        <svg class="w-3 h-3 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        ${h}
      </span>
    `).join(' ');

    return `
      <article class="card-destination-list fade-in bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-gray-900/30 border border-slate-100 dark:border-gray-700/60 flex flex-col md:flex-row group cursor-pointer"
               onclick="window.__openModal(${dest.id})"
               role="button" tabindex="0"
               aria-label="Lihat detail ${dest.name}"
               onkeydown="if(event.key==='Enter')window.__openModal(${dest.id})">
        
        <!-- Left: Image -->
        <div class="card-img-wrapper md:w-80 lg:w-96 h-56 md:h-auto flex-shrink-0 relative overflow-hidden">
          <img src="${primaryImage.url}" alt="${primaryImage.alt}"
               class="card-img w-full h-full object-cover"
               onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';"
               loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            ${categoryBadges}
          </div>

          <div class="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            ${dest.images.length} Foto
          </div>
        </div>

        <!-- Right: Content -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 class="text-xl md:text-2xl font-bold text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                ${dest.name}
              </h3>
              <p class="text-xs text-slate-400 dark:text-slate-500">
                Foto: <a href="${primaryImage.sourceUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="underline hover:text-teal-500">${primaryImage.source}</a>
              </p>
            </div>

            <!-- Location -->
            <div class="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <svg class="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>${dest.location}</span>
            </div>

            <!-- Description -->
            <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 md:line-clamp-3 mb-4 leading-relaxed">
              ${dest.shortDesc}
            </p>

            <!-- Highlights -->
            <div class="flex flex-wrap gap-2 mb-4">
              ${highlightChips}
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-4 border-t border-slate-100 dark:border-gray-700/60 flex items-center justify-between">
            <span class="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <span>📍</span> Titik Google Maps & Galeri Tersedia
            </span>
            <button class="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:gap-2.5 transition-all">
              Jelajahi Lengkap
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }


  // ── TEMPLATE TAMPILAN: COMPACT VIEW (RINGKAS & PADAT) ───────
  function renderCompactCard(dest, index) {
    const primaryImage = dest.images[0];
    const primaryCategory = dest.categories[0] || 'Wisata';
    const categoryColor = getCategoryColor(primaryCategory);

    return `
      <article class="card-destination-compact fade-in bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm dark:shadow-gray-900/30 border border-slate-100 dark:border-gray-700/60 cursor-pointer group flex flex-col justify-between"
               onclick="window.__openModal(${dest.id})"
               role="button" tabindex="0"
               aria-label="Lihat detail ${dest.name}"
               onkeydown="if(event.key==='Enter')window.__openModal(${dest.id})">
        
        <!-- Image -->
        <div class="card-img-wrapper aspect-[4/3] relative overflow-hidden">
          <img src="${primaryImage.url}" alt="${primaryImage.alt}"
               class="card-img w-full h-full object-cover"
               onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';"
               loading="lazy">
          <div class="absolute top-2 left-2">
            <span class="category-badge text-[10px] px-2 py-0.5 ${categoryColor}">${primaryCategory}</span>
          </div>
          <div class="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            ${dest.images.length} 📷
          </div>
        </div>

        <!-- Info -->
        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xs sm:text-sm font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-1">
              ${dest.name}
            </h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mb-2">
              <svg class="w-3 h-3 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              ${dest.location}
            </p>
          </div>
          <div class="pt-2 border-t border-slate-100 dark:border-gray-700/50 flex items-center justify-between text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
            <span>Detail</span>
            <span class="group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>
      </article>
    `;
  }


  // ── AMBON LIVE CLOCK (WIT - UTC+9) ─────────────────────────
  function initAmbonClock() {
    function updateClock() {
      const now = new Date();

      // Jam format pendek (HH:mm) untuk navbar
      const hm = now.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jayapura', // WIT (Maluku & Papua = UTC+9)
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      // Jam format lengkap (HH:mm:ss) untuk modal
      const hms = now.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jayapura',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      // Tanggal format Indonesia
      const fullDate = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jayapura',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(now);

      const navTime = $('#nav-live-time');
      const navTimeMobile = $('#nav-live-time-mobile');
      const drawerTime = $('#drawer-live-time');
      const modalClock = $('#modal-live-clock');
      const modalDate = $('#modal-live-date');

      if (navTime) navTime.textContent = `${hm} WIT`;
      if (navTimeMobile) navTimeMobile.textContent = `${hm} WIT`;
      if (drawerTime) drawerTime.textContent = `${hm} WIT`;
      if (modalClock) modalClock.textContent = `${hms} WIT`;
      if (modalDate) modalDate.textContent = fullDate;
    }

    updateClock();
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(updateClock, 1000);
  }


  // ── AMBON WEATHER & MARINE (BMKG / OPEN-METEO SYNC) ────────
  function initAmbonWeatherAndMarine() {
    // Koordinat Kota Ambon & Perairan Teluk Ambon
    const AMBON_LAT = -3.6954;
    const AMBON_LNG = 128.1814;

    // Nilai default realistis iklim tropis Ambon (langsung tampil tanpa delay)
    const defaultData = {
      temp: 29,
      feels: 32,
      humidity: 78,
      windSpeed: 12,
      windDirection: 'Tenggara',
      weatherDesc: 'Cerah Berawan',
      weatherIcon: '⛅',
      waveHeight: 0.5,
      waveCategory: 'Tenang (0.5m)',
      wavePeriod: 5,
      waveDirection: 'Tenggara (135°)',
      waveSafety: 'Tenang & Aman Berlayar',
      ferryStatus: 'Sangat aman untuk penyeberangan feri & speedboat (Saparua, Seram, Haruku).',
      divingStatus: 'Visibilitas air sangat jernih (15 - 20 m) di Pantai Liang & Pombo.',
      swimmingStatus: 'Ombak pesisir bersahabat & aman untuk rekreasi keluarga.'
    };

    function applyDataToUI(data) {
      // Navbar elements
      const navTemp = $('#nav-weather-temp');
      const navIcon = $('#nav-weather-icon');
      const navWave = $('#nav-wave-status');
      if (navTemp) navTemp.textContent = `${data.temp}°C`;
      if (navIcon) navIcon.textContent = data.weatherIcon;
      if (navWave) navWave.textContent = `Gel. ${data.waveHeight}m`;

      // Mobile Navbar elements
      const navTempMob = $('#nav-weather-temp-mobile');
      const navIconMob = $('#nav-weather-icon-mobile');
      if (navTempMob) navTempMob.textContent = `${data.temp}°C`;
      if (navIconMob) navIconMob.textContent = data.weatherIcon;

      // Drawer elements
      const drawerTemp = $('#drawer-weather-temp');
      const drawerIcon = $('#drawer-weather-icon');
      const drawerWave = $('#drawer-wave-status');
      if (drawerTemp) drawerTemp.textContent = `${data.temp}°C`;
      if (drawerIcon) drawerIcon.textContent = data.weatherIcon;
      if (drawerWave) drawerWave.textContent = `${data.waveHeight}m (${data.waveCategory})`;

      // Modal elements
      const modalTemp = $('#modal-weather-temp');
      const modalDesc = $('#modal-weather-desc');
      const modalIcon = $('#modal-weather-icon');
      const modalHumidity = $('#modal-weather-humidity');
      const modalWind = $('#modal-weather-wind');
      const modalFeels = $('#modal-weather-feels');

      if (modalTemp) modalTemp.textContent = `${data.temp}°C`;
      if (modalDesc) modalDesc.textContent = data.weatherDesc;
      if (modalIcon) modalIcon.textContent = data.weatherIcon;
      if (modalHumidity) modalHumidity.textContent = `${data.humidity}%`;
      if (modalWind) modalWind.textContent = `${data.windSpeed} km/jam (${data.windDirection})`;
      if (modalFeels) modalFeels.textContent = `${data.feels}°C`;

      const modalWaveHeight = $('#modal-wave-height');
      const modalWaveCat = $('#modal-wave-category');
      const modalWavePeriod = $('#modal-wave-period');
      const modalWaveDir = $('#modal-wave-direction');
      const modalWaveSafety = $('#modal-wave-safety');

      if (modalWaveHeight) modalWaveHeight.textContent = `${data.waveHeight} m`;
      if (modalWaveCat) modalWaveCat.textContent = data.waveCategory;
      if (modalWavePeriod) modalWavePeriod.textContent = `${data.wavePeriod} detik`;
      if (modalWaveDir) modalWaveDir.textContent = data.waveDirection;
      if (modalWaveSafety) modalWaveSafety.textContent = data.waveSafety;

      const guideFerry = $('#guide-ferry');
      const guideDiving = $('#guide-diving');
      const guideSwimming = $('#guide-swimming');
      if (guideFerry) guideFerry.textContent = data.ferryStatus;
      if (guideDiving) guideDiving.textContent = data.divingStatus;
      if (guideSwimming) guideSwimming.textContent = data.swimmingStatus;

      const lastUpdated = $('#weather-last-updated');
      if (lastUpdated) {
        const timeNow = new Date().toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jayapura',
          hour: '2-digit',
          minute: '2-digit'
        });
        lastUpdated.textContent = `Diperbarui pukul ${timeNow} WIT`;
      }
    }

    // Set initial default data langsung
    applyDataToUI(defaultData);

    // Fungsi fetch live Open-Meteo
    async function fetchLiveWeather() {
      const refreshBtn = $('#btn-refresh-weather');
      const refreshIcon = $('#refresh-icon');
      if (refreshIcon) refreshIcon.classList.add('spinning');

      try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${AMBON_LAT}&longitude=${AMBON_LNG}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&timezone=Asia%2FJayapura`;
        const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${AMBON_LAT}&longitude=${AMBON_LNG}&current=wave_height,wave_direction,wave_period&timezone=Asia%2FJayapura`;

        // Timeout controller 4.5 detik
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);

        const [resWeather, resMarine] = await Promise.allSettled([
          fetch(weatherUrl, { signal: controller.signal }),
          fetch(marineUrl, { signal: controller.signal })
        ]);
        clearTimeout(timeoutId);

        let liveData = { ...defaultData };

        // Parse weather data
        if (resWeather.status === 'fulfilled' && resWeather.value.ok) {
          const wJson = await resWeather.value.json();
          if (wJson && wJson.current) {
            const cur = wJson.current;
            liveData.temp = Math.round(cur.temperature_2m);
            liveData.feels = Math.round(cur.apparent_temperature || cur.temperature_2m);
            liveData.humidity = cur.relative_humidity_2m;
            liveData.windSpeed = Math.round(cur.wind_speed_10m);

            // WMO Weather mapping
            const code = cur.weather_code;
            if (code === 0) {
              liveData.weatherDesc = 'Cerah';
              liveData.weatherIcon = '☀️';
            } else if (code <= 3) {
              liveData.weatherDesc = 'Cerah Berawan';
              liveData.weatherIcon = '⛅';
            } else if (code <= 48) {
              liveData.weatherDesc = 'Berkabut Tipis';
              liveData.weatherIcon = '🌫️';
            } else if (code <= 55) {
              liveData.weatherDesc = 'Gerimis Ringan';
              liveData.weatherIcon = '🌦️';
            } else if (code <= 65) {
              liveData.weatherDesc = 'Hujan';
              liveData.weatherIcon = '🌧️';
            } else if (code <= 82) {
              liveData.weatherDesc = 'Hujan Tropis';
              liveData.weatherIcon = '🌦️';
            } else {
              liveData.weatherDesc = 'Hujan Petir';
              liveData.weatherIcon = '⛈️';
            }

            // Arah angin
            const deg = cur.wind_direction_10m || 135;
            const dirs = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
            liveData.windDirection = dirs[Math.round(deg / 45) % 8];
          }
        }

        // Parse marine wave data
        if (resMarine.status === 'fulfilled' && resMarine.value.ok) {
          const mJson = await resMarine.value.json();
          if (mJson && mJson.current) {
            const curM = mJson.current;
            const wh = curM.wave_height !== null && curM.wave_height !== undefined 
              ? Math.round(curM.wave_height * 10) / 10 
              : 0.5;

            liveData.waveHeight = wh;
            liveData.wavePeriod = curM.wave_period ? Math.round(curM.wave_period) : 5;

            if (curM.wave_direction !== undefined) {
              const degW = curM.wave_direction;
              const dirs = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
              liveData.waveDirection = `${dirs[Math.round(degW / 45) % 8]} (${degW}°)`;
            }

            // Kategori dan evaluasi keamanan bahari
            if (wh < 0.5) {
              liveData.waveCategory = 'Tenang (0.5m)';
              liveData.waveSafety = 'Tenang & Sangat Kondusif';
              liveData.ferryStatus = 'Sangat aman untuk penyeberangan feri & speedboat (Saparua, Seram, Haruku).';
              liveData.divingStatus = 'Visibilitas air sangat jernih (15 - 20 m) di Pantai Liang & Pombo.';
              liveData.swimmingStatus = 'Ombak pesisir bersahabat & aman untuk rekreasi keluarga.';
            } else if (wh <= 1.25) {
              liveData.waveCategory = `Rendah (${wh}m)`;
              liveData.waveSafety = 'Aman Berlayar & Berwisata';
              liveData.ferryStatus = 'Pelayaran reguler antar-pulau aman dan lancar.';
              liveData.divingStatus = 'Bagus untuk snorkeling & diving di spot terlindung.';
              liveData.swimmingStatus = 'Aman, tetap perhatikan batas aman pantai.';
            } else if (wh <= 2.0) {
              liveData.waveCategory = `Sedang (${wh}m)`;
              liveData.waveSafety = 'Waspada Alun Gelombang';
              liveData.ferryStatus = 'Speedboat kecil diimbau waspada alun gelombang.';
              liveData.divingStatus = 'Pilih lokasi penyelaman di dalam teluk tenang.';
              liveData.swimmingStatus = 'Berenang di dekat bibir pantai yang diawasi.';
            } else {
              liveData.waveCategory = `Tinggi (${wh}m)`;
              liveData.waveSafety = 'Tinggi - Harap Hati-Hati';
              liveData.ferryStatus = 'Pelayaran laut terbuka ditunda / menunggu panduan syahbandar.';
              liveData.divingStatus = 'Aktivitas bahari lepas pantai ditunda sementara.';
              liveData.swimmingStatus = 'Hindari berenang di pantai berombak terbuka.';
            }
          }
        }

        applyDataToUI(liveData);
      } catch (err) {
        // Jika offline atau gagal koneksi, tetap gunakan fallback realistis
        applyDataToUI(defaultData);
      } finally {
        setTimeout(() => {
          if (refreshIcon) refreshIcon.classList.remove('spinning');
        }, 500);
      }
    }

    // Jalankan fetch saat idle
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => fetchLiveWeather());
    } else {
      setTimeout(fetchLiveWeather, 300);
    }

    // Event listener tombol refresh
    const refreshBtn = $('#btn-refresh-weather');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetchLiveWeather();
      });
    }
  }


  // ── WEATHER MODAL CONTROLS ─────────────────────────────────
  function initWeatherModal() {
    const modal = $('#weather-modal');
    const closeBtn = $('#weather-modal-close');
    const triggers = [
      $('#ambon-live-btn'),
      $('#ambon-live-btn-mobile'),
      $('#ambon-live-btn-drawer')
    ].filter(Boolean);

    if (!modal) return;

    function openWeatherModal() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Tutup mobile menu jika sedang terbuka
      const mobileMenu = $('#mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        $('#mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
      }
    }

    function closeWeatherModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    triggers.forEach(trig => {
      trig.addEventListener('click', (e) => {
        e.preventDefault();
        openWeatherModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeWeatherModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeWeatherModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeWeatherModal();
      }
    });
  }


  // ── WARNA KATEGORI ─────────────────────────────────────────
  function getCategoryColor(category) {
    const colors = {
      'Alam': 'bg-emerald-500/90 text-white',
      'Bahari': 'bg-cyan-500/90 text-white',
      'Sejarah': 'bg-amber-500/90 text-white',
      'Budaya': 'bg-purple-500/90 text-white',
      'Ikon Kota': 'bg-rose-500/90 text-white',
    };
    return colors[category] || 'bg-slate-500/90 text-white';
  }


  // ── MODAL DETAIL ───────────────────────────────────────────
  function initModal() {
    const overlay = $('#modal-overlay');
    if (!overlay) return;

    // Tutup modal saat klik overlay
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Tutup modal dengan Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function openModal(id) {
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;

    currentModalId = id;
    currentGalleryIndex = 0;

    const overlay = $('#modal-overlay');
    const container = $('#modal-container');
    if (!overlay || !container) return;

    // Build gallery thumbnails
    const thumbs = dest.images.map((img, i) => `
      <div class="gallery-thumb ${i === 0 ? 'active' : ''}" 
           onclick="window.__setGalleryImage(${i})" 
           data-index="${i}">
        <img src="${img.url}" alt="${img.alt}" loading="lazy"
             onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80';">
      </div>
    `).join('');

    // Build highlights
    const highlights = dest.highlights.map(h => `
      <span class="highlight-chip">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        ${h}
      </span>
    `).join('');

    // Google Maps Embed & Direct URL
    const mapDirectUrl = dest.gmapsUrl || (dest.coords 
      ? `https://www.google.com/maps/search/?api=1&query=${dest.coords.lat},${dest.coords.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.name + ' ' + dest.location)}`);

    let mapEmbedUrl = dest.mapEmbedUrl || '';
    if (!mapEmbedUrl) {
      if (dest.gmapsUrl && (dest.gmapsUrl.includes('output=embed') || dest.gmapsUrl.includes('google.com/maps/embed'))) {
        mapEmbedUrl = dest.gmapsUrl;
      } else if (dest.coords && dest.coords.lat && dest.coords.lng) {
        mapEmbedUrl = `https://maps.google.com/maps?q=${dest.coords.lat},${dest.coords.lng}&hl=id&z=15&output=embed`;
      } else {
        mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(dest.name + ' ' + dest.location)}&hl=id&z=15&output=embed`;
      }
    }

    container.innerHTML = `
      <!-- Close Button -->
      <button onclick="window.__closeModal()" 
              class="sticky top-4 float-right z-10 mr-4 mt-4 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-700/90 
                     backdrop-blur-sm flex items-center justify-center shadow-lg
                     hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Tutup">
        <svg class="w-5 h-5 text-slate-700 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <div class="p-6 pt-2 md:p-8 md:pt-4">
        <!-- Gallery -->
        <div class="mb-6">
          <div class="gallery-main relative" id="gallery-main">
            <img src="${dest.images[0].url}" alt="${dest.images[0].alt}" id="gallery-main-img"
                 onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80';">
            <!-- Gallery Navigation Arrows -->
            <button onclick="window.__prevGalleryImage()" 
                           class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm ${dest.images.length <= 1 ? 'hidden' : ''} 
                           flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                    aria-label="Foto sebelumnya">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button onclick="window.__nextGalleryImage()" 
                           class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm ${dest.images.length <= 1 ? 'hidden' : ''} 
                           flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                    aria-label="Foto berikutnya">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <!-- Thumbnails -->
          <div class="gallery-thumbs ${dest.images.length <= 1 ? 'hidden' : ''}" id="gallery-thumbs">${thumbs}</div>
          
          <!-- Photo Source -->
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-2" id="photo-source">
            Sumber: <a href="${dest.images[0].sourceUrl}" target="_blank" rel="noopener noreferrer" 
                       class="underline hover:text-teal-500 transition-colors">${dest.images[0].source}</a>
          </p>
        </div>

        <!-- Title & Location -->
        <div class="mb-4">
          <div class="flex flex-wrap gap-1.5 mb-3">
            ${dest.categories.map(c => `<span class="category-badge ${getCategoryColor(c)}">${c}</span>`).join('')}
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">${dest.name}</h2>
          <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <svg class="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>${dest.location}</span>
          </div>
        </div>

        <!-- Highlights -->
        <div class="flex flex-wrap gap-2 mb-6">${highlights}</div>

        <!-- Description -->
        <div class="prose prose-slate dark:prose-invert max-w-none mb-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          ${dest.fullDesc}
        </div>

        <!-- Tips -->
        <div class="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50 rounded-xl p-4 mb-6">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-800/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-teal-800 dark:text-teal-300 text-sm mb-1">Tips Berkunjung</h4>
              <p class="text-sm text-teal-700 dark:text-teal-400/80">${dest.tips}</p>
            </div>
          </div>
        </div>

        <!-- Google Maps -->
        <div class="mb-2">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Titik Lokasi Google Maps
            </h3>
            <a href="${mapDirectUrl}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-xs md:text-sm font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
              Buka Titik Asli di Google Maps ↗
            </a>
          </div>
          <div class="map-container">
            <iframe src="${mapEmbedUrl}" 
                    width="100%" height="320" style="border:0;" 
                    allowfullscreen="" loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Peta ${dest.name}">
            </iframe>
          </div>
        </div>
      </div>
    `;

    // Show modal
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = $('#modal-overlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    document.body.style.overflow = '';
    currentModalId = null;
  }

  function setGalleryImage(index) {
    const dest = destinations.find(d => d.id === currentModalId);
    if (!dest || index < 0 || index >= dest.images.length) return;

    currentGalleryIndex = index;
    const img = dest.images[index];

    // Update main image dengan fade
    const mainImg = $('#gallery-main-img');
    if (mainImg) {
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.onerror = function() {
          this.onerror = null;
          this.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80';
        };
        mainImg.src = img.url;
        mainImg.alt = img.alt;
        mainImg.style.opacity = '1';
      }, 200);
    }

    // Update source
    const source = $('#photo-source');
    if (source) {
      source.innerHTML = `Sumber: <a href="${img.sourceUrl}" target="_blank" rel="noopener noreferrer" 
                          class="underline hover:text-teal-500 transition-colors">${img.source}</a>`;
    }

    // Update active thumb
    $$('.gallery-thumb').forEach(t => {
      t.classList.toggle('active', parseInt(t.dataset.index) === index);
    });
  }

  function nextGalleryImage() {
    const dest = destinations.find(d => d.id === currentModalId);
    if (!dest) return;
    const next = (currentGalleryIndex + 1) % dest.images.length;
    setGalleryImage(next);
  }

  function prevGalleryImage() {
    const dest = destinations.find(d => d.id === currentModalId);
    if (!dest) return;
    const prev = (currentGalleryIndex - 1 + dest.images.length) % dest.images.length;
    setGalleryImage(prev);
  }


  // ── ABOUT SECTION ──────────────────────────────────────────
  function initAbout() {
    const descContainer = $('#about-description');
    const devName = $('#dev-name');
    const devRole = $('#dev-role');
    const devBio = $('#dev-bio');
    const devPhoto = $('#dev-photo');
    const devEmail = $('#dev-email');
    const devEmailText = $('#dev-email-text');

    if (descContainer) descContainer.innerHTML = aboutConfig.websiteDescription;
    if (devName) devName.textContent = aboutConfig.developer.name;
    if (devRole) devRole.textContent = aboutConfig.developer.role;
    if (devBio) devBio.textContent = aboutConfig.developer.bio;
    if (devPhoto) {
      devPhoto.src = aboutConfig.developer.photoUrl;
      devPhoto.alt = aboutConfig.developer.name || 'Foto Pengembang';
      // Fallback otomatis jika foto lokal belum dimasukkan ke folder
      devPhoto.onerror = function() {
        this.onerror = null;
        this.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
      };
    }

    const emailVal = (aboutConfig.developer.socialLinks && aboutConfig.developer.socialLinks.email)
      || aboutConfig.developer.email || '';

    if (devEmail && emailVal) {
      const cleanEmail = emailVal.replace(/^mailto:/i, '').trim();
      devEmail.href = `mailto:${cleanEmail}`;
      if (devEmailText) {
        devEmailText.textContent = cleanEmail;
      }
    }
  }


  // ── SCROLL ANIMATIONS ─────────────────────────────────────
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    // Observe semua elemen dengan class fade-in
    $$('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
      observer.observe(el);
    });
  }


  // ── BACK TO TOP ────────────────────────────────────────────
  function initBackToTop() {
    const btn = $('#back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ── MOBILE MENU ────────────────────────────────────────────
  function initMobileMenu() {
    const toggleBtn = $('#mobile-menu-toggle');
    const closeBtn = $('#mobile-menu-close');
    const menu = $('#mobile-menu');

    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', () => {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    }

    // Close on link click
    $$('a', menu).forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ── EXPOSE FUNCTIONS TO GLOBAL (untuk onclick handlers) ────
  window.__openModal = openModal;
  window.__closeModal = closeModal;
  window.__setGalleryImage = setGalleryImage;
  window.__nextGalleryImage = nextGalleryImage;
  window.__prevGalleryImage = prevGalleryImage;


  // ── LAUNCH ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
