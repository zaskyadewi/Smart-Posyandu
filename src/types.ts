export type Gender = 'Laki-laki' | 'Perempuan';

export type UserRole = 'kader' | 'ibu_balita';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Balita {
  id: number;
  nama_balita: string;
  nik_balita?: string | null;
  tanggal_lahir: string; // YYYY-MM-DD
  jenis_kelamin: Gender;
  nama_ibu: string;
  created_at?: string;
  updated_at?: string;
}

export interface Pemeriksaan {
  id: number;
  balita_id: number;
  tanggal_periksa: string; // YYYY-MM-DD
  berat_badan: number; // kg
  tinggi_badan: number; // cm
  catatan?: string | null;
  created_at?: string;
  updated_at?: string;
  balita?: Balita;
  status_gizi?: string;
}

export interface DashboardStats {
  totalBalita: number;
  totalLaki: number;
  totalPerempuan: number;
  pemeriksaanBulanIni: number;
  pemeriksaanTerbaru: Pemeriksaan[];
  bulanLabels: string[];
  beratData: number[];
  tinggiData: number[];
}
