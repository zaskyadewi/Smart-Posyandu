<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon; // Library untuk memproses tanggal dan umur otomatis

class Pemeriksaan extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function balita()
    {
        return $this->belongsTo(Balita::class, 'balita_id');
    }

    /**
     * FITUR SMART: Menghitung Status Gizi & Stunting secara Otomatis
     */
    public function getStatusGiziAttribute()
    {
        if (!$this->balita) {
            return 'Data Balita Tidak Ditemukan';
        }

        // 1. Hitung Umur Balita saat diperiksa (dalam bulan)
        $tglLahir = Carbon::parse($this->balita->tanggal_lahir);
        $tglPeriksa = Carbon::parse($this->tanggal_periksa);
        $umurBulan = $tglLahir->diffInMonths($tglPeriksa);

        // 2. Logika Deteksi Stunting (Tinggi Badan menurut Umur - Pendekatan Standar WHO)
        $isStunting = false;
        if ($umurBulan <= 12 && $this->tinggi_badan < 68) {
            $isStunting = true; // Usia 1 tahun atau kurang, tinggi di bawah standar (68 cm)
        } elseif ($umurBulan <= 24 && $this->tinggi_badan < 80) {
            $isStunting = true; // Usia 2 tahun atau kurang, tinggi di bawah standar (80 cm)
        } elseif ($umurBulan > 24 && $this->tinggi_badan < 88) {
            $isStunting = true; // Usia di atas 2 tahun, tinggi di bawah standar (88 cm)
        }

        if ($isStunting) {
            return 'Berisiko Stunting';
        }

        // 3. Logika Deteksi Status Gizi (Indeks Massa Tubuh / IMT Sederhana)
        // Rumus IMT = Berat (kg) / (Tinggi meter * Tinggi meter)
        $tinggiMeter = $this->tinggi_badan / 100;
        $imt = $this->berat_badan / ($tinggiMeter * $tinggiMeter);

        if ($imt < 13.5) {
            return 'Gizi Kurang';
        } elseif ($imt > 18.5) {
            return 'Berisiko Lebih Gizi / Gemuk';
        }

        return 'Normal / Sehat';
    }
}