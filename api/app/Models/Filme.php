<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filme extends Model
{
    /** @use HasFactory<\Database\Factories\FilmeFactory> */
    use HasFactory;

    protected $fillable = [
        'marca',
        'validade',
        'modelo',
        'iso',
        'data_compra',
        'loja',
        'valor',
        'observacoes',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
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
            return \Carbon\Carbon::parse($value)->format('Y-m-d H:i:s');
        } catch (\Exception $e) {
            return null; // Opcional: retorna nulo em caso de erro
        }
    }
}
