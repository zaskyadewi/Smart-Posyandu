import React, { useState } from 'react';
import { Balita } from '../types';
import { Search, ArrowRight, X, Baby } from 'lucide-react';

interface SearchAnakModalProps {
  balitas: Balita[];
  isOpen: boolean;
  onClose: () => void;
  onSelectBalita: (balita: Balita) => void;
}

export const SearchAnakModal: React.FC<SearchAnakModalProps> = ({
  balitas,
  isOpen,
  onClose,
  onSelectBalita,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Age calculation helper
  const formatAge = (birthDateStr: string) => {
    const birth = new Date(birthDateStr);
    const now = new Date();
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months--;
    months = Math.max(0, months);

    if (months < 12) {
      return `${months} bln`;
    }
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} thn ${remMonths} bln` : `${years} thn`;
  };

  const filtered = balitas.filter(
    (b) =>
      b.nama_balita.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.nama_ibu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 cursor-pointer transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Pilih Data Buah Hati
        </h3>

        {/* Rounded Dark Blue Search Bar */}
        <div className="relative mb-8">
          <div className="bg-[#0052CC] rounded-full p-1.5 flex items-center shadow-md">
            <Search className="w-5 h-5 text-white ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Cari nama buah hati Ibu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-0 font-medium"
              autoFocus
            />
          </div>
        </div>

        {/* Children List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 divide-y divide-slate-100">
          {filtered.length > 0 ? (
            filtered.map((b) => (
              <div
                key={b.id}
                className="pt-4 first:pt-0 flex items-center justify-between group hover:bg-slate-50/80 p-3 rounded-2xl transition"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition">
                    {b.nama_balita}
                  </h4>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">
                    {formatAge(b.tanggal_lahir)}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectBalita(b);
                    onClose();
                  }}
                  className="bg-[#0052CC] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Lihat Data</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm">
              Tidak ditemukan balita dengan kata kunci tersebut.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
