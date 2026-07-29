import React from 'react';
import { DashboardStats, User } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Baby, Scale, ArrowRight, Activity, CalendarCheck, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  stats: DashboardStats | null;
  user: User;
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ stats, user, onNavigate }) => {
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

  const todayFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border-l-4 border-blue-600 border-slate-200/80 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-slate-900">
              Selamat Datang, {user.name}!
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
              {user.role === 'kader' ? 'Akses Kader' : 'Akses Wali'}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Berikut adalah ringkasan data pertumbuhan dan kesehatan balita di Posyandu Mawar Sejahtera.
          </p>
        </div>
        <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-right self-start md:self-auto">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tanggal Hari Ini</p>
          <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
            <CalendarCheck className="w-4 h-4 text-blue-600" />
            {todayFormatted}
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between hover:border-blue-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Balita</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {stats.totalBalita} <span className="text-sm font-normal text-slate-500">Anak</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold shadow-xs">
            <Baby className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between hover:border-blue-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Laki-laki</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-1">
              {stats.totalLaki} <span className="text-sm font-normal text-slate-500">Anak</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold shadow-xs">
            <Baby className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between hover:border-pink-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Perempuan</p>
            <p className="text-3xl font-extrabold text-pink-600 mt-1">
              {stats.totalPerempuan} <span className="text-sm font-normal text-slate-500">Anak</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center font-bold shadow-xs">
            <Baby className="w-6 h-6 text-pink-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between hover:border-emerald-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Diperiksa Bulan Ini</p>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">
              {stats.pemeriksaanBulanIni} <span className="text-sm font-normal text-slate-500">Kali</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold shadow-xs">
            <Scale className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* KMS Digital Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Grafik KMS Digital - Rata-rata Pertumbuhan Balita
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tren perkembangan rata-rata berat badan (kg) dan tinggi badan (cm) balita selama 6 bulan terakhir.
            </p>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Standar KMS Indonesia
          </span>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 'auto']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '13px', fontWeight: 600 }} />
              <Line
                type="monotone"
                dataKey="berat"
                name="Rata-rata Berat Badan (kg)"
                stroke="#d97706"
                strokeWidth={3}
                dot={{ r: 5, fill: '#d97706' }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="tinggi"
                name="Rata-rata Tinggi Badan (cm)"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5, fill: '#10b981' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Examinations Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Aktivitas Penimbangan Terbaru</h3>
            <p className="text-xs text-slate-500">5 riwayat penimbangan medis balita paling baru</p>
          </div>
          <button
            onClick={() => onNavigate('pemeriksaan')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Lihat Semua Riwayat <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-bold tracking-wider">
                <th className="p-3.5 rounded-l-lg">Tanggal</th>
                <th className="p-3.5">Nama Balita</th>
                <th className="p-3.5">Berat</th>
                <th className="p-3.5">Tinggi</th>
                <th className="p-3.5">Status Gizi (Smart AI)</th>
                <th className="p-3.5 rounded-r-lg">Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {stats.pemeriksaanTerbaru.length > 0 ? (
                stats.pemeriksaanTerbaru.map((item) => {
                  const dateStr = new Date(item.tanggal_periksa).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-medium whitespace-nowrap">{dateStr}</td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {item.balita?.nama_balita || 'Data Balita Terhapus'}
                        {item.balita?.nama_ibu && (
                          <span className="block text-xs font-normal text-slate-400">
                            Ibu: {item.balita.nama_ibu}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-md text-xs border border-amber-200">
                          {item.berat_badan} kg
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md text-xs border border-emerald-200">
                          {item.tinggi_badan} cm
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {item.status_gizi === 'Normal / Sehat' && (
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-extrabold inline-block border border-emerald-300">
                            🟢 Normal / Sehat
                          </span>
                        )}
                        {item.status_gizi === 'Berisiko Stunting' && (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-extrabold inline-block border border-red-300 animate-pulse">
                            🔴 Berisiko Stunting
                          </span>
                        )}
                        {item.status_gizi === 'Gizi Kurang' && (
                          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-extrabold inline-block border border-amber-300">
                            🟡 Gizi Kurang
                          </span>
                        )}
                        {item.status_gizi === 'Berisiko Lebih Gizi / Gemuk' && (
                          <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-extrabold inline-block border border-sky-300">
                            🔵 Gemuk / Lebih Gizi
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-500 italic text-xs">
                        {item.catatan || '-'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 italic">
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
