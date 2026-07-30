import React, { useState, useEffect } from 'react';
import { User, Balita, Pemeriksaan, DashboardStats } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { BalitaView } from './components/BalitaView';
import { PemeriksaanView } from './components/PemeriksaanView';
import { CetakView } from './components/CetakView';
import { LoginView } from './components/LoginView';
import { LandingView } from './components/LandingView';
import { SearchAnakModal } from './components/SearchAnakModal';
import { KmsDetailView } from './components/KmsDetailView';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    role: 'ibu_balita',
  });

  // Navigation mode: 'login' | 'dashboard' | 'landing' | 'kms_detail'
  const [screenMode, setScreenMode] = useState<'login' | 'dashboard' | 'landing' | 'kms_detail'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBalita, setSelectedBalita] = useState<Balita | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [balitaList, setBalitaList] = useState<Balita[]>([]);
  const [pemeriksaanList, setPemeriksaanList] = useState<Pemeriksaan[]>([]);
  const [loading, setLoading] = useState(false);

  // Toast alert state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resStats, resBalita, resPemeriksaan] = await Promise.all([
        fetch('/api/dashboard'),
        fetch('/api/balita'),
        fetch('/api/pemeriksaan'),
      ]);

      if (resStats.ok) setStats(await resStats.json());
      if (resBalita.ok) setBalitaList(await resBalita.json());
      if (resPemeriksaan.ok) setPemeriksaanList(await resPemeriksaan.json());
    } catch (err) {
      console.error('Failed to load Posyandu data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle successful login
  const handleLoginSuccess = (loggedInUser: User, redirectTarget: string) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);

    if (redirectTarget === 'dashboard' || loggedInUser.role === 'kader') {
      setScreenMode('dashboard');
      setActiveTab('dashboard');
      showToast(`Selamat datang ${loggedInUser.name} di Dashboard Admin Posyandu!`);
    } else {
      setScreenMode('landing');
      showToast(`Selamat datang Ibu ${loggedInUser.name}!`);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
    setUser({ id: 0, name: '', email: '', role: 'ibu_balita' });
    setScreenMode('login');
    setSelectedBalita(null);
    setIsSearchOpen(false);
    showToast('Anda telah keluar dari aplikasi.');
  };

  // Switch role helper
  const handleSwitchRole = async (newRole: 'kader' | 'ibu_balita') => {
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        if (newRole === 'kader') {
          setScreenMode('dashboard');
          setActiveTab('dashboard');
        } else {
          setScreenMode('landing');
        }
        showToast(
          `Mode akses diubah ke ${newRole === 'kader' ? 'Admin / Kader Posyandu' : 'Ibu Balita'}`
        );
      }
    } catch (err) {
      showToast('Gagal mengubah mode akses', 'error');
    }
  };

  // Balita Operations
  const handleAddBalita = async (data: Omit<Balita, 'id'>) => {
    const res = await fetch('/api/balita', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Gagal menyimpan data');

    showToast('Data balita berhasil ditambahkan!');
    await fetchData();
  };

  const handleUpdateBalita = async (id: number, data: Partial<Balita>) => {
    const res = await fetch(`/api/balita/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Gagal memperbarui data');

    showToast('Data balita berhasil diperbarui!');
    await fetchData();
  };

  const handleDeleteBalita = async (id: number) => {
    const res = await fetch(`/api/balita/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Gagal menghapus data');

    showToast('Data balita berhasil dihapus!');
    await fetchData();
  };

  // Pemeriksaan Operations
  const handleAddPemeriksaan = async (
    data: Omit<Pemeriksaan, 'id' | 'created_at' | 'updated_at' | 'status_gizi'>
  ) => {
    const res = await fetch('/api/pemeriksaan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Gagal menyimpan pemeriksaan');

    showToast('Data pemeriksaan medis berhasil disimpan!');
    await fetchData();
  };

  const handleDeletePemeriksaan = async (id: number) => {
    const res = await fetch(`/api/pemeriksaan/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Gagal menghapus pemeriksaan');

    showToast('Riwayat pemeriksaan berhasil dihapus!');
    await fetchData();
  };

  // 1. GERBANG WAJIB LOGIN
  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. SCREEN 4: KMS GROWTH DETAIL VIEW FOR IBU BALITA
  if (screenMode === 'kms_detail' && selectedBalita) {
    return (
      <KmsDetailView
        balita={selectedBalita}
        pemeriksaans={pemeriksaanList}
        onBack={() => setScreenMode('landing')}
      />
    );
  }

  // 3. SCREEN 2: LANDING PAGE FOR IBU BALITA (JALUR B)
  if (screenMode === 'landing') {
    return (
      <>
        <LandingView
          user={user}
          balitas={balitaList}
          onOpenSearch={() => setIsSearchOpen(true)}
          onLogout={handleLogout}
        />

        {/* Search Modal */}
        <SearchAnakModal
          balitas={balitaList}
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectBalita={(balita) => {
            setSelectedBalita(balita);
            setScreenMode('kms_detail');
          }}
        />
      </>
    );
  }

  // 4. SCREEN 5: DASHBOARD ADMIN FOR KADER (JALUR A)
  if (activeTab === 'cetak') {
    return (
      <CetakView
        pemeriksaans={pemeriksaanList}
        onBack={() => setActiveTab('pemeriksaan')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-slate-800 flex flex-col font-sans">
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSwitchRole={handleSwitchRole}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold text-white border ${
              toast.type === 'success'
                ? 'bg-emerald-600 border-emerald-500'
                : 'bg-red-600 border-red-500'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Layout with Left Sidebar + Content */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row">
        <Sidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onAddNew={() => {
            if (activeTab === 'dashboard') setActiveTab('balita');
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {activeTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              user={user}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'balita' && (
            <BalitaView
              balitas={balitaList}
              user={user}
              onAddBalita={handleAddBalita}
              onUpdateBalita={handleUpdateBalita}
              onDeleteBalita={handleDeleteBalita}
            />
          )}

          {activeTab === 'pemeriksaan' && (
            <PemeriksaanView
              pemeriksaans={pemeriksaanList}
              balitas={balitaList}
              user={user}
              onAddPemeriksaan={handleAddPemeriksaan}
              onDeletePemeriksaan={handleDeletePemeriksaan}
              onNavigateToCetak={() => setActiveTab('cetak')}
            />
          )}
        </main>
      </div>

      {/* Dark Navy Footer */}
      <Footer onNavigateTab={(tab) => setActiveTab(tab)} />
    </div>
  );
}

