<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProcessoRequest extends FormRequest
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
            'nome' => ['required', 'string', 'min:1', 'max:255'],
            'marca' => ['nullable', 'string', 'min:1', 'max:255'],
            'data_compra' => ['nullable', 'date'],
            'validade' => ['nullable', 'date'],
            'loja' => ['nullable', 'string', 'min:1', 'max:255'],
            'valor' => ['nullable', 'decimal:0,2', 'min:0.01', 'max:99999.99'],
            'observacoes' => ['nullable', 'string', 'min:1', 'max:255'],
            'quantidade_usos' => ['nullable', 'integer', 'min:0', 'max:99999'],
            'processo_etapas' => ['required', 'array'],
            'processo_etapas.*.nome' => ['required', 'string', 'min:1', 'max:255'],
            'processo_etapas.*.duracao' => ['required', 'integer', 'gt:0'],
            'processo_etapas.*.posicao' => ['required', 'integer', 'gt:0'],
        ];
    }
}
