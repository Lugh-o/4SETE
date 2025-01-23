<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevelacaoImagem extends Model
{
    use HasFactory;
    protected $fillable = [
        'nome',
        'imagem',
        'revelacao_id',
    ];

    public function revelacao()
    {
        return $this->belongsTo(Revelacao::class);
    }

}
