<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConcludeRevelacaoRequest;
use App\Http\Requests\StoreRevelacaoRequest;
use App\Http\Requests\UpdateRevelacaoRequest;
use App\Models\Camera;
use App\Models\Filme;
use App\Models\Processo;
use App\Models\RevelacaoEtapa;
use App\Models\Revelacao;
use App\Models\RevelacaoImagem;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class RevelacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId =  auth('sanctum')->user()["id"];

        try {

            $revelacoes = Revelacao::where('user_id', $userId)->get();
            $revelacoesCurated = [];
            foreach ($revelacoes as $revelacao) {

                $filme = Filme::where('id', $revelacao['filme_id'])->get();
                $processo = Processo::where('id', $revelacao['processo_id'])->with('processoEtapa')->get();
                $camera = Camera::where('id', $revelacao['camera_id'])->get();
                $etapas = RevelacaoEtapa::where('revelacao_id', $revelacao['id'])->get();
                $revelacaoCurated = ['id' => $revelacao['id'], 'user_id' => $revelacao['user_id'], 'filme' => $filme, 'camera' => $camera, 'processo' => $processo, 'revelacao_etapas' => $etapas];

                $revelacoesCurated[] = $revelacaoCurated;
            }

            return response()->json([
                'data' => $revelacoesCurated
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
    public function store(StoreRevelacaoRequest $request)
    {
        $filteredData = $this->filterRevelacaoData($request);
        $userId =  auth('sanctum')->user()["id"];

        try {
            $revelacao = new Revelacao();
            $revelacao->filme_id = $filteredData['revelacao']["filme_id"];
            $revelacao->camera_id = $filteredData['revelacao']["camera_id"];
            $revelacao->processo_id = $filteredData['revelacao']["processo_id"];
            $revelacao->user_id = $userId;
            $revelacao->foi_concluida = false;
            $revelacao->save();

            $this->syncSteps($revelacao, $filteredData['revelacao_etapas']);

            return response()->json([
                'data' => $revelacao
            ], 201);
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
            $revelacao = Revelacao::findOrFail($id);
            return response()->json([
                'data' => $revelacao
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Revelação não encontrada'
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
    public function update(UpdateRevelacaoRequest $request, $id)
    {
        try {

            $filteredData = $this->filterRevelacaoData($request);
            $filteredData['user_id'] = auth('sanctum')->user()["id"];

            $revelacao = Revelacao::findOrFail($id);

            $revelacao->update($filteredData['revelacao']);
            $this->syncSteps($revelacao, $filteredData['revelacao_etapas']);

            return response()->json([], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Revelação não encontrada'
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
    public function destroy($id)
    {
        try {
            $revelacao = Revelacao::findOrFail($id);
            $revelacao->delete();

            return response()->json([
                'message' => 'Revelacao deletada com sucesso'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Revelacao não encontrada'
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Um erro ocorreu ao deleter a revelação'
            ], 500);
        }
    }

    private function filterRevelacaoData(Request $request)
    {
        $data = $request->only([
            'filme_id',
            'camera_id',
            'processo_id',
            'user_id',
            'revelacao_etapas'
        ]);

        $etapas = collect($data['revelacao_etapas'] ?? [])->map(fn($p) => array_intersect_key($p, array_flip(['nome', 'duracao', 'posicao', 'revelacao_id'])));
        return ['revelacao' => $data, 'revelacao_etapas' => $etapas];
    }

    private function syncSteps(Revelacao $revelacao, $etapas)
    {
        $currentEtapasIds = $revelacao->revelacaoEtapa->pluck('id')->toArray();
        $updatedEtapasIds = $etapas->pluck('id')->toArray();
        $etapasToDelete = array_diff($currentEtapasIds, $updatedEtapasIds);

        RevelacaoEtapa::whereIn('id', $etapasToDelete)->delete();
        foreach ($etapas as $etapa) {
            if (isset($etapa['id']) && in_array($etapa['id'], $currentEtapasIds)) {
                RevelacaoEtapa::find($etapa['id'])->update($etapa);
            } else {
                $novaEtapa = new RevelacaoEtapa();
                $novaEtapa->nome = $etapa['nome'];
                $novaEtapa->duracao = $etapa['duracao'];
                $novaEtapa->posicao = $etapa['posicao'];
                $novaEtapa->revelacao_id = $revelacao['id'];
                $novaEtapa->save();
            }
        }
    }

    public function concluirRevelacao($idRevelacao, ConcludeRevelacaoRequest $request)
    {
        try {
            $payload = $request->only(['imagens', 'observacoes']);
            $revelacao = Revelacao::findOrFail($idRevelacao);
            $revelacao->foi_concluida = true;
            $revelacao->observacoes = $payload['observacoes'];
            $revelacao->update(array($revelacao));

            foreach ($payload['imagens'] as $imagem) {
                $novaImagem = new RevelacaoImagem();
                $novaImagem->imagem = $imagem['base64'];
                $novaImagem->nome = $imagem['filename'];
                $novaImagem->revelacao_id = $idRevelacao;
                $novaImagem->save();
            }

            return response()->json([], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Revelação não encontrada'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
