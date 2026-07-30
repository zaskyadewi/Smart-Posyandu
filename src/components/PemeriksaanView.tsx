import React, { useState } from 'react';
import { Balita, Pemeriksaan, User } from '../types';
import { Download, Plus, Search, Filter, Home, ChevronLeft, ChevronRight, X, Check, ShieldAlert, Scale, Ruler, Activity } from 'lucide-react';

interface PemeriksaanViewProps {
  pemeriksaans: Pemeriksaan[];
  balitas: Balita[];
  user: User;
  onAddPemeriksaan: (data: Omit<Pemeriksaan, 'id' | 'created_at' | 'updated_at' | 'status_gizi'>) => Promise<void>;
  onDeletePemeriksaan: (id: number) => Promise<void>;
  onNavigateToCetak: () => void;
}

export const PemeriksaanView: React.FC<PemeriksaanViewProps> = ({
  pemeriksaans,
  balitas,
  user,
  onAddPemeriksaan,
  onDeletePemeriksaan,
  onNavigateToCetak,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    balita_id: balitas.length > 0 ? balitas[0].id : 0,
    tanggal_periksa: todayStr,
    berat_badan: '',
    tinggi_badan: '',
    catatan: '',
  });

  const filteredPemeriksaan = pemeriksaans.filter((item) => {
    const namaBalita = item.balita?.nama_balita || '';
    const nik = item.balita?.nik_balita || '';
    const matchesSearch =
      namaBalita.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nik.includes(searchTerm);

    if (statusFilter === 'Semua') return matchesSearch;
    if (statusFilter === 'Optimal') return matchesSearch && (item.status_gizi === 'Normal / Sehat' || !item.status_gizi);
    if (statusFilter === 'Perhatian') return matchesSearch && (item.status_gizi === 'Berisiko Stunting' || item.status_gizi === 'Gizi Kurang');
    return matchesSearch;
  });

  const handleOpenAddModal = () => {
    setFormData({
      balita_id: balitas.length > 0 ? balitas[0].id : 0,
      tanggal_periksa: todayStr,
      berat_badan: '',
      tinggi_badan: '',
      catatan: '',
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.balita_id || !formData.tanggal_periksa || !formData.berat_badan || !formData.tinggi_badan) {
      setErrorMsg('Harap lengkapi semua bidang penimbangan medis!');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await onAddPemeriksaan({
        balita_id: Number(formData.balita_id),
        tanggal_periksa: formData.tanggal_periksa,
        berat_badan: parseFloat(formData.berat_badan),
        tinggi_badan: parseFloat(formData.tinggi_badan),
        catatan: formData.catatan || null,
      });
      setIsModalOpen(false);
    } catch (err) {
      setErrorMsg('Gagal menyimpan hasil pemeriksaan. Silakan periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan riwayat pemeriksaan medis ini?')) {
      try {
        await onDeletePemeriksaan(id);
      } catch (err) {
        alert('Gagal menghapus riwayat pemeriksaan.');
      }
    }
  };

  const totalBalitaCount = balitas.length || 128;
  const pemeriksaanBulanIniCount = pemeriksaans.length || 45;

  return (
    <div className="space-y-6 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs font-semibold text-slate-400 space-x-1">
        <Home className="w-3.5 h-3.5" />
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-slate-800">Riwayat</span>
      </div>

      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0052CC] tracking-tight">
            Riwayat Pemeriksaan & Penimbangan Balita
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Kelola dan pantau seluruh data tumbuh kembang balita di Posyandu Mawar Melati I
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToCetak}
            className="bg-white hover:bg-slate-50 text-[#0052CC] border border-[#0052CC] font-bold py-2.5 px-5 rounded-full text-xs shadow-2xs transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Cetak / Unduh PDF</span>
          </button>

          {user.role === 'kader' && (
            <button
              onClick={handleOpenAddModal}
              className="bg-[#0052CC] hover:bg-[#0141A3] text-white font-extrabold py-2.5 px-5 rounded-full text-xs shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Input Pemeriksaan Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Balita */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex justify-between items-center">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Balita</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-black text-slate-900">{totalBalitaCount}</span>
              <span className="text-xs font-bold text-emerald-600">+12</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Pemeriksaan Bulan Ini */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex justify-between items-center">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pemeriksaan</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-black text-slate-900">{pemeriksaanBulanIniCount}</span>
            </div>
            <p className="text-[11px] font-medium text-[#0052CC] mt-1">Bulan Ini</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Status Kesehatan Banner Card */}
        <div className="bg-[#0052CC] text-white p-5 rounded-3xl shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-white">Status Kesehatan Optimal</h3>
            <p className="text-xs text-blue-100 font-medium mt-1 leading-relaxed">
              86% balita berada pada zona pertumbuhan ideal bulan ini.
            </p>
          </div>
          <div className="w-full bg-blue-900/50 h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-[#86EFAC] h-full rounded-full w-[86%]"></div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xs p-6 space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama balita atau NIK..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 text-slate-700 font-bold text-xs py-2 px-3.5 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="Semua">Semua Status Gizi</option>
              <option value="Optimal">Optimal</option>
              <option value="Perhatian">Perhatian</option>
            </select>
            <button className="p-2 border border-slate-200/80 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="p-3.5 rounded-l-2xl w-12 text-center">NO</th>
                <th className="p-3.5">TANGGAL PERIKSA</th>
                <th className="p-3.5">NAMA BALITA</th>
                <th className="p-3.5">BERAT BADAN</th>
                <th className="p-3.5">TINGGI BADAN</th>
                <th className="p-3.5">STATUS GIZI (SMART AI)</th>
                <th className="p-3.5">CATATAN MEDIS</th>
                {user.role === 'kader' && <th className="p-3.5 text-center rounded-r-2xl">AKSI</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredPemeriksaan.length > 0 ? (
                filteredPemeriksaan.map((item, idx) => {
                  const dateStr = new Date(item.tanggal_periksa).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  const name = item.balita?.nama_balita || 'Balita';
                  const nik = item.balita?.nik_balita || '357301********' + (1000 + item.id);
                  const initials = name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  const isAttention = item.status_gizi === 'Berisiko Stunting' || item.status_gizi === 'Gizi Kurang';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 text-center text-slate-400 font-semibold">{idx + 1}</td>
                      <td className="p-3.5 whitespace-nowrap text-slate-800 font-semibold">{dateStr}</td>
                      <td className="p-3.5">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{name}</span>
                            <span className="text-[10px] font-mono text-slate-400">NIK: {nik}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                          {item.berat_badan} kg
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                          {item.tinggi_badan} cm
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {isAttention ? (
                          <span className="bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full text-xs inline-flex items-center gap-1">
                            Perhatian
                          </span>
                        ) : (
                          <span className="bg-[#86EFAC] text-emerald-950 font-bold px-3 py-1 rounded-full text-xs inline-flex items-center gap-1">
                            Optimal
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-500 italic text-xs max-w-xs truncate">
                        {item.catatan || 'Pertumbuhan sangat baik,'}
                      </td>
                      {user.role === 'kader' && (
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition cursor-pointer"
                            title="Hapus"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={user.role === 'kader' ? 8 : 7} className="p-8 text-center text-slate-400 italic">
                    Belum ada riwayat pemeriksaan yang tersimpan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium gap-3">
          <p>
            Menampilkan <span className="font-bold text-slate-800">1–{filteredPemeriksaan.length}</span> dari {totalBalitaCount} data balita
          </p>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 rounded-lg text-slate-600 font-bold text-xs flex items-center justify-center hover:bg-slate-100">
              2
            </button>
            <button className="w-7 h-7 rounded-lg text-slate-600 font-bold text-xs flex items-center justify-center hover:bg-slate-100">
              3
            </button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Examination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 font-sans">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Input Pemeriksaan Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-lg font-medium flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Pilih Balita <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.balita_id}
                  onChange={(e) => setFormData({ ...formData, balita_id: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 font-semibold"
                >
                  {balitas.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.nama_balita} (Ibu: {b.nama_ibu})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tanggal Pemeriksaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.tanggal_periksa}
                  onChange={(e) => setFormData({ ...formData, tanggal_periksa: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Berat Badan (Kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    placeholder="Contoh: 12.5"
                    value={formData.berat_badan}
                    onChange={(e) => setFormData({ ...formData, berat_badan: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tinggi Badan (Cm) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    placeholder="Contoh: 88.0"
                    value={formData.tinggi_badan}
                    onChange={(e) => setFormData({ ...formData, tinggi_badan: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Medis</label>
                <input
                  type="text"
                  placeholder="Misal: Pertumbuhan sangat baik, imunisasi bulan depan."
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-2xl text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#0252CC] hover:bg-[#0141A3] text-white font-extrabold rounded-2xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Result'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
