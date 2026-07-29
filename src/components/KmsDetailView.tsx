import React from 'react';
import { Balita, Pemeriksaan } from '../types';
import { ArrowLeft, CheckCircle2, Scale, ArrowUpRight, Smile, Bot, MessageCircle, Syringe, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface KmsDetailViewProps {
  balita: Balita;
  pemeriksaans: Pemeriksaan[];
  onBack: () => void;
}

export const KmsDetailView: React.FC<KmsDetailViewProps> = ({ balita, pemeriksaans, onBack }) => {
  // Filter examination for this specific child
  const childRecords = pemeriksaans
    .filter((p) => p.balita_id === balita.id)
    .sort((a, b) => new Date(a.tanggal_periksa).getTime() - new Date(b.tanggal_periksa).getTime());

  const latestRecord = childRecords[childRecords.length - 1] || {
    berat_badan: 12.5,
    tinggi_badan: 88.0,
    catatan: 'Hebat Bunda! Grafik bulan ini naik sangat baik dan berada di zona hijau (Optimal). Teruskan pola asuh dan nutrisi yang diberikan. Jangan lupa jadwal imunisasi bulan depan!',
  };

  // Age formatting
  const formatAge = (birthDateStr: string) => {
    const birth = new Date(birthDateStr);
    const now = new Date();
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months--;
    months = Math.max(0, months);

    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    if (years === 0) return `${months} Bulan`;
    return remMonths > 0 ? `${years} Tahun ${remMonths} Bulan` : `${years} Tahun`;
  };

  // Birthdate string formatting
  const birthFormatted = new Date(balita.tanggal_lahir).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Chart data preparation
  const chartData = childRecords.length > 0
    ? childRecords.map((r) => {
        const d = new Date(r.tanggal_periksa);
        return {
          bulan: d.toLocaleDateString('id-ID', { month: 'short' }),
          berat: r.berat_badan,
          tinggi: r.tinggi_badan,
        };
      })
    : [
        { bulan: 'Mei', berat: 11.8 },
        { bulan: 'Jun', berat: 12.1 },
        { bulan: 'Jul', berat: 12.5 },
      ];

  const handleWhatsApp = () => {
    window.open(`https://wa.me/6281234567890?text=Halo%20Kader%20Posyandu,%20saya%20ibu%20dari%20${encodeURIComponent(balita.nama_balita)}%20ingin%20konsultasi`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F0F5FD] pb-16 font-sans">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
              +
            </div>
            <span className="text-lg font-extrabold text-blue-700 tracking-tight">
              Smart Posyandu
            </span>
          </div>

          <div className="flex items-center space-x-6 text-sm font-semibold text-slate-600">
            <button onClick={onBack} className="text-blue-600 hover:underline">
              Beranda
            </button>
            <span className="text-slate-400">Tentang Program</span>
            <span className="text-slate-400">Kontak</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Child Title Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition cursor-pointer shadow-2xs"
                title="Kembali"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0052CC] tracking-tight">
                {balita.nama_balita}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-medium text-slate-600 mt-2 ml-10">
              <span>{formatAge(balita.tanggal_lahir)} (Lahir: {birthFormatted})</span>
              <span>•</span>
              <span>NIK: {balita.nik_balita ? `********${balita.nik_balita.slice(-4)}` : '*********1234'}</span>
              <span>•</span>
              <span>Posyandu Mawar Sejahtera</span>
            </div>
          </div>

          <div className="bg-[#1B7042] text-white font-bold px-4 py-2 rounded-full text-xs sm:text-sm flex items-center gap-2 shadow-sm self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Pertumbuhan Optimal</span>
          </div>
        </div>

        {/* 3 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Berat Badan */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Berat Badan
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-[#0052CC]">
                    {latestRecord.berat_badan}
                  </span>
                  <span className="text-sm font-bold text-slate-600">kg</span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> Naik 0.4kg
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <Scale className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Tinggi Badan */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tinggi Badan
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-[#0052CC]">
                    {latestRecord.tinggi_badan}
                  </span>
                  <span className="text-sm font-bold text-slate-600">cm</span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +1.5cm
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Lingkar Kepala */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Lingkar Kepala
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-[#0052CC]">
                    48
                  </span>
                  <span className="text-sm font-bold text-slate-600">cm</span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ideal
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <Smile className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Growth Chart & Immunization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Grafik Pertumbuhan (e-KMS)
                </h3>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Optimal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Perhatian
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Konsultasi
                  </span>
                </div>
              </div>

              {/* Curve Chart Container */}
              <div className="h-64 w-full bg-gradient-to-b from-blue-50/40 via-emerald-50/30 to-amber-50/20 rounded-2xl p-2 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorBerat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0052CC" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0052CC" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="berat"
                      stroke="#0052CC"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorBerat)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Catatan & Saran Kesehatan Box */}
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-3xl p-5 flex items-start gap-4">
              <div className="p-3 bg-[#0052CC] rounded-2xl text-white shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                  Catatan & Saran Kesehatan
                </h4>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {latestRecord.catatan ||
                    'Hebat Bunda! Grafik Budi bulan ini naik sangat baik dan berada di zona hijau (Optimal). Teruskan pola asuh dan nutrisi yang diberikan. Jangan lupa jadwal imunisasi bulan depan!'}
                </p>
              </div>
            </div>
          </div>

          {/* Immunization History Column */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Syringe className="w-5 h-5 text-blue-600" />
                Riwayat Imunisasi
              </h3>

              <div className="space-y-4">
                {/* Upcoming */}
                <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl">
                  <p className="text-xs font-bold text-blue-900">Jadwal Selanjutnya</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-1">Vit A & Obat Cacing</p>
                  <p className="text-xs font-medium text-slate-600 mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" /> Agustus 2026
                  </p>
                </div>

                {/* History list */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Campak/MR, Vit A</p>
                      <p className="text-xs text-slate-500">9 Bulan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Hepatitis B, BCG, Polio</p>
                      <p className="text-xs text-slate-500">0 Bulan (Lahir)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Consultation Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1B7042] hover:bg-[#155934] text-white font-extrabold rounded-2xl text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-700" />
            <span>Hubungi Kader Posyandu untuk Konsultasi</span>
          </button>
        </div>
      </main>
    </div>
  );
};
