<?php

namespace App\Http\Controllers;

use App\Models\ProcessoEtapa;

class ProcessoEtapaController extends Controller
{
    /**
     * Lista de etapas de um processo.
     */
    public function index($id)
    {
        try {
            $etapas = ProcessoEtapa::where('processo_id', $id)->get();
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
