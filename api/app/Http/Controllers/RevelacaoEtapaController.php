<?php

namespace App\Http\Controllers;

use App\Models\RevelacaoEtapa;

class EtapaRevelacaoController extends Controller
{
    /**
     * Lista de etapas de uma revelacao.
     */
    public function index($id)
    {
        try {
            $etapas = RevelacaoEtapa::where('revelacao_id', $id)->get();
            return response()->json([
                'data' => $etapas
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
