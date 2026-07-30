import React from 'react';
import { User } from '../types';
import { LayoutGrid, Baby, Activity, BarChart2, Plus, Smile } from 'lucide-react';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddNew: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onAddNew,
}) => {
  return (
    <aside className="w-full lg:w-64 bg-white/80 border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0 font-sans min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* User Card Header */}
        <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-[#86EFAC] flex items-center justify-center text-emerald-900 shrink-0 shadow-2xs">
            <Smile className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="overflow-hidden">
            <h3 className="font-extrabold text-sm text-slate-900 truncate">
              {user.name || 'Admin Posyandu'}
            </h3>
            <p className="text-[11px] font-medium text-slate-500 truncate">Mawar Melati I</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center space-x-3 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#86EFAC] text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4 stroke-[2.5]" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('balita')}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center space-x-3 cursor-pointer ${
              activeTab === 'balita'
                ? 'bg-[#86EFAC] text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
            }`}
          >
            <Baby className="w-4 h-4 stroke-[2.5]" />
            <span>Data Balita</span>
          </button>

          <button
            onClick={() => setActiveTab('pemeriksaan')}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center space-x-3 cursor-pointer ${
              activeTab === 'pemeriksaan'
                ? 'bg-[#86EFAC] text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 stroke-[2.5]" />
            <span>Riwayat</span>
          </button>

          <button
            onClick={() => setActiveTab('cetak')}
            className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center space-x-3 cursor-pointer ${
              activeTab === 'cetak'
                ? 'bg-[#86EFAC] text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-4 h-4 stroke-[2.5]" />
            <span>Laporan</span>
          </button>
        </nav>
      </div>

      {/* Bottom Action Button */}
      <div className="pt-6">
        <button
          onClick={onAddNew}
          className="w-full py-3.5 px-4 bg-[#0052CC] hover:bg-[#0141A3] text-white font-extrabold rounded-2xl text-xs shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Data Baru</span>
        </button>
      </div>
    </aside>
  );
};
