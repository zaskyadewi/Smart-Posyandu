<?php if (isset($component)) { $__componentOriginal9ac128a9029c0e4701924bd2d73d7f54 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54 = $attributes; } ?>
<?php $component = App\View\Components\AppLayout::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('app-layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\AppLayout::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
     <?php $__env->slot('header', null, []); ?> 
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            <?php echo e(__('Dashboard Smart-Posyandu')); ?>

        </h2>
     <?php $__env->endSlot(); ?>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-600 flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-bold text-gray-800">Selamat Datang, <?php echo e(Auth::user()->name); ?>! 👋</h3>
                    <p class="text-sm text-gray-500 mt-1">Berikut adalah ringkasan data kesehatan balita di Posyandu Anda hari ini.</p>
                </div>
                <div class="hidden sm:block text-right">
                    <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full"><?php echo e(\Carbon\Carbon::now()->isoFormat('D MMMM Y')); ?></span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Balita</p>
                        <p class="text-3xl font-extrabold text-gray-800 mt-1"><?php echo e($totalBalita); ?> <span class="text-sm font-normal text-gray-500">Anak</span></p>
                    </div>
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-full text-xl font-bold">👶</div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Laki-laki</p>
                        <p class="text-3xl font-extrabold text-blue-600 mt-1"><?php echo e($totalLaki); ?> <span class="text-sm font-normal text-gray-500">Anak</span></p>
                    </div>
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-full text-xl font-bold">👦</div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Perempuan</p>
                        <p class="text-3xl font-extrabold text-pink-600 mt-1"><?php echo e($totalPerempuan); ?> <span class="text-sm font-normal text-gray-500">Anak</span></p>
                    </div>
                    <div class="p-3 bg-pink-50 text-pink-600 rounded-full text-xl font-bold">👧</div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Diperiksa Bulan Ini</p>
                        <p class="text-3xl font-extrabold text-emerald-600 mt-1"><?php echo e($pemeriksaanBulanIni); ?> <span class="text-sm font-normal text-gray-500">Kali</span></p>
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
                    <a href="<?php echo e(route('pemeriksaan.index')); ?>" class="text-sm text-blue-600 hover:underline font-semibold">Lihat Semua Riwayat &rarr;</a>
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
                            <?php $__empty_1 = true; $__currentLoopData = $pemeriksaanTerbaru; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                                <tr class="border-b border-gray-100 hover:bg-gray-50">
                                    <td class="p-3 font-medium"><?php echo e(\Carbon\Carbon::parse($item->tanggal_periksa)->format('d/m/Y')); ?></td>
                                    <td class="p-3 font-bold text-gray-800"><?php echo e($item->balita->nama_balita ?? 'Data Terhapus'); ?></td>
                                    <td class="p-3"><span class="bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded text-xs"><?php echo e($item->berat_badan); ?> kg</span></td>
                                    <td class="p-3"><span class="bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded text-xs"><?php echo e($item->tinggi_badan); ?> cm</span></td>
                                    <td class="p-3 text-gray-400 italic text-xs"><?php echo e($item->catatan ?: '-'); ?></td>
                                </tr>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                                <tr>
                                    <td colspan="5" class="p-6 text-center text-gray-400 italic">Belum ada aktivitas pemeriksaan terbaru.</td>
                                </tr>
                            <?php endif; ?>
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
                    labels: <?php echo json_encode($bulanLabels, 15, 512) ?>,
                    datasets: [
                        {
                            label: 'Rata-rata Berat Badan (kg)',
                            data: <?php echo json_encode($beratData, 15, 512) ?>,
                            borderColor: '#eab308', // Warna kuning emas
                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                            borderWidth: 3,
                            tension: 0.3, // Membuat garisnya melengkung halus
                            fill: true
                        },
                        {
                            label: 'Rata-rata Tinggi Badan (cm)',
                            data: <?php echo json_encode($tinggiData, 15, 512) ?>,
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
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54)): ?>
<?php $attributes = $__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54; ?>
<?php unset($__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal9ac128a9029c0e4701924bd2d73d7f54)): ?>
<?php $component = $__componentOriginal9ac128a9029c0e4701924bd2d73d7f54; ?>
<?php unset($__componentOriginal9ac128a9029c0e4701924bd2d73d7f54); ?>
<?php endif; ?><?php /**PATH C:\Users\donaf\Smart-Posyandu\resources\views/dashboard.blade.php ENDPATH**/ ?>