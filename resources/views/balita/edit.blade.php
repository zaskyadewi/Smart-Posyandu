<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Edit Data Balita') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                
                <div class="mb-6 border-b border-gray-100 pb-4">
                    <h3 class="text-lg font-bold text-gray-800">Form Edit Data Balita</h3>
                    <p class="text-sm text-gray-500">Silakan perbaiki data balita di bawah ini.</p>
                </div>

                <form action="{{ route('balita.update', $balita->id) }}" method="POST" class="space-y-6">
                    @csrf
                    @method('PUT') <div>
                        <label for="nama_balita" class="block font-medium text-sm text-gray-700">Nama Balita <span class="text-red-500">*</span></label>
                        <input type="text" name="nama_balita" id="nama_balita" value="{{ $balita->nama_balita }}" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                    </div>

                    <div>
                        <label for="nik_balita" class="block font-medium text-sm text-gray-700">NIK Balita</label>
                        <input type="text" name="nik_balita" id="nik_balita" value="{{ $balita->nik_balita }}" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1">
                    </div>

                    <div>
                        <label for="tanggal_lahir" class="block font-medium text-sm text-gray-700">Tanggal Lahir <span class="text-red-500">*</span></label>
                        <input type="date" name="tanggal_lahir" id="tanggal_lahir" value="{{ $balita->tanggal_lahir }}" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                    </div>

                    <div>
                        <label for="jenis_kelamin" class="block font-medium text-sm text-gray-700">Jenis Kelamin <span class="text-red-500">*</span></label>
                        <select name="jenis_kelamin" id="jenis_kelamin" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                            <option value="Laki-laki" {{ $balita->jenis_kelamin == 'Laki-laki' ? 'selected' : '' }}>Laki-laki</option>
                            <option value="Perempuan" {{ $balita->jenis_kelamin == 'Perempuan' ? 'selected' : '' }}>Perempuan</option>
                        </select>
                    </div>

                    <div>
                        <label for="nama_ibu" class="block font-medium text-sm text-gray-700">Nama Ibu Kandung <span class="text-red-500">*</span></label>
                        <input type="text" name="nama_ibu" id="nama_ibu" value="{{ $balita->nama_ibu }}" class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm w-full mt-1" required>
                    </div>

                    <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                        <a href="{{ route('balita.index') }}" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-5 rounded-lg text-sm transition">
                            Batal
                        </a>
                        <button type="submit" style="background-color: #f59e0b; color: #ffffff;" class="font-bold py-2 px-6 rounded-lg text-sm shadow inline-block hover:opacity-90">
                            Perbarui Data
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>