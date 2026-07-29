import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// Types
interface BalitaData {
  id: number;
  nama_balita: string;
  nik_balita: string | null;
  tanggal_lahir: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan';
  nama_ibu: string;
  created_at: string;
  updated_at: string;
}

interface PemeriksaanData {
  id: number;
  balita_id: number;
  tanggal_periksa: string;
  berat_badan: number;
  tinggi_badan: number;
  catatan: string | null;
  created_at: string;
  updated_at: string;
}

// In-Memory Database Seed
let balitaList: BalitaData[] = [
  {
    id: 1,
    nama_balita: 'Budi Santoso',
    nik_balita: '3507123400011234',
    tanggal_lahir: '2023-05-12', // 3 tahun 2 bulan approx
    jenis_kelamin: 'Laki-laki',
    nama_ibu: 'Siti Aminah',
    created_at: '2026-01-10T08:00:00Z',
    updated_at: '2026-01-10T08:00:00Z',
  },
  {
    id: 2,
    nama_balita: 'Aisyah Susanti',
    nik_balita: '3507123400020002',
    tanggal_lahir: '2024-07-15', // 2 thn
    jenis_kelamin: 'Perempuan',
    nama_ibu: 'Dewi Rahayu',
    created_at: '2026-01-12T08:00:00Z',
    updated_at: '2026-01-12T08:00:00Z',
  },
  {
    id: 3,
    nama_balita: 'Alina Amalan',
    nik_balita: '3507123400030003',
    tanggal_lahir: '2025-11-20', // 8 bln
    jenis_kelamin: 'Perempuan',
    nama_ibu: 'Nurul Aini',
    created_at: '2026-01-15T08:00:00Z',
    updated_at: '2026-01-15T08:00:00Z',
  },
  {
    id: 4,
    nama_balita: 'Muhammad Aris',
    nik_balita: '3507123400040004',
    tanggal_lahir: '2024-05-05',
    jenis_kelamin: 'Laki-laki',
    nama_ibu: 'Rina Lestari',
    created_at: '2026-02-01T08:00:00Z',
    updated_at: '2026-02-01T08:00:00Z',
  },
  {
    id: 5,
    nama_balita: 'Cantika Kirana',
    nik_balita: '3507123400050005',
    tanggal_lahir: '2023-11-18',
    jenis_kelamin: 'Perempuan',
    nama_ibu: 'Endang Susanti',
    created_at: '2026-02-05T08:00:00Z',
    updated_at: '2026-02-05T08:00:00Z',
  },
];

let pemeriksaanList: PemeriksaanData[] = [
  {
    id: 1,
    balita_id: 1, // Budi Santoso
    tanggal_periksa: '2026-07-20',
    berat_badan: 12.5,
    tinggi_badan: 88.0,
    catatan: 'Hebat Bunda! Grafik Budi bulan ini naik sangat baik dan berada di zona hijau (Optimal). Teruskan pola asuh dan nutrisi yang diberikan. Jangan lupa jadwal imunisasi bulan depan!',
    created_at: '2026-07-20T09:00:00Z',
    updated_at: '2026-07-20T09:00:00Z',
  },
  {
    id: 2,
    balita_id: 2, // Aisyah Susanti
    tanggal_periksa: '2026-07-20',
    berat_badan: 11.0,
    tinggi_badan: 84.0,
    catatan: 'Perkembangan aktif dan ceria',
    created_at: '2026-07-20T09:30:00Z',
    updated_at: '2026-07-20T09:30:00Z',
  },
  {
    id: 3,
    balita_id: 3, // Alina Amalan
    tanggal_periksa: '2026-07-18',
    berat_badan: 8.2,
    tinggi_badan: 70.5,
    catatan: 'Diberikan MPASI tinggi protein',
    created_at: '2026-07-18T10:00:00Z',
    updated_at: '2026-07-18T10:00:00Z',
  },
  {
    id: 4,
    balita_id: 1, // Budi Santoso previous
    tanggal_periksa: '2026-06-15',
    berat_badan: 12.1,
    tinggi_badan: 86.5,
    catatan: 'Pemberian biskuit PMT',
    created_at: '2026-06-15T08:30:00Z',
    updated_at: '2026-06-15T08:30:00Z',
  },
  {
    id: 5,
    balita_id: 1, // Budi Santoso earlier
    tanggal_periksa: '2026-05-10',
    berat_badan: 11.8,
    tinggi_badan: 85.0,
    catatan: 'Vitamin A Merah',
    created_at: '2026-05-10T11:00:00Z',
    updated_at: '2026-05-10T11:00:00Z',
  },
];

let currentUser: { id: number; name: string; email: string; role: 'kader' | 'ibu_balita'; loggedIn: boolean } = {
  id: 0,
  name: '',
  email: '',
  role: 'ibu_balita',
  loggedIn: false,
};

