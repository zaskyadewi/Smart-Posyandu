import React, { useState } from 'react';
import { User } from '../types';
import { Search, Bell, Settings, Shield, UserCheck } from 'lucide-react';

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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-2 cursor-pointer shrink-0"
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="text-xl font-black text-blue-900 tracking-tight flex items-center gap-1.5">
              Smart-Posyandu
            </span>
          </div>

          {/* Navigation Links - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`text-sm font-bold transition-all py-1.5 cursor-pointer relative ${
                activeTab === 'dashboard'
                  ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('balita')}
              className={`text-sm font-bold transition-all py-1.5 cursor-pointer relative ${
                activeTab === 'balita'
                  ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Data Balita
            </button>

            <button
              onClick={() => setActiveTab('pemeriksaan')}
              className={`text-sm font-bold transition-all py-1.5 cursor-pointer relative ${
                activeTab === 'pemeriksaan'
                  ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Riwayat
            </button>
          </nav>

          {/* Right Header Elements */}
          <div className="flex items-center space-x-3">
            {/* Search input bar */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari data..."
                value={localSearch}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-100 border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>

            {/* Notification Icon */}
            <button
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition relative cursor-pointer"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Settings Gear Icon */}
            <button
              onClick={() => onSwitchRole(user.role === 'kader' ? 'ibu_balita' : 'kader')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition cursor-pointer"
              title={`Ganti Peran (Sekarang: ${user.role === 'kader' ? 'Admin/Kader' : 'Ibu Balita'})`}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center space-x-2 pl-1">
              <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-sm shadow-xs overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt={user.name || 'Admin'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initial if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="text-xs uppercase">{user.name ? user.name.charAt(0) : 'A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav sub-bar */}
      <div className="md:hidden flex border-t border-slate-100 overflow-x-auto px-3 py-2 bg-slate-50 gap-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('balita')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'balita' ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          Data Balita
        </button>
        <button
          onClick={() => setActiveTab('pemeriksaan')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeTab === 'pemeriksaan' ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          Riwayat
        </button>
      </div>
    </header>
  );
};

