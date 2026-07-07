<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pemeriksaans', function (Blueprint $table) {
            $table->id();
            // Menghubungkan pemeriksaan dengan ID Balita (Relasi Database)
            $table->foreignId('balita_id')->constrained('balitas')->onDelete('cascade');
            
            $table->date('tanggal_periksa');
            $table->float('berat_badan'); // Menyimpan desimal, misal: 10.5 kg
            $table->float('tinggi_badan'); // Menyimpan desimal, misal: 75.2 cm
            $table->string('catatan')->nullable(); // Misal: "Diberi Vitamin A" / "Imunisasi Campak"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaans');
    }
};
