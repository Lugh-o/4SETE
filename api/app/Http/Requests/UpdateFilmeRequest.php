<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFilmeRequest extends FormRequest
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
            'marca' => ['required', 'string', 'min:1', 'max:255'],
            'validade' => ['nullable', 'date'],
            'modelo' => ['required', 'string', 'min:1', 'max:255'],
            'iso' => ['required', 'integer', 'min:0.01', 'max:99999.99'],
            'data_compra' => ['nullable', 'date'],
            'loja' => ['nullable', 'string', 'min:1', 'max:255'],
            'valor' => ['nullable', 'decimal:0,2', 'min:0.01', 'max:99999.99'],
            'observacoes' => ['nullable', 'string', 'min:1', 'max:255'],
        ];
    }
}
