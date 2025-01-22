<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revelacao extends Model
{
    /** @use HasFactory<\Database\Factories\RevelacaoFactory> */
    use HasFactory;
    protected $fillable = [
        'filme_id',
        'camera_id',
        'processo_id',
        'user_id'
    ];

    public function filme()
    {
        return $this->belongsTo(Filme::class);
    }

    public function camera()
    {
        return $this->belongsTo(Camera::class);
    }

    public function processo()
    {
        return $this->belongsTo(Processo::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function revelacaoEtapa()
    {
        return $this->hasMany(RevelacaoEtapa::class);
    }
}
