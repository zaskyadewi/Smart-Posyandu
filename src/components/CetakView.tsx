import React from 'react';
import { Pemeriksaan } from '../types';
import { ArrowLeft, Printer } from 'lucide-react';

interface CetakViewProps {
  pemeriksaans: Pemeriksaan[];
  onBack: () => void;
}

export const CetakView: React.FC<CetakViewProps> = ({ pemeriksaans, onBack }) => {
  const downloadDateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4 sm:px-6 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-200 print:shadow-none print:border-none print:p-0">
        {/* Action Toolbar (Hidden when printing) */}
        <div className="no-print flex justify-between items-center pb-6 mb-6 border-b border-slate-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-xl text-sm transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm shadow-md transition cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Cetak / Simpan sebagai PDF
          </button>
        </div>

        {/* Printable Official POSYANDU Document */}
        <div className="text-slate-900 font-serif">
          {/* Official KOP SURAT */}
          <div className="text-center border-b-4 border-double border-slate-900 pb-4 mb-6">
            <h1 className="text-2xl font-bold uppercase tracking-wide">
              POSYANDU BALITA "MAWAR SEJAHTERA"
            </h1>
            <h2 className="text-base font-semibold uppercase mt-1">
              DESA CONTOH, KECAMATAN PINTAR, KABUPATEN HEBAT
            </h2>
            <p className="text-xs italic text-slate-700 mt-1">
              Alamat: Jl. Kesehatan No. 123, Balai Desa Contoh, Kodepos: 65100
            </p>
          </div>

          {/* Document Title */}
          <div className="text-center my-6">
            <h3 className="text-lg font-extrabold uppercase underline tracking-wider">
              LAPORAN HASIL PENIMBANGAN & PEMERIKSAAN GIZI BALITA
            </h3>
            <p className="text-xs font-sans text-slate-600 mt-1 font-medium">
              Tanggal Cetak: <span className="font-bold text-slate-900">{downloadDateStr}</span>
            </p>
          </div>

          {/* Examination Table */}
          <div className="my-6">
            <table className="w-full text-left border-collapse border border-slate-900 text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-900 uppercase font-bold border-b border-slate-900">
                  <th className="p-2 border-r border-slate-900 w-10 text-center">No</th>
                  <th className="p-2 border-r border-slate-900 w-28 text-center">Tgl Periksa</th>
                  <th className="p-2 border-r border-slate-900">Nama Balita</th>
                  <th className="p-2 border-r border-slate-900">Nama Ibu</th>
                  <th className="p-2 border-r border-slate-900 text-center w-20">Berat</th>
                  <th className="p-2 border-r border-slate-900 text-center w-20">Tinggi</th>
                  <th className="p-2 text-center w-36">Status Gizi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {pemeriksaans.length > 0 ? (
                  pemeriksaans.map((item, idx) => {
                    const dateFormatted = new Date(item.tanggal_periksa).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    });

                    return (
                      <tr key={item.id} className="border-b border-slate-900">
                        <td className="p-2 border-r border-slate-900 text-center font-medium">{idx + 1}</td>
                        <td className="p-2 border-r border-slate-900 text-center whitespace-nowrap">{dateFormatted}</td>
                        <td className="p-2 border-r border-slate-900 font-bold">{item.balita?.nama_balita || 'Terhapus'}</td>
                        <td className="p-2 border-r border-slate-900">{item.balita?.nama_ibu || '-'}</td>
                        <td className="p-2 border-r border-slate-900 text-center font-semibold">{item.berat_badan} kg</td>
                        <td className="p-2 border-r border-slate-900 text-center font-semibold">{item.tinggi_badan} cm</td>
                        <td className="p-2 text-center font-bold">{item.status_gizi || 'Normal'}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-6 text-center italic">
                      Belum ada data pemeriksaan balita.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Signature Block */}
          <div className="mt-12 grid grid-cols-2 text-center text-xs sm:text-sm font-sans pt-4">
            <div>
              <p className="font-semibold">Mengetahui,</p>
              <p className="font-bold text-slate-900 mt-0.5">Ketua Kader Posyandu</p>
              <div className="h-20"></div>
              <p className="font-bold underline">( ............................................ )</p>
              <p className="text-xs text-slate-600 mt-0.5">NIP/NIK. -</p>
            </div>

            <div>
              <p className="font-semibold">Malang, {downloadDateStr}</p>
              <p className="font-bold text-slate-900 mt-0.5">Bidan Desa / Pemeriksa</p>
              <div className="h-20"></div>
              <p className="font-bold underline">( ............................................ )</p>
              <p className="text-xs text-slate-600 mt-0.5">SIPB. 123/456/2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
