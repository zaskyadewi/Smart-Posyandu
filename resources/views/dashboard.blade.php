<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard Smart-Posyandu') }}
        </h2>
    </x-slot>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-600 flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-bold text-gray-800">Selamat Datang, {{ Auth::user()->name }}! 👋</h3>
                    <p class="text-sm text-gray-500 mt-1">Berikut adalah ringkasan data kesehatan balita di Posyandu Anda hari ini.</p>
                </div>
                <div class="hidden sm:block text-right">
                    <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{{ \Carbon\Carbon::now()->isoFormat('D MMMM Y') }}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Balita</p>
                        <p class="text-3xl font-extrabold text-gray-800 mt-1">{{ $totalBalita }} <span class="text-sm font-normal text-gray-500">Anak</span></p>
                    </div>
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-full text-xl font-bold">👶</div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Laki-laki</p>
                        <p class="text-3xl font-extrabold text-blue-600 mt-1">{{ $totalLaki }} <span class="text-sm font-normal text-gray-500">Anak</span></p>
                    </div>
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-full text-xl font-bold">👦</div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Perempuan</p>
                        <p class="text-3xl font-extrabold text-pink-600 mt-1">{{ $totalPerempuan }} <span class="text-sm font-normal text-gray-500">Anak</span></p>
                    </div>
                    <div class="p-3 bg-pink-50 text-pink-600 rounded-full text-xl font-bold">👧</div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Diperiksa Bulan Ini</p>
                        <p class="text-3xl font-extrabold text-emerald-600 mt-1">{{ $pemeriksaanBulanIni }} <span class="text-sm font-normal text-gray-500">Kali</span></p>
                    </div>
                    <div class="p-3 bg-emerald-50 text-emerald-600 rounded-full text-xl font-bold">⚖️</div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100">
                <div class="mb-4">
                    <h3 class="text-lg font-bold text-gray-800">📈 Grafik KMS Digital - Rata-rata Pertumbuhan Balita</h3>
                    <p class="text-xs text-gray-400">Tren perubahan rata-rata berat badan (kg) dan tinggi badan (cm) dalam 6 bulan terakhir.</p>
                </div>
                
                <div class="relative h-80 w-full">
                    <canvas id="kmsChart"></canvas>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                    <h3 class="font-bold text-gray-700">Aktivitas Penimbangan Terbaru</h3>
                    <a href="{{ route('pemeriksaan.index') }}" class="text-sm text-blue-600 hover:underline font-semibold">Lihat Semua Riwayat &rarr;</a>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                <th class="p-3">Tanggal</th>
                                <th class="p-3">Nama Balita</th>
                                <th class="p-3">Berat</th>
                                <th class="p-3">Tinggi</th>
                                <th class="p-3">Catatan</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm">
                            @forelse($pemeriksaanTerbaru as $item)
                                <tr class="border-b border-gray-100 hover:bg-gray-50">
                                    <td class="p-3 font-medium">{{ \Carbon\Carbon::parse($item->tanggal_periksa)->format('d/m/Y') }}</td>
                                    <td class="p-3 font-bold text-gray-800">{{ $item->balita->nama_balita ?? 'Data Terhapus' }}</td>
                                    <td class="p-3"><span class="bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded text-xs">{{ $item->berat_badan }} kg</span></td>
                                    <td class="p-3"><span class="bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded text-xs">{{ $item->tinggi_badan }} cm</span></td>
                                    <td class="p-3 text-gray-400 italic text-xs">{{ $item->catatan ?: '-' }}</td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="5" class="p-6 text-center text-gray-400 italic">Belum ada aktivitas pemeriksaan terbaru.</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const ctx = document.getElementById('kmsChart').getContext('2d');
            
            new Chart(ctx, {
                type: 'line', // Jenis grafik garis
                data: {
                    // Mengambil label bulan dari Laravel Controller
                    labels: @json($bulanLabels),
                    datasets: [
                        {
                            label: 'Rata-rata Berat Badan (kg)',
                            data: @json($beratData),
                            borderColor: '#eab308', // Warna kuning emas
                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                            borderWidth: 3,
                            tension: 0.3, // Membuat garisnya melengkung halus
                            fill: true
                        },
                        {
                            label: 'Rata-rata Tinggi Badan (cm)',
                            data: @json($tinggiData),
                            borderColor: '#10b981', // Warna hijau emerald
                            backgroundColor: 'rgba(16, 185, 129, 0.05)',
                            borderWidth: 3,
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { font: { weight: 'bold' } }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: '#f3f4f6' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        });
    </script>
</x-app-layout>