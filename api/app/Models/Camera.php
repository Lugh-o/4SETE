<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Camera extends Model
{
    /** @use HasFactory<\Database\Factories\CameraFactory> */
    use HasFactory;
    protected $fillable = [
        'marca',
        'modelo',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function revelacao()
    {
        return $this->hasMany(Revelacao::class);
    }
}
