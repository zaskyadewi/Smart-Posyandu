<?php

namespace App\Http\Controllers;

use App\Models\Balita;
use App\Models\Pemeriksaan;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Data Kartu Statistik
        $totalBalita = Balita::count();
        $totalLaki = Balita::where('jenis_kelamin', 'Laki-laki')->count();
        $totalPerempuan = Balita::where('jenis_kelamin', 'Perempuan')->count();
        $pemeriksaanBulanIni = Pemeriksaan::whereMonth('tanggal_periksa', Carbon::now()->month)
                                          ->whereYear('tanggal_periksa', Carbon::now()->year)
                                          ->count();

        // 2. Data Tabel Mini
        $pemeriksaanTerbaru = Pemeriksaan::with('balita')->latest()->take(5)->get();

        // 3. LOGIKA BARU: Data Grafik KMS Digital (6 Bulan Terakhir)
        $bulanLabels = [];
        $beratData = [];
        $tinggiData = [];

        // Perulangan mundur dari 5 bulan lalu sampai bulan sekarang
        for ($i = 5; $i >= 0; $i--) {
            $bulan = Carbon::now()->subMonths($i);
            
            // Nama bulan untuk label grafik (misal: "Februari", "Maret")
            $bulanLabels[] = $bulan->isoFormat('MMMM Y');

            // Hitung rata-rata berat & tinggi pada bulan tersebut
            $avgBerat = Pemeriksaan::whereMonth('tanggal_periksa', $bulan->month)
                                   ->whereYear('tanggal_periksa', $bulan->year)
                                   ->avg('berat_badan');
            
            $avgTinggi = Pemeriksaan::whereMonth('tanggal_periksa', $bulan->month)
                                    ->whereYear('tanggal_periksa', $bulan->year)
                                    ->avg('tinggi_badan');

            // Jika tidak ada data di bulan tersebut, isi dengan angka 0
            $beratData[] = round($avgBerat ?? 0, 1);
            $tinggiData[] = round($avgTinggi ?? 0, 1);
        }

        return view('dashboard', compact(
            'totalBalita',
            'totalLaki',
            'totalPerempuan',
            'pemeriksaanBulanIni',
            'pemeriksaanTerbaru',
            'bulanLabels',
            'beratData',
            'tinggiData'
        ));
    }
}