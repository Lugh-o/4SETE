<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRevelacaoRequest;
use App\Http\Requests\UpdateRevelacaoRequest;
use App\Models\Revelacao;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RevelacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $idUser =  auth('sanctum')->user()["id"];

        try {
            $revelacoes = Revelacao::where('user_id', $idUser)->get();
            return response()->json([
                'data' => $revelacoes
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRevelacaoRequest $request)
    {
        $data = $request->all();

        try {
            $revelacao = new Revelacao();
            $revelacao->filme_id = $data["filme_id"];
            $revelacao->camera_id = $data["camera_id"];
            $revelacao->processo_id = $data["processo_id"];
            $revelacao->save();

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
     * Show the form for editing the specified resource.
     */
    public function edit(Revelacao $revelacao)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRevelacaoRequest $request, $id)
    {
        try {

            $data = $request->all();
            $data['user_id'] = auth('sanctum')->user()["id"];

            $revelacao = Revelacao::findOrFail($id);

            $revelacao->update($data);

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
}
