<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Resmi Posyandu - {{ date('d M Y') }}</title>
    <style>
        /* Desain Khusus Kertas A4 & Cetak */
        body {
            font-family: 'Times New Roman', Times, serif;
            color: #000;
            margin: 0;
            padding: 20px;
        }
        .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }
        /* KOP Surat Resmi */
        .kop-surat {
            text-align: center;
            border-bottom: 3px double #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .kop-surat h1 {
            font-size: 18pt;
            margin: 0;
            text-transform: uppercase;
        }
        .kop-surat h2 {
            font-size: 14pt;
            margin: 5px 0;
        }
        .kop-surat p {
            font-size: 10pt;
            margin: 0;
            font-style: italic;
        }
        /* Judul Dokumen */
        .judul-laporan {
            text-align: center;
            font-size: 14pt;
            font-weight: bold;
            text-decoration: underline;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        /* Tabel Data */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            font-size: 11pt;
        }
        table, th, td {
            border: 1px solid #000;
        }
        th {
            background-color: #f2f2f2;
            padding: 8px 5px;
            text-align: center;
        }
        td {
            padding: 6px 8px;
        }
        .text-center { text-align: center; }
        /* Kolom Tanda Tangan */
        .ttd-container {
            width: 100%;
            margin-top: 40px;
            display: table;
        }
        .ttd-box {
            display: table-cell;
            width: 50%;
            text-align: center;
            vertical-align: top;
        }
        .ttd-space {
            height: 70px;
        }
        /* Sembunyikan Tombol Saat Di-Print ke Kertas */
        @media print {
            .no-print { display: none !important; }
            body { padding: 0; }
        }
        .btn-print {
            background-color: #2563eb;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 20px;
        }
        .btn-back {
            background-color: #4b5563;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 20px;
            margin-right: 10px;
        }
    </style>
</head>
<body>

    <div class="container">
        <!-- Tombol Aksi (Tidak Akan Ikut Tercetak) -->
        <div class="no-print">
            <a href="{{ route('pemeriksaan.index') }}" class="btn-back">&larr; Kembali</a>
            <button onclick="window.print()" class="btn-print">🖨️ Cetak / Simpan sebagai PDF</button>
            <hr style="margin-bottom: 20px;">
        </div>

        <!-- KOP SURAT RESMI -->
        <div class="kop-surat">
            <h1>POSYANDU BALITA "MAWAR SEJAHTERA"</h1>
            <h2>DESA CONTOH, KECAMATAN PINTAR, KABUPATEN HEBAT</h2>
            <p>Alamat: Jl. Kesehatan No. 123, Balai Desa Contoh, Kodepos: 65100</p>
        </div>

        <!-- JUDUL -->
        <div class="judul-laporan">
            LAPORAN HASIL PENIMBANGAN & PEMERIKSAAN GIZI BALITA
        </div>
        <p style="font-size: 11pt; margin-bottom: 10px;">
            <strong>Tanggal Unduh:</strong> {{ \Carbon\Carbon::now()->isoFormat('D MMMM Y') }}
        </p>

        <!-- TABEL HASIL PENIMBANGAN -->
        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">No</th>
                    <th style="width: 15%;">Tgl Periksa</th>
                    <th style="width: 25%;">Nama Balita</th>
                    <th style="width: 20%;">Nama Ibu</th>
                    <th style="width: 10%;">Berat</th>
                    <th style="width: 10%;">Tinggi</th>
                    <th style="width: 15%;">Status Gizi</th>
                </tr>
            </thead>
            <tbody>
                @forelse($pemeriksaans as $index => $item)
                    <tr>
                        <td class="text-center">{{ $index + 1 }}</td>
                        <td class="text-center">{{ \Carbon\Carbon::parse($item->tanggal_periksa)->format('d/m/Y') }}</td>
                        <td><strong>{{ $item->balita->nama_balita ?? 'Terhapus' }}</strong></td>
                        <td>{{ $item->balita->nama_ibu ?? '-' }}</td>
                        <td class="text-center">{{ $item->berat_badan }} kg</td>
                        <td class="text-center">{{ $item->tinggi_badan }} cm</td>
                        <td class="text-center">
                            <strong>{{ $item->status_gizi }}</strong>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="text-center" style="padding: 20px;">Belum ada data pemeriksaan balita.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <!-- KOLOM TANDA TANGAN RESMI -->
        <div class="ttd-container">
            <div class="ttd-box">
                <p>Mengetahui,<br><strong>Ketua Kader Posyandu</strong></p>
                <div class="ttd-space"></div>
                <p><u>( ............................................ )</u><br>NIP/NIK. -</p>
            </div>
            <div class="ttd-box">
                <p>Malang, {{ \Carbon\Carbon::now()->isoFormat('D MMMM Y') }}<br><strong>Bidan Desa / Pemeriksa</strong></p>
                <div class="ttd-space"></div>
                <p><u>( ............................................ )</u><br>SIPB. 123/456/2026</p>
            </div>
        </div>
    </div>

</body>
</html>