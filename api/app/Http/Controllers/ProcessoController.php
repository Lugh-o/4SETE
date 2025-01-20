<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcessoRequest;
use App\Http\Requests\UpdateProcessoRequest;
use App\Models\Etapa;
use App\Models\Processo;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProcessoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $idUser =  auth('sanctum')->user()["id"];

        try {
            $processos = Processo::where('user_id', $idUser)->with('etapas')->get();
            return response()->json([
                'data' => $processos
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProcessoRequest $request)
    {
        $filteredData = $this->filterProcessoData($request);
        $idUser =  auth('sanctum')->user()["id"];

        try {
            $processo = new Processo();
            $processo->nome = $filteredData['processo']["nome"];
            $processo->marca = $filteredData['processo']["marca"];
            $processo->data_compra = $filteredData['processo']["data_compra"];
            $processo->validade = $filteredData['processo']["validade"];
            $processo->loja = $filteredData['processo']["loja"];
            $processo->valor = $filteredData['processo']["valor"];
            $processo->quantidade_usos = $filteredData['processo']["quantidade_usos"];
            $processo->user_id = $idUser;
            $processo->save();

            $this->syncSteps($processo, $filteredData['etapas']);

            return response()->json([], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $processo = Processo::findOrFail($id);
            return response()->json([
                'data' => $processo
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Processo não encontrado'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProcessoRequest $request, $id)
    {
        try {
            $filteredData = $this->filterProcessoData($request);
            $filteredData['user_id'] = auth('sanctum')->user()["id"];

            $processo = Processo::findOrFail($id);

            $processo->update($filteredData);
            $this->syncSteps($processo, $filteredData['steps']);

            return response()->json([], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Processo não encontrado'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Processo $id)
    {
        try {
            $filme = Processo::findOrFail($id);
            $filme->delete();

            return response()->json([
                'message' => 'Processo deletado com sucesso'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Processo não encontrado'
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Um erro ocorreu ao deleter o processo'
            ], 500);
        }
    }

    private function filterProcessoData(Request $request)
    {
        $data = $request->only([
            'nome',
            'marca',
            'data_compra',
            'validade',
            'loja',
            'valor',
            'quantidade_usos',
            'user_id',
            'etapas'
        ]);

        $etapas = collect($data['etapas'] ?? [])->map(fn($p) => array_intersect_key($p, array_flip(['nome', 'duracao', 'posicao', 'processo_id'])));
        return ['processo' => $data, 'etapas' => $etapas];
    }

    private function syncSteps(Processo $processo, $etapas)
    {
        $currentEtapasIds = $processo->etapas->pluck('id')->toArray();
        $updatedEtapasIds = $etapas->pluck('id')->toArray();
        $etapasToDelete = array_diff($currentEtapasIds, $updatedEtapasIds);

        Etapa::whereIn('id', $etapasToDelete)->delete();
        foreach ($etapas as $etapa) {
            if (isset($etapa['id']) && in_array($etapa['id'], $currentEtapasIds)) {
                Etapa::find($etapa['id'])->update($etapa);
            } else {
                $novaEtapa = new Etapa();
                $novaEtapa->nome = $etapa['nome'];
                $novaEtapa->duracao = $etapa['duracao'];
                $novaEtapa->posicao = $etapa['posicao'];
                $novaEtapa->processo_id = $processo['id'];
                $novaEtapa->save();
            }
        }
    }
}
