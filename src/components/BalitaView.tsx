import React, { useState } from 'react';
import { Balita, User } from '../types';
import { Plus, Search, Edit2, Trash2, Baby, Calendar, User as UserIcon, X, Check, ShieldAlert } from 'lucide-react';

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
      setErrorMsg('Harap isi seluruh bidang wajib yang diberi tanda bintang (*)');
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
      setErrorMsg('Gagal menyimpan data balita. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data balita "${nama}"? Seluruh riwayat pemeriksaan juga akan terhapus.`)) {
      try {
        await onDeleteBalita(id);
      } catch (err) {
        alert('Gagal menghapus data balita.');
      }
    }
  };

  // Helper to calculate age in months/years
  const formatAge = (birthDateStr: string) => {
    const birth = new Date(birthDateStr);
    const now = new Date();
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months--;
    months = Math.max(0, months);

    if (months < 12) {
      return `${months} Bulan`;
    }
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} Thn ${remMonths} Bln` : `${years} Tahun`;
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Baby className="w-6 h-6 text-blue-600" />
            Kelola Data Balita & Ibu
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Daftar seluruh anak balita terdaftar di Posyandu Mawar Sejahtera
          </p>
        </div>

        {user.role === 'kader' && (
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Balita Baru
          </button>
        )}
      </div>

      {/* Main Table Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 space-y-4">
        {/* Search & Stats Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama balita, nama ibu, atau NIK..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
          <p className="text-xs font-semibold text-slate-500 text-right">
            Menampilkan <span className="text-slate-900 font-bold">{filteredBalitas.length}</span> dari {balitas.length} Balita
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-700 uppercase text-xs font-bold tracking-wider border-b border-slate-200">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Nama Balita</th>
                <th className="p-3.5">NIK Balita</th>
                <th className="p-3.5">Umur saat Ini</th>
                <th className="p-3.5">Jenis Kelamin</th>
                <th className="p-3.5">Nama Ibu</th>
                {user.role === 'kader' && <th className="p-3.5 text-center">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBalitas.length > 0 ? (
                filteredBalitas.map((balita, idx) => {
                  const birthFormatted = new Date(balita.tanggal_lahir).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={balita.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 text-center font-semibold text-slate-400">{idx + 1}</td>
                      <td className="p-3.5 font-bold text-blue-700">
                        {balita.nama_balita}
                        <span className="block text-xs font-medium text-slate-400">Tgl Lahir: {birthFormatted}</span>
                      </td>
                      <td className="p-3.5 text-slate-600 font-mono text-xs">{balita.nik_balita || '-'}</td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md text-xs border border-slate-200 flex items-center gap-1 w-fit">
                          <Baby className="w-3.5 h-3.5 text-blue-600" />
                          {formatAge(balita.tanggal_lahir)}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {balita.jenis_kelamin === 'Laki-laki' ? (
                          <span className="bg-sky-100 text-sky-800 font-bold px-2.5 py-1 rounded-md text-xs border border-sky-200">
                            Laki-laki
                          </span>
                        ) : (
                          <span className="bg-pink-100 text-pink-800 font-bold px-2.5 py-1 rounded-md text-xs border border-pink-200">
                            Perempuan
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-medium text-slate-900">{balita.nama_ibu}</td>
                      {user.role === 'kader' && (
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <div className="flex justify-center items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(balita)}
                              className="bg-amber-500 hover:bg-amber-600 text-white font-bold p-1.5 rounded-lg text-xs transition shadow-xs cursor-pointer"
                              title="Edit Data"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(balita.id, balita.nama_balita)}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold p-1.5 rounded-lg text-xs transition shadow-xs cursor-pointer"
                              title="Hapus Data"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={user.role === 'kader' ? 7 : 6} className="p-8 text-center text-slate-400 italic bg-slate-50/50">
                    Tidak ada data balita yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Balita Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Baby className="w-5 h-5 text-blue-600" />
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

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Lengkap Balita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Aris"
                  value={formData.nama_balita}
                  onChange={(e) => setFormData({ ...formData, nama_balita: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
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
                    placeholder="Contoh: Siti Aminah"
                    value={formData.nama_ibu}
                    onChange={(e) => setFormData({ ...formData, nama_ibu: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  {loading ? (
                    'Menyimpan...'
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Simpan Data
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
