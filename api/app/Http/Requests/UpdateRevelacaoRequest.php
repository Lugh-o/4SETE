<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRevelacaoRequest extends FormRequest
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
            'filme_id' => ['required', 'integer'],
            'camera_id' => ['required', 'integer'],
            'processo_id' => ['required', 'integer'],
            'revelacao_etapas' => ['required', 'array'],
            'revelacao_etapas.*.nome' => ['required', 'string'],
            'revelacao_etapas.*.duracao' => ['required', 'integer'],
            'revelacao_etapas.*.posicao' => ['required', 'integer'],
        ];
    }
}
