<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etapa extends Model
{
    /** @use HasFactory<\Database\Factories\EtapaFactory> */
    use HasFactory;
    protected $fillable = [
        'nome',
        'duracao',
        'processo_id',
        'posicao'
    ];

    public function processo()
    {
        return $this->belongsTo(Processo::class);
    }
}
