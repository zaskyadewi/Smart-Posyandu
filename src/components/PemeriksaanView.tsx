import React, { useState } from 'react';
import { Balita, Pemeriksaan, User } from '../types';
import { Activity, Plus, Printer, Trash2, Scale, Ruler, FileText, X, Check, ShieldAlert, Sparkles } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            Riwayat Pemeriksaan & Penimbangan Balita
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Catatan rutin hasil penimbangan, pengukuran tinggi, serta analisis status gizi dan risiko stunting.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 self-start md:self-auto">
          <button
            onClick={onNavigateToCetak}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm hover:shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Cetak / Unduh PDF
          </button>

          {user.role === 'kader' && (
            <button
              onClick={handleOpenAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm hover:shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Input Pemeriksaan Baru
            </button>
          )}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 space-y-4">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-700 uppercase text-xs font-bold tracking-wider border-b border-slate-200">
                <th className="p-3.5 w-12 text-center">No</th>
                <th className="p-3.5">Tanggal Periksa</th>
                <th className="p-3.5">Nama Balita</th>
                <th className="p-3.5">Berat Badan</th>
                <th className="p-3.5">Tinggi Badan</th>
                <th className="p-3.5 text-center">Status Gizi (Smart AI)</th>
                <th className="p-3.5">Catatan Medis</th>
                {user.role === 'kader' && <th className="p-3.5 text-center">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pemeriksaans.length > 0 ? (
                pemeriksaans.map((item, idx) => {
                  const dateStr = new Date(item.tanggal_periksa).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 text-center font-semibold text-slate-400">{idx + 1}</td>
                      <td className="p-3.5 font-medium whitespace-nowrap">{dateStr}</td>
                      <td className="p-3.5 font-bold text-blue-700">
                        {item.balita?.nama_balita || 'Data Balita Terhapus'}
                        <span className="block text-xs font-normal text-slate-400">
                          Ibu: {item.balita?.nama_ibu || '-'}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-md text-xs border border-amber-200 inline-flex items-center gap-1">
                          <Scale className="w-3.5 h-3.5" /> {item.berat_badan} kg
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md text-xs border border-emerald-200 inline-flex items-center gap-1">
                          <Ruler className="w-3.5 h-3.5" /> {item.tinggi_badan} cm
                        </span>
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        {item.status_gizi === 'Normal / Sehat' && (
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-extrabold inline-flex items-center gap-1 border border-emerald-300">
                            <Check className="w-3 h-3" /> Normal / Sehat
                          </span>
                        )}
                        {item.status_gizi === 'Berisiko Stunting' && (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-extrabold inline-flex items-center gap-1 border border-red-300 animate-pulse">
                            <ShieldAlert className="w-3 h-3" /> Berisiko Stunting
                          </span>
                        )}
                        {item.status_gizi === 'Gizi Kurang' && (
                          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-extrabold inline-flex items-center gap-1 border border-amber-300">
                            <Activity className="w-3 h-3" /> Gizi Kurang
                          </span>
                        )}
                        {item.status_gizi === 'Berisiko Lebih Gizi / Gemuk' && (
                          <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-extrabold inline-flex items-center gap-1 border border-sky-300">
                            <Sparkles className="w-3 h-3" /> Gemuk / Lebih Gizi
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-500 italic text-xs">{item.catatan || '-'}</td>
                      {user.role === 'kader' && (
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold p-1.5 rounded-lg text-xs transition shadow-xs cursor-pointer"
                            title="Hapus Pemeriksaan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={user.role === 'kader' ? 8 : 7} className="p-8 text-center text-slate-400 italic bg-slate-50/50">
                    Belum ada riwayat pemeriksaan balita yang tersimpan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Examination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Form Penimbangan & Pemeriksaan Medis
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
                  Pilih Balita <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.balita_id}
                  onChange={(e) => setFormData({ ...formData, balita_id: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
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
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    placeholder="Contoh: 10.5"
                    value={formData.berat_badan}
                    onChange={(e) => setFormData({ ...formData, berat_badan: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    placeholder="Contoh: 76.2"
                    value={formData.tinggi_badan}
                    onChange={(e) => setFormData({ ...formData, tinggi_badan: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Tambahan (Imunisasi / PMT)</label>
                <input
                  type="text"
                  placeholder="Misal: Diberi Vitamin A Merah & Biskuit PMT"
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
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
                      <Check className="w-4 h-4" /> Simpan Hasil Penimbangan
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
