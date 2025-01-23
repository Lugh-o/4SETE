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
            'marca' => ['nullable', 'string'],
            'data_compra' => ['nullable', 'date'],
            'validade' => ['nullable', 'date'],
            'loja' => ['nullable', 'string'],
            'valor' => ['nullable', 'string'],
            'observacoes' => ['nullable', 'string'],
            'quantidade_usos' => ['nullable', 'integer'],
            'processo_etapas' => ['required', 'array'],
            'processo_etapas.*.nome' => ['required', 'string'],
            'processo_etapas.*.duracao' => ['required', 'integer'],
            'processo_etapas.*.posicao' => ['required', 'integer'],
        ];
    }
}
