<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Tambah Data Balita Baru') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                
                <div class="mb-6 border-b border-gray-100 pb-4">
                    <h3 class="text-lg font-bold text-gray-800">Form Biodata Balita</h3>
                    <p class="text-sm text-gray-500">Masukkan data diri anak dan nama ibu dengan lengkap.</p>
                </div>

                <form action="{{ route('balita.store') }}" method="POST" class="space-y-6">
                    @csrf

                    <div>
                        <label for="nama_balita" class="block font-medium text-sm text-gray-700">Nama Lengkap Balita <span class="text-red-500">*</span></label>
                        <input type="text" name="nama_balita" id="nama_balita" placeholder="Contoh: Ari Saputra" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                    </div>

                    <div>
                        <label for="nik_balita" class="block font-medium text-sm text-gray-700">NIK Balita / No. KK <span class="text-xs text-gray-400 font-normal">(Opsional)</span></label>
                        <input type="text" name="nik_balita" id="nik_balita" maxlength="16" placeholder="16 digit NIK" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1">
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="tanggal_lahir" class="block font-medium text-sm text-gray-700">Tanggal Lahir <span class="text-red-500">*</span></label>
                            <input type="date" name="tanggal_lahir" id="tanggal_lahir" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                        </div>
                        <div>
                            <label for="jenis_kelamin" class="block font-medium text-sm text-gray-700">Jenis Kelamin <span class="text-red-500">*</span></label>
                            <select name="jenis_kelamin" id="jenis_kelamin" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                                <option value="" disabled selected>-- Pilih Jenis Kelamin --</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label for="nama_ibu" class="block font-medium text-sm text-gray-700">Nama Ibu Kandung <span class="text-red-500">*</span></label>
                        <input type="text" name="nama_ibu" id="nama_ibu" placeholder="Contoh: Sarwendah" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                    </div>

                    <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                        <a href="{{ route('balita.index') }}" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-5 rounded-lg text-sm transition">
                            Batal
                        </a>
                        <button type="submit" style="background-color: #2563eb; color: #ffffff;" class="font-bold py-2 px-6 rounded-lg text-sm shadow inline-block hover:opacity-90 transition">
                            Simpan Data Balita
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>