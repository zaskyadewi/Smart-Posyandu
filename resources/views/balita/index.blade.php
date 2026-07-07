<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Daftar Data Balita & Ibu') }}
            </h2>
            <a href="{{ url('/') }}" class="text-sm font-bold text-blue-600 hover:underline">&larr; Kembali ke Beranda</a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
            @if(session('success'))
                <div style="background-color: #d1fae5; border-left: 4px solid #10b981; color: #065f46;" class="p-4 mb-6 rounded-r-lg shadow-sm">
                    <p class="font-bold">Berhasil!</p>
                    <p class="text-sm">{{ session('success') }}</p>
                </div>
            @endif

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h3 class="text-lg font-bold text-gray-700">Kelola Data Balita</h3>
                        <p class="text-xs text-gray-400">Daftar seluruh balita yang terdaftar di Posyandu.</p>
                    </div>
                    
                    @if(Auth::user()->role === 'kader')
                        <a href="{{ route('balita.create') }}" style="background-color: #2563eb; color: #ffffff;" class="font-bold py-2 px-4 rounded-lg text-sm shadow inline-block hover:opacity-90 transition">
                            + Tambah Balita Baru
                        </a>
                    @endif
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse border border-gray-200 rounded-lg">
                        <thead>
                            <tr class="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                                <th class="p-3 border-b border-gray-200">No</th>
                                <th class="p-3 border-b border-gray-200">Nama Balita</th>
                                <th class="p-3 border-b border-gray-200">NIK</th>
                                <th class="p-3 border-b border-gray-200">Tanggal Lahir</th>
                                <th class="p-3 border-b border-gray-200">Jenis Kelamin</th>
                                <th class="p-3 border-b border-gray-200">Nama Ibu</th>
                                
                                @if(Auth::user()->role === 'kader')
                                    <th class="p-3 border-b border-gray-200 text-center">Aksi</th>
                                @endif
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm">
                            @forelse($balitas as $index => $balita)
                                <tr class="hover:bg-gray-50 border-b border-gray-100">
                                    <td class="p-3 font-medium text-gray-800">{{ $index + 1 }}</td>
                                    <td class="p-3 font-bold text-blue-600">{{ $balita->nama_balita }}</td>
                                    <td class="p-3">{{ $balita->nik_balita ?: '-' }}</td>
                                    <td class="p-3">{{ \Carbon\Carbon::parse($balita->tanggal_lahir)->format('d M Y') }}</td>
                                    <td class="p-3">
                                        @if($balita->jenis_kelamin == 'Laki-laki')
                                            <span style="background-color: #e0f2fe; color: #0369a1;" class="px-2.5 py-1 rounded-md font-bold text-xs">👦 Laki-laki</span>
                                        @else
                                            <span style="background-color: #fce7f3; color: #be185d;" class="px-2.5 py-1 rounded-md font-bold text-xs">👧 Perempuan</span>
                                        @endif
                                    </td>
                                    <td class="p-3 font-medium">{{ $balita->nama_ibu }}</td>
                                    
                                    @if(Auth::user()->role === 'kader')
                                        <td class="p-3 text-center">
                                            <div class="flex justify-center gap-2">
                                                <a href="{{ route('balita.edit', $balita->id) }}" style="background-color: #f59e0b; color: #ffffff;" class="font-bold py-1 px-3 rounded text-xs shadow inline-block hover:opacity-90">
                                                    Edit
                                                </a>
                                                <form action="{{ route('balita.destroy', $balita->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data balita ini?')">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" style="background-color: #ef4444; color: #ffffff;" class="font-bold py-1 px-3 rounded text-xs shadow inline-block hover:opacity-90">
                                                        Hapus
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    @endif
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="{{ Auth::user()->role === 'kader' ? '7' : '6' }}" class="p-8 text-center text-gray-400 italic bg-gray-50">
                                        Belum ada data balita yang terdaftar.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</x-app-layout>