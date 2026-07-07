<?php

namespace App\Http\Controllers;

use App\Models\Balita;
use Illuminate\Http\Request;

class BalitaController extends Controller
{
    /**
     * Menampilkan daftar semua data balita.
     */
    public function index()
    {
        // Mengambil semua data balita dari database, diurutkan dari yang terbaru
        $balitas = Balita::latest()->get();
        
        // Mengirim data ke tampilan (view) resources/views/balita/index.blade.php
        return view('balita.index', compact('balitas'));
    }

    /**
     * Menampilkan formulir untuk menambah data balita baru.
     */
    public function create()
    {
        return view('balita.create');
    }

    /**
     * Menyimpan data balita baru ke dalam database.
     */
    public function store(Request $request)
    {
        // 1. Validasi: Memastikan kolom wajib isi tidak boleh kosong
        $request->validate([
            'nama_balita' => 'required|string|max:255',
            'nik_balita' => 'nullable|string|max:16',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string',
            'nama_ibu' => 'required|string|max:255',
        ]);

        // 2. Simpan data ke dalam tabel balitas
        Balita::create([
            'nama_balita' => $request->nama_balita,
            'nik_balita' => $request->nik_balita,
            'tanggal_lahir' => $request->tanggal_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'nama_ibu' => $request->nama_ibu,
        ]);

        // 3. Kembali ke halaman daftar dengan pesan sukses
        return redirect()->route('balita.index')->with('success', 'Data balita berhasil ditambahkan!');
    }

    /**
     * Menampilkan detail satu data balita (Opsional).
     */
    public function show($id)
    {
        // Cari data berdasarkan ID secara langsung
        $balita = Balita::findOrFail($id);
        
        return view('balita.show', compact('balita'));
    }

    /**
     * Menampilkan formulir untuk mengedit data balita.
     */
    public function edit($id)
    {
        // Cari data berdasarkan ID secara langsung
        $balita = Balita::findOrFail($id);
        
        return view('balita.edit', compact('balita'));
    }

    /**
     * Memperbarui data balita di dalam database.
     */
    public function update(Request $request, $id)
    {
        // 1. Validasi data baru yang diedit
        $request->validate([
            'nama_balita' => 'required|string|max:255',
            'nik_balita' => 'nullable|string|max:16',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string',
            'nama_ibu' => 'required|string|max:255',
        ]);

        // 2. Cari data berdasarkan ID, lalu perbarui
        $balita = Balita::findOrFail($id);
        $balita->update([
            'nama_balita' => $request->nama_balita,
            'nik_balita' => $request->nik_balita,
            'tanggal_lahir' => $request->tanggal_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'nama_ibu' => $request->nama_ibu,
        ]);

        // 3. Kembali ke halaman daftar dengan pesan sukses
        return redirect()->route('balita.index')->with('success', 'Data balita berhasil diperbarui!');
    }

    /**
     * Menghapus data balita dari database.
     */
    public function destroy($id)
    {
        // 1. Cari data balita berdasarkan ID yang dikirim dari tombol
        $balita = Balita::findOrFail($id);
        
        // 2. Hapus data tersebut dari database MySQL
        $balita->delete();

        // 3. Kembali ke halaman daftar dengan pesan sukses
        return redirect()->route('balita.index')->with('success', 'Data balita berhasil dihapus!');
    }
}