import React from 'react';
import { User } from '../types';
import { LayoutDashboard, Baby, Activity, Printer, UserCheck, Shield, ChevronRight } from 'lucide-react';

interface NavbarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchRole: (role: 'kader' | 'ibu_balita') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onSwitchRole,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Baby className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                Smart-Posyandu
              </span>
              <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                Digital Growth & Health Monitor
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('balita')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'balita'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>Data Balita</span>
            </button>

            <button
              onClick={() => setActiveTab('pemeriksaan')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'pemeriksaan'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Riwayat Pemeriksaan</span>
            </button>

            <button
              onClick={() => setActiveTab('cetak')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'cetak'
                  ? 'bg-indigo-50 text-indigo-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Laporan</span>
            </button>
          </nav>

          {/* User Profile Badge */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">{user.name}</p>
              <span
                className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  user.role === 'kader'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {user.role === 'kader' ? (
                  <>
                    <Shield className="w-3 h-3 mr-1" /> Kader Posyandu
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3 h-3 mr-1" /> Ibu Balita
                  </>
                )}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav sub-bar */}
      <div className="md:hidden flex border-t border-slate-100 overflow-x-auto px-2 py-1.5 bg-slate-50 gap-1 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button
          onClick={() => setActiveTab('balita')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'balita' ? 'bg-blue-600 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          <Baby className="w-3.5 h-3.5" /> Data Balita
        </button>
        <button
          onClick={() => setActiveTab('pemeriksaan')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'pemeriksaan' ? 'bg-blue-600 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Pemeriksaan
        </button>
        <button
          onClick={() => setActiveTab('cetak')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeTab === 'cetak' ? 'bg-indigo-600 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          <Printer className="w-3.5 h-3.5" /> Cetak
        </button>
      </div>
    </header>
  );
};
