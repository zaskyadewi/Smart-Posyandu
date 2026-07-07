<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Daftar Akun Baru — Smart-Posyandu</title>
    
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
    <div class="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-200/80 my-8">
        
        <!-- KOLOM KIRI: BRANDING & VISUAL (5 Kolom) -->
        <div class="md:col-span-5 bg-gradient-to-b from-blue-700 via-blue-800 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            
            <!-- Elemen Dekorasi Latar Belakang -->
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
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wide mb-4">
                    <span>Komunitas Kader Sehat</span>
                </div>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-4">
                    Bergabung Bersama Melayani Desa.
                </h1>
                <p class="text-blue-100 text-sm leading-relaxed font-normal">
                    Daftarkan diri Anda untuk mulai memantau tumbuh kembang balita, mencatat pemeriksaan bulanan, dan mewujudkan generasi bebas stunting.
                </p>
            </div>

            <!-- Bagian Bawah: Keamanan Data -->
            <div class="relative z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-blue-500/40 flex items-center justify-center text-white shrink-0">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div class="text-xs leading-tight">
                        <span class="font-bold block text-white">Privasi & Keamanan Terjamin</span>
                        <span class="text-blue-200">Data terenkripsi standar medis desa</span>
                    </div>
                </div>
            </div>

        </div>

        <!-- KOLOM KANAN: FORMULIR REGISTER (7 Kolom) -->
        <div class="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            
            <!-- Navigasi Tab (Masuk / Daftar) -->
            <div class="bg-slate-100 p-1 rounded-xl inline-flex mb-8 self-start border border-slate-200/60">
                <a href="{{ route('login') }}" class="text-slate-600 hover:text-slate-900 font-semibold px-6 py-2 rounded-lg text-sm transition">
                    Masuk
                </a>
                <a href="{{ route('register') }}" class="bg-white text-blue-600 font-bold shadow-sm px-6 py-2 rounded-lg text-sm transition">
                    Daftar
                </a>
            </div>

            <!-- Judul Formulir -->
            <div class="mb-6">
                <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Buat Akun Baru</h2>
                <p class="text-sm text-slate-500 mt-1">Lengkapi data diri di bawah ini untuk mendaftarkan akun Anda.</p>
            </div>

            <!-- PESAN ERROR DARI LARAVEL -->
            @if ($errors->any())
                <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <p class="font-bold mb-1">Gagal Mendaftar:</p>
                    <ul class="list-disc list-inside text-xs space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- FORMULIR UTAMA -->
            <form method="POST" action="{{ route('register') }}" class="space-y-4">
                @csrf

                <!-- Kolom Nama Lengkap -->
                <div>
                    <label for="name" class="block text-sm font-bold text-slate-700 mb-1.5">Nama Lengkap</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus placeholder="contoh: Sarwendah, S.Tr.Keb" 
                            class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition">
                    </div>
                </div>

                <!-- Kolom Email -->
                <div>
                    <label for="email" class="block text-sm font-bold text-slate-700 mb-1.5">Alamat Email</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                        </div>
                        <input id="email" type="email" name="email" value="{{ old('email') }}" required placeholder="contoh: kader@email.com" 
                            class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition">
                    </div>
                </div>

                <!-- Grid 2 Kolom untuk Sandi & Konfirmasi -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <!-- Kolom Kata Sandi -->
                    <div>
                        <label for="password" class="block text-sm font-bold text-slate-700 mb-1.5">Kata Sandi</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <input id="password" type="password" name="password" required placeholder="Min. 8 karakter" 
                                class="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition">
                            
                            <!-- Tombol Intip Sandi -->
                            <button type="button" onclick="togglePassword('password')" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none" title="Lihat Kata Sandi">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Kolom Konfirmasi Kata Sandi -->
                    <div>
                        <label for="password_confirmation" class="block text-sm font-bold text-slate-700 mb-1.5">Ulangi Sandi</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <input id="password_confirmation" type="password" name="password_confirmation" required placeholder="Ketik ulang" 
                                class="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition">
                            
                            <!-- Tombol Intip Sandi 2 -->
                            <button type="button" onclick="togglePassword('password_confirmation')" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none" title="Lihat Kata Sandi">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                        </div>
                    </div>

                </div>

                <!-- Info Singkat Aturan Sandi -->
                <p class="text-xs text-slate-400 italic pt-1">
                    *Gunakan minimal 8 karakter agar akun Posyandu Anda aman.
                </p>

                <!-- Tombol Daftar -->
                <div class="pt-3">
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/25 text-base flex items-center justify-center gap-2 transition duration-200">
                        <span>Daftar Sekarang</span>
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

    <!-- SCRIPT INTIP KATA SANDI (BISA UNTUK KEDUA KOLOM) -->
    <script>
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        }
    </script>

</body>
</html>