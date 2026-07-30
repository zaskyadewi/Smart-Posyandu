import React, { useState } from 'react';
import { DashboardStats, User } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, Edit3, TrendingUp, ChevronRight, Activity, UserCheck } from 'lucide-react';

interface DashboardViewProps {
  stats: DashboardStats | null;
  user: User;
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ stats, user, onNavigate }) => {
  const [chartMetric, setChartMetric] = useState<'berat' | 'tinggi'>('berat');

  if (!stats) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-3 text-slate-500 font-medium">Memuat data statistik Posyandu...</p>
      </div>
    );
  }

  // Format Recharts data
  const chartData = stats.bulanLabels.map((label, idx) => ({
    bulan: label,
    berat: stats.beratData[idx] || 0,
    tinggi: stats.tinggiData[idx] || 0,
  }));

  const total = stats.totalBalita || 512;
  const laki = stats.totalLaki || 248;
  const perempuan = stats.totalPerempuan || 264;
  const pctLaki = ((laki / total) * 100).toFixed(1);
  const pctPerempuan = ((perempuan / total) * 100).toFixed(1);
  const bulanIni = stats.pemeriksaanBulanIni || 184;

  return (
    <div className="space-y-6 font-sans">
      {/* Header Greeting */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0052CC] tracking-tight flex items-center gap-2">
          Halo, {user.name || 'caca'}!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Selamat datang kembali. Mari pantau kesehatan balita di RW 04 hari ini.
        </p>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Balita */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL BALITA</p>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-3xl font-black text-slate-900 tracking-tight">{total}</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> 12%
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 mt-1">Terdaftar aktif di sistem</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#0052CC] text-white flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Stat 2: Laki-laki */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">LAKI-LAKI</p>
              <p className="text-3xl font-black text-slate-900 tracking-tight mt-2">{laki}</p>
              <p className="text-[11px] font-medium text-slate-400 mt-1">{pctLaki}% dari populasi</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 font-bold text-xs uppercase">
              LK
            </div>
          </div>
        </div>

        {/* Stat 3: Perempuan */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PEREMPUAN</p>
              <p className="text-3xl font-black text-slate-900 tracking-tight mt-2">{perempuan}</p>
              <p className="text-[11px] font-medium text-slate-400 mt-1">{pctPerempuan}% dari populasi</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 font-bold text-xs uppercase">
              PR
            </div>
          </div>
        </div>

        {/* Stat 4: Bulan Ini (Green Card) */}
        <div className="bg-[#86EFAC] p-5 rounded-3xl shadow-2xs flex flex-col justify-between relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">BULAN INI</p>
              <p className="text-3xl font-black text-slate-900 tracking-tight mt-2">
                {bulanIni} <span className="text-base font-bold text-slate-700">/ {total}</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-900 text-white flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          {/* Green Progress bar inside card */}
          <div className="w-full bg-emerald-900/20 h-2 rounded-full overflow-hidden mt-4">
            <div
              className="bg-emerald-900 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((bulanIni / total) * 100))}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Growth Chart Section (e-KMS) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#0052CC]" /> Grafik Pertumbuhan Kolektif (e-KMS)
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Rata-rata pertumbuhan balita periode Januari - Juli 2024
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-2xl self-start sm:self-auto gap-1">
            <button
              onClick={() => setChartMetric('berat')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                chartMetric === 'berat'
                  ? 'bg-[#0252CC] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Berat Badan
            </button>
            <button
              onClick={() => setChartMetric('tinggi')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                chartMetric === 'tinggi'
                  ? 'bg-[#0252CC] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tinggi Badan
            </button>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f1f5f9',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              />
              <Line
                type="monotone"
                dataKey={chartMetric}
                stroke="#0052CC"
                strokeWidth={3}
                dot={{ r: 5, fill: '#ffffff', stroke: '#0052CC', strokeWidth: 3 }}
                activeDot={{ r: 7, fill: '#0052CC' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex justify-between items-center pb-2">
          <h3 className="font-extrabold text-slate-900 text-base">Aktivitas Penimbangan Terbaru</h3>
          <button
            onClick={() => onNavigate('pemeriksaan')}
            className="text-xs font-bold text-[#0052CC] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="p-3.5 rounded-l-2xl">TANGGAL</th>
                <th className="p-3.5">NAMA BALITA</th>
                <th className="p-3.5">BERAT (KG)</th>
                <th className="p-3.5">TINGGI (CM)</th>
                <th className="p-3.5">STATUS GIZI</th>
                <th className="p-3.5">CATATAN</th>
                <th className="p-3.5 text-center rounded-r-2xl">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {stats.pemeriksaanTerbaru.length > 0 ? (
                stats.pemeriksaanTerbaru.map((item) => {
                  const dateStr = new Date(item.tanggal_periksa).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  // Generate initial avatar
                  const name = item.balita?.nama_balita || 'Balita';
                  const initials = name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 text-slate-500 whitespace-nowrap">{dateStr}</td>
                      <td className="p-3.5">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <span className="font-bold text-slate-900">{name}</span>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{item.berat_badan}</td>
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{item.tinggi_badan}</td>
                      <td className="p-3.5 whitespace-nowrap">
                        {item.status_gizi === 'Berisiko Stunting' || item.status_gizi === 'Gizi Kurang' ? (
                          <span className="bg-[#FED7AA] text-orange-900 font-bold px-3 py-1 rounded-full text-[11px] inline-block">
                            Pemantauan
                          </span>
                        ) : item.status_gizi === 'Perhatian' ? (
                          <span className="bg-red-100 text-red-900 font-bold px-3 py-1 rounded-full text-[11px] inline-block">
                            Perhatian
                          </span>
                        ) : (
                          <span className="bg-[#86EFAC] text-emerald-950 font-bold px-3 py-1 rounded-full text-[11px] inline-block">
                            Optimal
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-500 italic truncate max-w-xs">
                        {item.catatan || 'Pertumbuhan sangat baik...'}
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        <button
                          onClick={() => onNavigate('pemeriksaan')}
                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                          title="Lihat Detail"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 italic">
                    Belum ada aktivitas penimbangan terbaru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
