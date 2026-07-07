<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Riwayat Pemeriksaan & Penimbangan Balita') }}
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
                        <h3 class="text-lg font-bold text-gray-700">Daftar Hasil Penimbangan Bulanan</h3>
                        <p class="text-xs text-gray-400">Catatan perkembangan berat, tinggi badan, serta analisis gizi otomatis.</p>
                    </div>
                    
                    <div class="flex flex-wrap gap-2">
                        <a href="{{ route('pemeriksaan.cetak') }}" target="_blank" style="background-color: #4f46e5; color: #ffffff;" class="font-bold py-2 px-4 rounded-lg text-sm shadow inline-block hover:opacity-90 flex items-center gap-1 transition">
                            🖨️ Cetak / Unduh PDF
                        </a>

                        @if(Auth::user()->role === 'kader')
                            <a href="{{ route('pemeriksaan.create') }}" style="background-color: #2563eb; color: #ffffff;" class="font-bold py-2 px-4 rounded-lg text-sm shadow inline-block hover:opacity-90 transition">
                                + Input Pemeriksaan Baru
                            </a>
                        @endif
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse border border-gray-200 rounded-lg">
                        <thead>
                            <tr class="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                                <th class="p-3 border-b border-gray-200">No</th>
                                <th class="p-3 border-b border-gray-200">Tanggal</th>
                                <th class="p-3 border-b border-gray-200">Nama Balita</th>
                                <th class="p-3 border-b border-gray-200">Berat</th>
                                <th class="p-3 border-b border-gray-200">Tinggi</th>
                                <th class="p-3 border-b border-gray-200 text-center">Status Gizi (Smart AI)</th>
                                <th class="p-3 border-b border-gray-200">Catatan</th>
                                
                                @if(Auth::user()->role === 'kader')
                                    <th class="p-3 border-b border-gray-200 text-center">Aksi</th>
                                @endif
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm">
                            @forelse($pemeriksaans as $index => $item)
                                <tr class="hover:bg-gray-50 border-b border-gray-100">
                                    <td class="p-3 font-medium text-gray-800">{{ $index + 1 }}</td>
                                    <td class="p-3 whitespace-nowrap">{{ \Carbon\Carbon::parse($item->tanggal_periksa)->format('d M Y') }}</td>
                                    <td class="p-3 font-bold text-blue-600">
                                        {{ $item->balita->nama_balita ?? 'Data Balita Terhapus' }}
                                        <span class="block text-xs font-normal text-gray-400">Ibu: {{ $item->balita->nama_ibu ?? '-' }}</span>
                                    </td>
                                    <td class="p-3">
                                        <span style="background-color: #fef3c7; color: #d97706;" class="px-2.5 py-1 rounded-md font-bold text-xs">
                                            {{ $item->berat_badan }} kg
                                        </span>
                                    </td>
                                    <td class="p-3">
                                        <span style="background-color: #d1fae5; color: #059669;" class="px-2.5 py-1 rounded-md font-bold text-xs">
                                            {{ $item->tinggi_badan }} cm
                                        </span>
                                    </td>
                                    <td class="p-3 text-center">
                                        @php $status = $item->status_gizi; @endphp
                                        @if($status == 'Normal / Sehat')
                                            <span style="background-color: #d1fae5; color: #065f46;" class="px-3 py-1 rounded-full text-xs font-extrabold shadow-sm inline-block">🟢 {{ $status }}</span>
                                        @elseif($status == 'Berisiko Stunting')
                                            <span style="background-color: #fee2e2; color: #991b1b; border: 1px solid #f87171;" class="px-3 py-1 rounded-full text-xs font-extrabold shadow animate-pulse inline-block">🔴 {{ $status }}</span>
                                        @elseif($status == 'Gizi Kurang')
                                            <span style="background-color: #fef3c7; color: #92400e;" class="px-3 py-1 rounded-full text-xs font-extrabold shadow-sm inline-block">🟡 {{ $status }}</span>
                                        @else
                                            <span style="background-color: #e0f2fe; color: #0369a1;" class="px-3 py-1 rounded-full text-xs font-extrabold shadow-sm inline-block">🔵 {{ $status }}</span>
                                        @endif
                                    </td>
                                    <td class="p-3 text-gray-500 italic text-xs">{{ $item->catatan ?: '-' }}</td>

                                    @if(Auth::user()->role === 'kader')
                                        <td class="p-3 text-center">
                                            <form action="{{ route('pemeriksaan.destroy', $item->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus riwayat pemeriksaan ini?')">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" style="background-color: #ef4444; color: #ffffff;" class="font-bold py-1 px-3 rounded text-xs shadow inline-block hover:opacity-90 transition">
                                                    Hapus
                                                </button>
                                            </form>
                                        </td>
                                    @endif
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="{{ Auth::user()->role === 'kader' ? '8' : '7' }}" class="p-8 text-center text-gray-400 italic bg-gray-50">
                                        Belum ada riwayat pemeriksaan balita yang tersimpan.
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