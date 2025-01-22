<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevelacaoEtapa extends Model
{
    /** @use HasFactory<\Database\Factories\EtapaRevelacaoFactory> */
    use HasFactory;
    protected $fillable = [
        'nome',
        'duracao',
        'revelacao_id',
        'posicao'
    ];

    public function revelacao()
    {
        return $this->belongsTo(Revelacao::class);
    }
}
