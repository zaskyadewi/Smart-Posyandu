<?php

namespace App\Http\Controllers;

use App\Models\Pemeriksaan;
use App\Models\Balita; // Wajib dipanggil agar bisa mengambil daftar balita
use Illuminate\Http\Request;

class PemeriksaanController extends Controller
{
    /**
     * Menampilkan daftar riwayat pemeriksaan.
     */
    public function index()
    {
        // Mengambil data pemeriksaan beserta data balitanya (Eager Loading)
        $pemeriksaans = Pemeriksaan::with('balita')->latest()->get();
        return view('pemeriksaan.index', compact('pemeriksaans'));
    }

    /**
     * Menampilkan form penimbangan baru (mengambil daftar nama balita).
     */
    public function create()
    {
        $balitas = Balita::orderBy('nama_balita', 'asc')->get();
        return view('pemeriksaan.create', compact('balitas'));
    }

    /**
     * Menyimpan hasil pemeriksaan ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'balita_id' => 'required|exists:balitas,id',
            'tanggal_periksa' => 'required|date',
            'berat_badan' => 'required|numeric|min:0',
            'tinggi_badan' => 'required|numeric|min:0',
            'catatan' => 'nullable|string|max:255',
        ]);

        Pemeriksaan::create([
            'balita_id' => $request->balita_id,
            'tanggal_periksa' => $request->tanggal_periksa,
            'berat_badan' => $request->berat_badan,
            'tinggi_badan' => $request->tinggi_badan,
            'catatan' => $request->catatan,
        ]);

        return redirect()->route('pemeriksaan.index')->with('success', 'Data pemeriksaan medis berhasil disimpan!');
    }

    /**
     * Menghapus riwayat pemeriksaan.
     */
    public function destroy($id)
    {
        $pemeriksaan = Pemeriksaan::findOrFail($id);
        $pemeriksaan->delete();

        return redirect()->route('pemeriksaan.index')->with('success', 'Riwayat pemeriksaan berhasil dihapus!');
    }
    /**
     * Menampilkan halaman cetak laporan resmi Posyandu (Print / PDF).
     */
    public function cetak()
    {
        // Mengambil semua data pemeriksaan diurutkan dari yang terbaru
        $pemeriksaans = Pemeriksaan::with('balita')->latest()->get();
        
        // Membuka file tampilan khusus cetak
        return view('pemeriksaan.cetak', compact('pemeriksaans'));
    }
}