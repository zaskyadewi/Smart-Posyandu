<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Smart-Posyandu — Layanan Kesehatan Balita Modern</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">

    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                        <span class="block font-extrabold text-xl tracking-tight text-slate-900">Smart-Posyandu</span>
                        <span class="block text-xs font-semibold text-blue-600 uppercase tracking-wider">Mawar Sejahtera</span>
                    </div>
                </div>

                <nav class="hidden md:flex items-center gap-8 font-semibold text-slate-600 text-sm">
                    <a href="#beranda" class="hover:text-blue-600 transition">Beranda</a>
                    <a href="#fitur" class="hover:text-blue-600 transition">Fitur Layanan</a>
                    <a href="#tentang" class="hover:text-blue-600 transition">Tentang Program</a>
                    <a href="#kontak" class="hover:text-blue-600 transition">Kontak</a>
                </nav>

                <div>
                    @if (Route::has('login'))
                        <div class="flex items-center gap-3">
                            @auth
                                <span class="hidden sm:inline-block text-sm font-bold text-slate-700">
                                    Halo, <span class="text-blue-600">{{ Auth::user()->name }}</span>
                                </span>
                                <form method="POST" action="{{ route('logout') }}" class="inline">
                                    @csrf
                                    <button type="submit" class="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-xl text-xs border border-red-200 transition" title="Keluar">
                                        Keluar
                                    </button>
                                </form>
                            @else
                                <a href="{{ route('login') }}" class="font-bold text-slate-700 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm transition">
                                    Login
                                </a>
                                @if (Route::has('register'))
                                    <a href="{{ route('register') }}" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm transition">
                                        Daftar Akun
                                    </a>
                                @endif
                            @endauth
                        </div>
                    @endif
                </div>

            </div>
        </div>
    </header>

    @auth
    <div class="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl border-2 border-blue-600 shadow-xl p-6 sm:p-8">
            
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                <div>
                    <h3 class="text-xl font-black text-slate-900 mb-1">Selamat Datang di Portal Posyandu! 👋</h3>
                    <p class="text-sm text-slate-600">
                        @if(Auth::user()->role === 'kader')
                            Anda memiliki hak akses sebagai <strong class="text-blue-600">Kader Posyandu (Admin)</strong>. Anda dapat mengelola seluruh data.
                        @else
                            Anda masuk sebagai <strong class="text-emerald-600">Ibu Balita / Warga</strong>. Anda dapat memantau transparansi data tumbuh kembang anak.
                        @endif
                    </p>
                </div>
                <div>
                    @if(Auth::user()->role === 'kader')
                        <span class="bg-blue-100 text-blue-800 font-extrabold text-xs px-4 py-2 rounded-full border border-blue-200 uppercase tracking-wide inline-block">
                            Akses: Kader (Admin)
                        </span>
                    @else
                        <span class="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-4 py-2 rounded-full border border-emerald-200 uppercase tracking-wide inline-block">
                            Akses: Ibu Balita
                        </span>
                    @endif
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <a href="{{ route('balita.index') }}" class="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition bg-slate-50 hover:bg-white flex items-center gap-4 group">
                    <div class="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm group-hover:scale-105 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                        <h4 class="font-extrabold text-slate-900 text-base">Data Balita & Ibu</h4>
                        <p class="text-xs text-slate-500 font-medium mt-0.5">
                            @if(Auth::user()->role === 'kader') + Tambah & Kelola Data @else Lihat Daftar Anak @endif
                        </p>
                    </div>
                </a>

                <a href="{{ route('pemeriksaan.index') }}" class="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition bg-slate-50 hover:bg-white flex items-center gap-4 group">
                    <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm group-hover:scale-105 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div>
                        <h4 class="font-extrabold text-slate-900 text-base">Pemeriksaan & KMS</h4>
                        <p class="text-xs text-slate-500 font-medium mt-0.5">
                            @if(Auth::user()->role === 'kader') + Input Timbangan & AI @else Lihat Status Gizi & KMS @endif
                        </p>
                    </div>
                </a>

                <a href="{{ route('pemeriksaan.cetak') }}" target="_blank" class="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition bg-slate-50 hover:bg-white flex items-center gap-4 group">
                    <div class="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm group-hover:scale-105 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                    </div>
                    <div>
                        <h4 class="font-extrabold text-slate-900 text-base">Laporan Posyandu</h4>
                        <p class="text-xs text-slate-500 font-medium mt-0.5">Cetak & Unduh PDF</p>
                    </div>
                </a>

            </div>

        </div>
    </div>
    @endauth

    <section id="beranda" class="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200/60">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 font-bold text-xs uppercase tracking-wide mb-8">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                Digitalisasi Kesehatan Ibu dan Anak
            </div>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Transformasi Digital Posyandu <br class="hidden sm:inline">
                <span class="text-blue-600">Mawar Sejahtera</span>
            </h1>

            <p class="max-w-2xl mx-auto text-base sm:text-lg font-normal text-slate-600 leading-relaxed mb-10">
                Meningkatkan standar pelayanan kesehatan balita melalui pencatatan terintegrasi, pemantauan status gizi otomatis berstandar medis, dan akses data yang transparan bagi warga desa.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <a href="#fitur" class="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/20 text-base transition">
                    Pelajari Fitur Sistem
                </a>
                @if (Route::has('login'))
                    @guest
                        <a href="{{ route('login') }}" class="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-4 rounded-xl border border-slate-300 shadow-sm text-base transition">
                            Masuk Sekarang
                        </a>
                    @endguest
                @endif
            </div>

            <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 md:p-8 max-w-4xl mx-auto">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div class="pt-4 md:pt-0 first:pt-0">
                        <span class="block text-3xl md:text-4xl font-black text-blue-600 tracking-tight">500+</span>
                        <span class="block text-sm font-semibold text-slate-500 mt-1">Balita Terdaftar</span>
                    </div>
                    <div class="pt-4 md:pt-0">
                        <span class="block text-3xl md:text-4xl font-black text-slate-900 tracking-tight">98%</span>
                        <span class="block text-sm font-semibold text-slate-500 mt-1">Akurasi Analisis Gizi</span>
                    </div>
                    <div class="pt-4 md:pt-0">
                        <span class="block text-3xl md:text-4xl font-black text-blue-600 tracking-tight">24/7</span>
                        <span class="block text-sm font-semibold text-slate-500 mt-1">Akses Data Riwayat</span>
                    </div>
                    <div class="pt-4 md:pt-0">
                        <span class="block text-3xl md:text-4xl font-black text-slate-900 tracking-tight">10+</span>
                        <span class="block text-sm font-semibold text-slate-500 mt-1">Kader Aktif Melayani</span>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <section id="fitur" class="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Layanan Terpadu</h2>
            <h3 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Fitur Unggulan Sistem Kami</h3>
            <p class="text-slate-600 text-base mt-4 font-normal">
                Dirancang dengan antarmuka yang sederhana dan jelas untuk memudahkan tugas kader Posyandu serta memberikan kenyamanan bagi ibu balita dalam memantau tumbuh kembang anak.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-500/50 hover:shadow-lg transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Pencatatan Balita Digital</h4>
                    <p class="text-slate-600 text-sm leading-relaxed">Menggantikan buku register manual dengan sistem penyimpanan digital yang rapi, cepat dicari, serta meminimalisir risiko kehilangan data administrasi desa.</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-500/50 hover:shadow-lg transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Deteksi Stunting Otomatis</h4>
                    <p class="text-slate-600 text-sm leading-relaxed">Algoritma medis pintar yang menganalisis rasio tinggi badan dan umur secara langsung sesuai standar WHO untuk memberikan deteksi dini dan tepat terhadap risiko stunting.</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-500/50 hover:shadow-lg transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Grafik KMS Interaktif</h4>
                    <p class="text-slate-600 text-sm leading-relaxed">Kartu Menuju Sehat (KMS) hadir dalam bentuk grafik digital yang jelas dan mudah dipahami, memudahkan pemantauan tren kenaikan berat badan balita setiap bulan.</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-500/50 hover:shadow-lg transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Cetak Laporan Resmi</h4>
                    <p class="text-slate-600 text-sm leading-relaxed">Kader dapat mencetak surat laporan hasil pemeriksaan resmi ber-KOP surat Posyandu yang siap ditandatangani oleh Bidan Desa atau Kepala Desa hanya dalam satu klik.</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-500/50 hover:shadow-lg transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Riwayat Penimbangan Rutin</h4>
                    <p class="text-slate-600 text-sm leading-relaxed">Mencatat histori perkembangan fisik anak dari bulan ke bulan secara lengkap, membantu tenaga kesehatan dalam melacak rekam medis anak dengan akurat.</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-500/50 hover:shadow-lg transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Keamanan Data Terjamin</h4>
                    <p class="text-slate-600 text-sm leading-relaxed">Sistem berbasis hak akses yang memastikan bahwa data pribadi warga dan riwayat medis anak hanya dapat dikelola oleh kader dan bidan yang berwenang.</p>
                </div>
            </div>
        </div>
    </section>

    <footer id="kontak" class="bg-white border-t border-slate-200/80 pt-16 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
                <span class="font-extrabold text-lg text-slate-900 tracking-tight">Smart-Posyandu Mawar Sejahtera</span>
                <p class="text-slate-500 text-sm mt-1">Pelayanan Kesehatan Balita & Ibu &bull; Kabupaten Malang, Jawa Timur.</p>
            </div>
            <div class="text-slate-400 text-sm font-medium">
                &copy; {{ date('Y') }} Smart-Posyandu. Dibuat untuk Generasi Sehat Indonesia.
            </div>
        </div>
    </footer>

</body>
</html>