<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Processo extends Model
{
    /** @use HasFactory<\Database\Factories\ProcessoFactory> */
    use HasFactory;
    protected $fillable = [
        'nome',
        'marca',
        'data_compra',
        'validade',
        'loja',
        'valor',
        'quantidade_usos',
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

    public function processoEtapa()
    {
        return $this->hasMany(ProcessoEtapa::class);
    }

    public function setValidadeAttribute($value)
    {
        $this->attributes['validade'] = $this->convertToMySQLDateTime($value);
    }

    public function setDataCompraAttribute($value)
    {
        $this->attributes['data_compra'] = $this->convertToMySQLDateTime($value);
    }

    private function convertToMySQLDateTime($value)
    {
        try {
            return \Carbon\Carbon::parse($value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null; // Opcional: retorna nulo em caso de erro
        }
    }
}
