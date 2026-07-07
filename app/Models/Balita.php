<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Balita extends Model
{
    protected $guarded = [];
    // Menghubungkan bahwa 1 Balita memiliki banyak riwayat pemeriksaan
    public function pemeriksaans()
    {
        return $this->hasMany(Pemeriksaan::class);
    }
}
