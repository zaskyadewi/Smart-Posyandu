import React, { useState } from 'react';
import { User, Balita } from '../types';
import { Users, Monitor, ShieldCheck, Megaphone, Calendar, MapPin, MessageCircle, LogOut, ArrowRight, Activity, HeartHandshake } from 'lucide-react';

interface LandingViewProps {
  user: User;
  balitas: Balita[];
  onOpenSearch: () => void;
  onLogout: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  user,
  balitas,
  onOpenSearch,
  onLogout,
}) => {
  const [calendarSaved, setCalendarSaved] = useState(false);

  const handleSaveCalendar = () => {
    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 3000);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/6281234567890?text=Halo%20Kader%20Posyandu,%20saya%20ingin%20bertanya', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4F8FF] font-sans text-slate-800 flex flex-col">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 py-3.5 px-4 sm:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0052CC] flex items-center justify-center text-white font-extrabold text-sm">
              +
            </div>
            <span className="text-xl font-extrabold text-[#0052CC] tracking-tight">
              Smart Posyandu
            </span>
          </div>

          {/* Navigation Links & Logout */}
          <div className="flex items-center space-x-6 text-sm font-bold">
            <a href="#beranda" className="text-[#0052CC] underline underline-offset-4">
              Beranda
            </a>
            <a href="#program" className="text-slate-600 hover:text-slate-900 transition">
              Tentang Program
            </a>
            <a href="#kontak" className="text-slate-600 hover:text-slate-900 transition">
              Kontak
            </a>
            <div className="pl-4 border-l border-slate-200 flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={onLogout}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="beranda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column Text */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Transformasi Digital <br />
                <span className="text-[#0052CC]">Posyandu Mawar</span>
              </h1>
              <p className="text-base text-slate-600 font-normal leading-relaxed max-w-xl">
                Pantau tumbuh kembang anak Anda dengan KMS Digital dan sistem monitoring kesehatan yang terintegrasi, akurat, dan mudah diakses kapan saja.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenSearch}
                  className="bg-[#0052CC] hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  Cek Data Anak
                </button>
                <a
                  href="#program"
                  className="bg-white border-2 border-[#0052CC] text-[#0052CC] hover:bg-blue-50 font-bold px-7 py-3 rounded-full text-sm transition"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>

            {/* Right Column Custom Vector Art Illustration */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg aspect-square bg-gradient-to-tr from-sky-100 via-indigo-50 to-blue-100 rounded-3xl p-6 border border-blue-100 shadow-xl flex flex-col items-center justify-center overflow-hidden">
                {/* SVG Vector Medical Illustration */}
                <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
                  {/* Background Room elements */}
                  <rect x="20" y="20" width="460" height="460" rx="30" fill="#E8F1FE" />
                  <circle cx="250" cy="250" r="180" fill="#D2E4FC" />
                  
                  {/* Doctor Character */}
                  <path d="M300 220 C300 180, 360 180, 360 220 L360 380 L300 380 Z" fill="#3B82F6" />
                  <circle cx="330" cy="160" r="45" fill="#FDBA74" /> {/* Head */}
                  <path d="M290 140 Q330 100 370 140 Q330 120 290 140 Z" fill="#78350F" /> {/* Hair */}
                  <circle cx="318" cy="155" r="8" fill="none" stroke="#1E293B" strokeWidth="3" /> {/* Glasses */}
                  <circle cx="342" cy="155" r="8" fill="none" stroke="#1E293B" strokeWidth="3" />
                  <line x1="326" y1="155" x2="334" y2="155" stroke="#1E293B" strokeWidth="3" />
                  
                  {/* Lab Coat */}
                  <path d="M300 230 L360 230 L370 380 L290 380 Z" fill="#FFFFFF" />
                  <path d="M330 230 L330 380" stroke="#CBD5E1" strokeWidth="3" />

                  {/* Mother & Baby Character */}
                  <path d="M140 240 C140 200, 200 200, 200 240 L200 380 L140 380 Z" fill="#EC4899" />
                  <circle cx="170" cy="180" r="40" fill="#FDBA74" />
                  <path d="M135 170 Q170 120 205 170 Q170 150 135 170 Z" fill="#92400E" />

                  {/* Baby in Blanket */}
                  <path d="M180 270 Q230 250 220 310 Q170 330 180 270 Z" fill="#38BDF8" />
                  <circle cx="210" cy="275" r="18" fill="#FFEDD5" />
                  
                  {/* Stethoscope & Medical Clipboard */}
                  <rect x="235" y="300" width="45" height="60" rx="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="3" />
                  <line x1="245" y1="315" x2="270" y2="315" stroke="#0052CC" strokeWidth="4" />
                  <line x1="245" y1="325" x2="265" y2="325" stroke="#94A3B8" strokeWidth="3" />
                  <line x1="245" y1="335" x2="270" y2="335" stroke="#94A3B8" strokeWidth="3" />

                  {/* Clinic Equipment */}
                  <rect x="40" y="260" width="60" height="100" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                  <circle cx="70" cy="290" r="15" fill="#60A5FA" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3 SUMMARY STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-600 shadow-xs">
              <div className="flex items-center gap-3 text-[#0052CC] mb-2">
                <Users className="w-6 h-6" />
                <h3 className="text-xl font-extrabold text-slate-900">500+ Balita</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Terdaftar & Terpantau aktif setiap bulan
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-600 shadow-xs">
              <div className="flex items-center gap-3 text-[#0052CC] mb-2">
                <Monitor className="w-6 h-6" />
                <h3 className="text-xl font-extrabold text-slate-900">100% Digital</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Bebas khawatir buku KIA hilang atau rusak
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-600 shadow-xs">
              <div className="flex items-center gap-3 text-[#0052CC] mb-2">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="text-xl font-extrabold text-slate-900">Akurasi WHO</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Menggunakan Standar Z-Score Gizi
              </p>
            </div>
          </div>
        </section>

        {/* PAPAN INFORMASI ANNOUNCEMENT BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-[#D2E4FC] rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Pill Header Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0052CC] text-white font-extrabold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider shadow-sm">
              <Megaphone className="w-4 h-4" />
              <span>PAPAN INFORMASI</span>
            </div>

            {/* Announcement Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-blue-100/80 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-[#0052CC] rounded-2xl shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Pelaksanaan Imunisasi & Vitamin A
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-slate-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> 20 Agustus 2026
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Posyandu Mawar Sejahtera (Balai Desa)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed pl-0 sm:pl-16">
                Diharapkan membawa buku KIA (jika ada) dan memastikan si Kecil dalam kondisi sehat. Tersedia juga pembagian obat cacing gratis.
              </p>

              <div className="pt-2 sm:pl-16 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleSaveCalendar}
                  className="bg-white border-2 border-[#0052CC] text-[#0052CC] hover:bg-blue-50 font-bold px-5 py-2 rounded-full text-xs transition cursor-pointer"
                >
                  {calendarSaved ? 'Berhasil Disimpan!' : 'Simpan ke Kalender'}
                </button>
                <button
                  onClick={onOpenSearch}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* LOWER FEATURE SECTION */}
        <section id="program" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Illustration */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg aspect-square bg-gradient-to-br from-indigo-50 to-blue-100 rounded-3xl p-6 border border-blue-100 shadow-xl flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
                  <rect x="20" y="20" width="460" height="460" rx="30" fill="#E2EDFF" />
                  
                  {/* Doctor & Toddler Examination */}
                  <circle cx="340" cy="180" r="40" fill="#FDBA74" />
                  <path d="M300 240 C300 200, 380 200, 380 240 L380 380 L300 380 Z" fill="#2563EB" />
                  
                  {/* Child Sitting on Chair */}
                  <rect x="120" y="280" width="80" height="100" rx="10" fill="#60A5FA" />
                  <circle cx="160" cy="210" r="30" fill="#FFEDD5" />
                  <path d="M140 250 L180 250 L180 320 L140 320 Z" fill="#38BDF8" />
                  
                  {/* Stethoscope */}
                  <path d="M320 220 C250 250, 200 250, 175 235" stroke="#1E293B" strokeWidth="4" fill="none" />
                  <circle cx="175" cy="235" r="8" fill="#94A3B8" />
                </svg>
              </div>
            </div>

            {/* Right Text */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Pelayanan Kesehatan Balita <br />
                yang Lebih <span className="text-[#0052CC]">Modern & Terintegrasi</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Smart Posyandu mendigitalkan seluruh pencatatan kesehatan balita. Dari berat badan, tinggi badan, hingga riwayat imunisasi semuanya terpantau secara real-time, memastikan setiap anak tumbuh optimal.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="kontak" className="bg-[#0B192C] text-white pt-12 pb-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold tracking-tight">Smart Posyandu</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gedung Balai Desa Mawar Sejahtera<br />
              Jl. Mt haryono. No 1, Kota Malang, Jawa Timur, Indonesia
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Tautan Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#beranda" className="hover:text-white transition">Beranda</a></li>
              <li><a href="#program" className="hover:text-white transition">Tentang Program</a></li>
              <li><a href="#kontak" className="hover:text-white transition">Kontak</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Lainnya
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              WhatsApp Layanan
            </h4>
            <button
              onClick={handleWhatsApp}
              className="bg-[#1B7042] hover:bg-[#155934] text-white font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-800" />
              <span>Chat Kader Sekarang</span>
            </button>
            <p className="text-xs font-mono text-slate-400">0812-3456-7890</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 text-center text-xs text-slate-500 font-medium">
          © 2026 Smart Posyandu - Membangun Generasi Sehat Digital
        </div>
      </footer>
    </div>
  );
};
