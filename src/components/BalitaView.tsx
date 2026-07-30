import React, { useState } from 'react';
import { Balita, User } from '../types';
import { Plus, Search, Edit2, Trash2, Filter, Download, X, Check, ShieldAlert, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

interface BalitaViewProps {
  balitas: Balita[];
  user: User;
  onAddBalita: (data: Omit<Balita, 'id'>) => Promise<void>;
  onUpdateBalita: (id: number, data: Partial<Balita>) => Promise<void>;
  onDeleteBalita: (id: number) => Promise<void>;
}

export const BalitaView: React.FC<BalitaViewProps> = ({
  balitas,
  user,
  onAddBalita,
  onUpdateBalita,
  onDeleteBalita,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBalita, setEditingBalita] = useState<Balita | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nama_balita: '',
    nik_balita: '',
    tanggal_lahir: '',
    jenis_kelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    nama_ibu: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const filteredBalitas = balitas.filter(
    (b) =>
      b.nama_balita.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.nama_ibu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.nik_balita && b.nik_balita.includes(searchTerm))
  );

  const handleOpenAddModal = () => {
    setEditingBalita(null);
    setFormData({
      nama_balita: '',
      nik_balita: '',
      tanggal_lahir: '',
      jenis_kelamin: 'Laki-laki',
      nama_ibu: '',
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (balita: Balita) => {
    setEditingBalita(balita);
    setFormData({
      nama_balita: balita.nama_balita,
      nik_balita: balita.nik_balita || '',
      tanggal_lahir: balita.tanggal_lahir,
      jenis_kelamin: balita.jenis_kelamin,
      nama_ibu: balita.nama_ibu,
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_balita || !formData.tanggal_lahir || !formData.nama_ibu) {
      setErrorMsg('Harap isi seluruh bidang wajib!');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      if (editingBalita) {
        await onUpdateBalita(editingBalita.id, formData);
      } else {
        await onAddBalita(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      setErrorMsg('Gagal menyimpan data balita.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data balita "${nama}"?`)) {
      try {
        await onDeleteBalita(id);
      } catch (err) {
        alert('Gagal menghapus data balita.');
      }
    }
  };

  // Age calculation helper
  const formatAge = (birthDateStr: string) => {
    const birth = new Date(birthDateStr);
    const now = new Date();
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months--;
    months = Math.max(0, months);

    if (months < 12) {
      return `${months} Bln`;
    }
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} Thn ${remMonths} Bln` : `${years} Thn`;
  };

  const totalBalitaCount = balitas.length || 124;

  return (
    <div className="space-y-6 font-sans">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight">
            Kelola Data Balita & Ibu
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manajemen database terpusat untuk pemantauan tumbuh kembang anak.
          </p>
        </div>

        {user.role === 'kader' && (
          <button
            onClick={handleOpenAddModal}
            className="bg-[#0252CC] hover:bg-[#0141A3] text-white font-extrabold py-2.5 px-5 rounded-full text-xs shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tambah Balita Baru</span>
          </button>
        )}
      </div>

      {/* Table Card Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xs p-6 space-y-4">
        {/* Search & Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama balita atau ibu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="p-3.5 rounded-l-2xl w-12 text-center">NO</th>
                <th className="p-3.5">NAMA BALITA</th>
                <th className="p-3.5">NIK</th>
                <th className="p-3.5">UMUR</th>
                <th className="p-3.5">L/P</th>
                <th className="p-3.5">NAMA IBU</th>
                {user.role === 'kader' && <th className="p-3.5 text-center rounded-r-2xl">AKSI</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredBalitas.length > 0 ? (
                filteredBalitas.map((balita, idx) => {
                  const birthFormatted = new Date(balita.tanggal_lahir).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  });

                  const isFemale = balita.jenis_kelamin === 'Perempuan';

                  return (
                    <tr key={balita.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 text-center text-slate-400 font-semibold">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{balita.nama_balita}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{birthFormatted}</span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">
                        {balita.nik_balita || '357801********000' + (idx + 1)}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                          {formatAge(balita.tanggal_lahir)}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {isFemale ? (
                          <span className="w-6 h-6 rounded-full bg-[#86EFAC] text-emerald-950 font-bold text-xs flex items-center justify-center">
                            P
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                            L
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-bold text-slate-800">{balita.nama_ibu}</td>
                      {user.role === 'kader' && (
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <div className="flex justify-center items-center space-x-2">
                            <button
                              onClick={() => handleOpenEditModal(balita)}
                              className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(balita.id, balita.nama_balita)}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={user.role === 'kader' ? 7 : 6} className="p-8 text-center text-slate-400 italic">
                    Tidak ada data balita.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium gap-3">
          <p>
            Menampilkan <span className="font-bold text-slate-800">1–{filteredBalitas.length}</span> dari {totalBalitaCount} data
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

      {/* Bottom Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Balita Terdaftar Card */}
        <div className="bg-[#0052CC] text-white p-6 rounded-3xl shadow-md flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Total Balita Terdaftar</p>
            <p className="text-4xl font-black text-white mt-2">{totalBalitaCount}</p>
          </div>
          <p className="text-xs text-emerald-300 font-bold mt-4 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +5 Bulan ini
          </p>
        </div>

        {/* Kualitas Data Card */}
        <div className="bg-blue-50/70 p-6 rounded-3xl border border-blue-100 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Kualitas Data</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Kelengkapan rekam medis balita periode Juli 2026.
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#0052CC] text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Persentase Terverifikasi</span>
              <span className="text-blue-700">92%</span>
            </div>
            <div className="w-full bg-blue-200/60 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-[92%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Balita Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingBalita ? 'Edit Data Balita' : 'Tambah Data Balita Baru'}
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
                  Nama Lengkap Balita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Cantika Kirana"
                  value={formData.nama_balita}
                  onChange={(e) => setFormData({ ...formData, nama_balita: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIK Balita (Opsional)</label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="16 Digit NIK"
                    value={formData.nik_balita}
                    onChange={(e) => setFormData({ ...formData, nik_balita: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal_lahir}
                    onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.jenis_kelamin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jenis_kelamin: e.target.value as 'Laki-laki' | 'Perempuan',
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nama Ibu / Wali <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dewi Lestari"
                    value={formData.nama_ibu}
                    onChange={(e) => setFormData({ ...formData, nama_ibu: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
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
                  {loading ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
