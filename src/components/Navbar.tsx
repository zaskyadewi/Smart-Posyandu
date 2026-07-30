import React, { useState } from 'react';
import { User } from '../types';
import { Search, LogOut } from 'lucide-react';

interface NavbarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchRole: (role: 'kader' | 'ibu_balita') => void;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onSwitchRole,
  searchTerm = '',
  setSearchTerm,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    if (setSearchTerm) {
      setSearchTerm(e.target.value);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 py-3.5 px-4 sm:px-8 shadow-2xs">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center gap-4">
        {/* Logo - Styled identical to Ibu Balita Page */}
        <div
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-8 h-8 rounded-full bg-[#0052CC] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
            +
          </div>
          <span className="text-xl font-extrabold text-[#0052CC] tracking-tight">
            Smart Posyandu
          </span>
        </div>

        {/* Center Navigation Links for Admin */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-1 transition cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-[#0052CC] underline underline-offset-4'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('balita')}
            className={`py-1 transition cursor-pointer ${
              activeTab === 'balita'
                ? 'text-[#0052CC] underline underline-offset-4'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Data Balita
          </button>

          <button
            onClick={() => setActiveTab('pemeriksaan')}
            className={`py-1 transition cursor-pointer ${
              activeTab === 'pemeriksaan'
                ? 'text-[#0052CC] underline underline-offset-4'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Riwayat
          </button>
        </nav>

        {/* Right Actions: Search, User Name & Keluar (No Profile Photo) */}
        <div className="flex items-center space-x-3">
          <div className="relative hidden lg:block w-48">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari data..."
              value={localSearch}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-100 border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white transition"
            />
          </div>

          <div className="pl-3 border-l border-slate-200 flex items-center gap-2.5">
            <span className="text-xs text-slate-600 font-bold hidden sm:inline">
              {user.name || 'Admin'}
            </span>
            <button
              onClick={() => onSwitchRole(user.role === 'kader' ? 'ibu_balita' : 'kader')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex border-t border-slate-100 mt-2 pt-2 overflow-x-auto gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-[#0052CC] text-white' : 'text-slate-700 bg-slate-100'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('balita')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'balita' ? 'bg-[#0052CC] text-white' : 'text-slate-700 bg-slate-100'
          }`}
        >
          Data Balita
        </button>
        <button
          onClick={() => setActiveTab('pemeriksaan')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'pemeriksaan' ? 'bg-[#0052CC] text-white' : 'text-slate-700 bg-slate-100'
          }`}
        >
          Riwayat
        </button>
      </div>
    </header>
  );
};


