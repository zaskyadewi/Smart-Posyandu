<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Masuk ke Akun — Smart-Posyandu</title>
    
    <!-- Memanggil Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-blue-600 selection:text-white">

    <!-- KARTU UTAMA (SPLIT SCREEN 2 KOLOM) -->
    <div class="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-200/80">
        
        <!-- KOLOM KIRI: BRANDING & VISUAL (5 Kolom) -->
        <div class="md:col-span-5 bg-gradient-to-b from-blue-700 via-blue-800 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            
            <!-- Elemen Dekorasi Latar Belakang (Halus & Tidak Berlebihan) -->
            <div class="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -left-12 -bottom-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <!-- Bagian Atas: Logo & Nama -->
            <div class="relative z-10">
                <a href="{{ url('/') }}" class="inline-flex items-center gap-2.5 group">
                    <div class="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold transition group-hover:bg-white group-hover:text-blue-700">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <span class="font-extrabold text-lg tracking-tight">Smart-Posyandu</span>
                </a>
            </div>

            <!-- Bagian Tengah: Teks Utama -->
            <div class="my-10 relative z-10">
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-4">
                    Membangun Generasi Sehat, Mulai dari Desa.
                </h1>
                <p class="text-blue-100 text-sm leading-relaxed font-normal">
                    Platform terpadu untuk Kader & Bidan mengelola kesehatan balita dan ibu secara efisien, transparan, dan akurat.
                </p>
            </div>

            <!-- Bagian Bawah: Info Komunitas / Latar Belakang -->
            <div class="relative z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                <div class="flex items-center gap-3">
                    <!-- Grup Ikon Pengguna (Pengganti Foto) -->
                    <div class="flex -space-x-2 overflow-hidden shrink-0">
                        <div class="inline-block h-8 w-8 rounded-full ring-2 ring-blue-800 bg-blue-500 flex items-center justify-center text-xs font-bold text-white">S</div>
                        <div class="inline-block h-8 w-8 rounded-full ring-2 ring-blue-800 bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">R</div>
                        <div class="inline-block h-8 w-8 rounded-full ring-2 ring-blue-800 bg-amber-500 flex items-center justify-center text-xs font-bold text-white">B</div>
                    </div>
                    <div class="text-xs leading-tight">
                        <span class="font-bold block text-white">Bergabung bersama 500+ Kader</span>
                        <span class="text-blue-200">di wilayah Mawar Sejahtera</span>
                    </div>
                </div>
            </div>

        </div>

        <!-- KOLOM KANAN: FORMULIR LOGIN (7 Kolom) -->
        <div class="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            
            <!-- Navigasi Tab (Masuk / Daftar) -->
            <div class="bg-slate-100 p-1 rounded-xl inline-flex mb-8 self-start border border-slate-200/60">
                <a href="{{ route('login') }}" class="bg-white text-blue-600 font-bold shadow-sm px-6 py-2 rounded-lg text-sm transition">
                    Masuk
                </a>
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="text-slate-600 hover:text-slate-900 font-semibold px-6 py-2 rounded-lg text-sm transition">
                        Daftar
                    </a>
                @endif
            </div>

            <!-- Judul Formulir -->
            <div class="mb-6">
                <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Selamat Datang Kembali</h2>
                <p class="text-sm text-slate-500 mt-1">Silakan masuk menggunakan akun kader Smart-Posyandu Anda.</p>
            </div>

            <!-- PESAN ERROR ATAU STATUS SESSION DARI LARAVEL -->
            @if (session('status'))
                <div class="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold">
                    {{ session('status') }}
                </div>
            @endif

            @if ($errors->any())
                <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <p class="font-bold mb-1">Gagal Masuk:</p>
                    <ul class="list-disc list-inside text-xs space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- FORMULIR UTAMA -->
            <form method="POST" action="{{ route('login') }}" class="space-y-5">
                @csrf

                <!-- Kolom Email -->
                <div>
                    <label for="email" class="block text-sm font-bold text-slate-700 mb-1.5">Alamat Email</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                        </div>
                        <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus placeholder="contoh: kader@email.com" 
                            class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition">
                    </div>
                </div>

                <!-- Kolom Kata Sandi -->
                <div>
                    <label for="password" class="block text-sm font-bold text-slate-700 mb-1.5">Kata Sandi</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <input id="password" type="password" name="password" required placeholder="••••••••" 
                            class="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition">
                        
                        <!-- Tombol Intip Sandi (Eye Toggle) -->
                        <button type="button" onclick="togglePassword()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none" title="Lihat Kata Sandi">
                            <svg id="eye-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Ingat Saya & Lupa Sandi -->
                <div class="flex items-center justify-between pt-1">
                    <label for="remember_me" class="inline-flex items-center gap-2.5 cursor-pointer">
                        <input id="remember_me" type="checkbox" name="remember" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 focus:ring-offset-0 cursor-pointer">
                        <span class="text-sm font-semibold text-slate-600 select-none">Ingat Saya</span>
                    </label>

                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}" class="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline transition">
                            Lupa Sandi?
                        </a>
                    @endif
                </div>

                <!-- Tombol Masuk -->
                <div class="pt-2">
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/25 text-base flex items-center justify-center gap-2 transition duration-200">
                        <span>Masuk Sekarang</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                </div>

            </form>

            <!-- Kembali ke Beranda -->
            <div class="mt-8 text-center border-t border-slate-100 pt-6">
                <a href="{{ url('/') }}" class="text-xs font-semibold text-slate-400 hover:text-slate-600 transition inline-flex items-center gap-1">
                    &larr; Kembali ke Halaman Utama
                </a>
            </div>

        </div>

    </div>

    <!-- SCRIPT INTIP KATA SANDI -->
    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        }
    </script>

</body>
</html>