// Calculate age in months between two date strings
function calculateAgeInMonths(birthDateStr: string, checkDateStr: string): number {
  const birth = new Date(birthDateStr);
  const check = new Date(checkDateStr);
  let months = (check.getFullYear() - birth.getFullYear()) * 12 + (check.getMonth() - birth.getMonth());
  if (check.getDate() < birth.getDate()) {
    months--;
  }
  return Math.max(0, months);
}

// Smart status gizi calculation algorithm
function calculateStatusGizi(balita: BalitaData | undefined, tanggal_periksa: string, berat_badan: number, tinggi_badan: number): string {
  if (!balita) return 'Data Balita Tidak Ditemukan';

  const umurBulan = calculateAgeInMonths(balita.tanggal_lahir, tanggal_periksa);

  // 1. Stunting detection (Standard WHO WHO-growth standards approximation)
  let isStunting = false;
  if (umurBulan <= 12 && tinggi_badan < 68) {
    isStunting = true;
  } else if (umurBulan <= 24 && tinggi_badan < 80) {
    isStunting = true;
  } else if (umurBulan > 24 && tinggi_badan < 88) {
    isStunting = true;
  }

  if (isStunting) {
    return 'Berisiko Stunting';
  }

  // 2. BMI calculation
  const tinggiMeter = tinggi_badan / 100;
  if (tinggiMeter <= 0) return 'Data Tidak Valid';

  const imt = berat_badan / (tinggiMeter * tinggiMeter);

  if (imt < 13.5) {
    return 'Gizi Kurang';
  } else if (imt > 18.5) {
    return 'Berisiko Lebih Gizi / Gemuk';
  }

  return 'Normal / Sehat';
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/auth/me', (req, res) => {
    res.json(currentUser);
  });

  app.post('/api/auth/login', (req, res) => {
    const { name, email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email wajib diisi' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    
    // Jalur A: Kader / Admin Desa
    // Syarat: Login menggunakan email admin@posyandu.com atau email yang mengandung admin
    if (cleanEmail === 'admin@posyandu.com' || cleanEmail.includes('admin')) {
      currentUser = {
        id: 1,
        name: name || 'Admin / Kader Posyandu Mawar',
        email: 'admin@posyandu.com',
        role: 'kader',
        loggedIn: true,
      };
      return res.json({
        user: currentUser,
        redirectTarget: 'dashboard', // Screen 5
      });
    }

    // Jalur B: Ibu Balita (Warga Umum)
    // Syarat: Email biasa / WhatsApp
    currentUser = {
      id: 2,
      name: name || 'Siti Aminah (Ibu Balita)',
      email: cleanEmail,
      role: 'ibu_balita',
      loggedIn: true,
    };
    return res.json({
      user: currentUser,
      redirectTarget: 'landing', // Screen 2
    });
  });

  app.post('/api/auth/logout', (req, res) => {
    currentUser = {
      id: 0,
      name: '',
      email: '',
      role: 'ibu_balita',
      loggedIn: false,
    };
    res.json({ success: true });
  });

  app.post('/api/auth/switch-role', (req, res) => {
    const { role } = req.body;
    if (role === 'kader' || role === 'ibu_balita') {
      currentUser.role = role;
      currentUser.name = role === 'kader' ? 'Kader Posyandu Mawar' : 'Siti Aminah (Ibu Balita)';
      currentUser.email = role === 'kader' ? 'kader@posyandu.id' : 'ibu@posyandu.id';
    }
    res.json(currentUser);
  });

  // Dashboard Stats API
  app.get('/api/dashboard', (req, res) => {
    const totalBalita = balitaList.length;
    const totalLaki = balitaList.filter((b) => b.jenis_kelamin === 'Laki-laki').length;
    const totalPerempuan = balitaList.filter((b) => b.jenis_kelamin === 'Perempuan').length;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const pemeriksaanBulanIni = pemeriksaanList.filter((p) => {
      const d = new Date(p.tanggal_periksa);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    // Recent 5 examinations
    const recentList = [...pemeriksaanList]
      .sort((a, b) => new Date(b.tanggal_periksa).getTime() - new Date(a.tanggal_periksa).getTime())
      .slice(0, 5)
      .map((p) => {
        const balita = balitaList.find((b) => b.id === p.balita_id);
        return {
          ...p,
          balita,
          status_gizi: calculateStatusGizi(balita, p.tanggal_periksa, p.berat_badan, p.tinggi_badan),
        };
      });

    // 6 Month Labels & average growth stats
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const bulanLabels: string[] = [];
    const beratData: number[] = [];
    const tinggiData: number[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mIdx = d.getMonth();
      const yr = d.getFullYear();

      bulanLabels.push(`${monthNames[mIdx]} ${yr}`);

      const filtered = pemeriksaanList.filter((p) => {
        const pd = new Date(p.tanggal_periksa);
        return pd.getMonth() === mIdx && pd.getFullYear() === yr;
      });

      if (filtered.length > 0) {
        const avgBerat = filtered.reduce((acc, curr) => acc + curr.berat_badan, 0) / filtered.length;
        const avgTinggi = filtered.reduce((acc, curr) => acc + curr.tinggi_badan, 0) / filtered.length;
        beratData.push(Number(avgBerat.toFixed(1)));
        tinggiData.push(Number(avgTinggi.toFixed(1)));
      } else {
        // Fallback or smooth estimate from adjacent data if available
        beratData.push(0);
        tinggiData.push(0);
      }
    }

    res.json({
      totalBalita,
      totalLaki,
      totalPerempuan,
      pemeriksaanBulanIni,
      pemeriksaanTerbaru: recentList,
      bulanLabels,
      beratData,
      tinggiData,
    });
  });

  // Balita CRUD
  app.get('/api/balita', (req, res) => {
    const list = [...balitaList].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    res.json(list);
  });

  app.post('/api/balita', (req, res) => {
    const { nama_balita, nik_balita, tanggal_lahir, jenis_kelamin, nama_ibu } = req.body;

    if (!nama_balita || !tanggal_lahir || !jenis_kelamin || !nama_ibu) {
      return res.status(400).json({ error: 'Data wajib diisi belum lengkap' });
    }

    const newId = balitaList.length > 0 ? Math.max(...balitaList.map((b) => b.id)) + 1 : 1;
    const nowIso = new Date().toISOString();

    const newItem: BalitaData = {
      id: newId,
      nama_balita,
      nik_balita: nik_balita || null,
      tanggal_lahir,
      jenis_kelamin,
      nama_ibu,
      created_at: nowIso,
      updated_at: nowIso,
    };

    balitaList.push(newItem);
    res.status(201).json(newItem);
  });

  app.put('/api/balita/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = balitaList.findIndex((b) => b.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Data balita tidak ditemukan' });
    }

    const { nama_balita, nik_balita, tanggal_lahir, jenis_kelamin, nama_ibu } = req.body;

    balitaList[index] = {
      ...balitaList[index],
      nama_balita: nama_balita ?? balitaList[index].nama_balita,
      nik_balita: nik_balita !== undefined ? nik_balita : balitaList[index].nik_balita,
      tanggal_lahir: tanggal_lahir ?? balitaList[index].tanggal_lahir,
      jenis_kelamin: jenis_kelamin ?? balitaList[index].jenis_kelamin,
      nama_ibu: nama_ibu ?? balitaList[index].nama_ibu,
      updated_at: new Date().toISOString(),
    };

    res.json(balitaList[index]);
  });

  app.delete('/api/balita/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    balitaList = balitaList.filter((b) => b.id !== id);
    // Also remove associated pemeriksaans
    pemeriksaanList = pemeriksaanList.filter((p) => p.balita_id !== id);

    res.json({ success: true, message: 'Data balita berhasil dihapus!' });
  });

  // Pemeriksaan CRUD
  app.get('/api/pemeriksaan', (req, res) => {
    const list = [...pemeriksaanList]
      .sort((a, b) => new Date(b.tanggal_periksa).getTime() - new Date(a.tanggal_periksa).getTime())
      .map((p) => {
        const balita = balitaList.find((b) => b.id === p.balita_id);
        return {
          ...p,
          balita,
          status_gizi: calculateStatusGizi(balita, p.tanggal_periksa, p.berat_badan, p.tinggi_badan),
        };
      });

    res.json(list);
  });

  app.post('/api/pemeriksaan', (req, res) => {
    const { balita_id, tanggal_periksa, berat_badan, tinggi_badan, catatan } = req.body;

    if (!balita_id || !tanggal_periksa || berat_badan === undefined || tinggi_badan === undefined) {
      return res.status(400).json({ error: 'Formulir pemeriksaan belum lengkap' });
    }

    const newId = pemeriksaanList.length > 0 ? Math.max(...pemeriksaanList.map((p) => p.id)) + 1 : 1;
    const nowIso = new Date().toISOString();

    const newItem: PemeriksaanData = {
      id: newId,
      balita_id: Number(balita_id),
      tanggal_periksa,
      berat_badan: Number(berat_badan),
      tinggi_badan: Number(tinggi_badan),
      catatan: catatan || null,
      created_at: nowIso,
      updated_at: nowIso,
    };

    pemeriksaanList.push(newItem);

    const balita = balitaList.find((b) => b.id === newItem.balita_id);
    const enriched = {
      ...newItem,
      balita,
      status_gizi: calculateStatusGizi(balita, newItem.tanggal_periksa, newItem.berat_badan, newItem.tinggi_badan),
    };

    res.status(201).json(enriched);
  });

  app.delete('/api/pemeriksaan/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    pemeriksaanList = pemeriksaanList.filter((p) => p.id !== id);

    res.json({ success: true, message: 'Riwayat pemeriksaan berhasil dihapus!' });
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
