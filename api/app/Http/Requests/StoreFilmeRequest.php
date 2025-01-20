<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFilmeRequest extends FormRequest
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
            'marca' => ['required', 'string'],
            'validade' => ['required', 'date'],
            'modelo' => ['required', 'string'],
            'iso' => ['required', 'integer'],
            'data_compra' => ['required', 'date'],
            'loja' => ['required', 'string'],
            'valor' => ['required', 'string'],
            'observacoes' => ['required', 'string'],
        ];
    }
}
