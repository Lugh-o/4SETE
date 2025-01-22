<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProcessoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => ['required', 'string'],
            'marca' => ['required', 'string'],
            'data_compra' => ['required', 'date'],
            'validade' => ['required', 'date'],
            'loja' => ['required', 'string'],
            'valor' => ['required', 'string'],
            'quantidade_usos' => ['required', 'integer'],
            'processo_etapas' => ['required', 'array'],
            'processo_etapas.*.nome' => ['required', 'string'],
            'processo_etapas.*.duracao' => ['required', 'integer'],
            'processo_etapas.*.posicao' => ['required', 'integer'],
        ];
    }
}
