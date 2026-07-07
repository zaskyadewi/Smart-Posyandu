<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Input Pemeriksaan & Penimbangan') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                
                <div class="mb-6 border-b border-gray-100 pb-4">
                    <h3 class="text-lg font-bold text-gray-800">Form Pemeriksaan Bulanan Balita</h3>
                    <p class="text-sm text-gray-500">Pilih nama balita dan masukkan hasil pengukuran dengan tepat.</p>
                </div>

                <form action="{{ route('pemeriksaan.store') }}" method="POST" class="space-y-6">
                    @csrf

                    <div>
                        <label for="balita_id" class="block font-medium text-sm text-gray-700">Nama Balita <span class="text-red-500">*</span></label>
                        <select name="balita_id" id="balita_id" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                            <option value="" disabled selected>-- Pilih Balita yang Diperiksa --</option>
                            @foreach($balitas as $balita)
                                <option value="{{ $balita->id }}">{{ $balita->nama_balita }} (Ibu: {{ $balita->nama_ibu }})</option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <label for="tanggal_periksa" class="block font-medium text-sm text-gray-700">Tanggal Pemeriksaan <span class="text-red-500">*</span></label>
                        <input type="date" name="tanggal_periksa" id="tanggal_periksa" value="{{ date('Y-m-d') }}" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="berat_badan" class="block font-medium text-sm text-gray-700">Berat Badan (kg) <span class="text-red-500">*</span></label>
                            <input type="number" step="0.1" name="berat_badan" id="berat_badan" placeholder="Contoh: 10.5" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                        </div>
                        <div>
                            <label for="tinggi_badan" class="block font-medium text-sm text-gray-700">Tinggi/Panjang Badan (cm) <span class="text-red-500">*</span></label>
                            <input type="number" step="0.1" name="tinggi_badan" id="tinggi_badan" placeholder="Contoh: 75.2" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                        </div>
                    </div>

                    <div>
                        <label for="catatan" class="block font-medium text-sm text-gray-700">Catatan Kesehatan / Tindakan <span class="text-xs text-gray-400 font-normal">(Opsional)</span></label>
                        <input type="text" name="catatan" id="catatan" placeholder="Contoh: Diberikan Vitamin A / Imunisasi Polio" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1">
                    </div>

                    <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                        <a href="{{ route('pemeriksaan.index') }}" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-5 rounded-lg text-sm transition">
                            Batal
                        </a>
                        <button type="submit" style="background-color: #2563eb; color: #ffffff;" class="font-bold py-2 px-6 rounded-lg text-sm shadow inline-block hover:opacity-90">
                            Simpan Hasil Pemeriksaan
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>