<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFilmeRequest;
use App\Http\Requests\UpdateFilmeRequest;
use App\Models\Filme;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FilmeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $idUser =  auth('sanctum')->user()["id"];

        try {
            $filmes = Filme::where('user_id', $idUser)->get();
            return response()->json([
                'data' => $filmes
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
    public function store(StoreFilmeRequest $request)
    {
        $data = $request->all();
        $idUser =  auth('sanctum')->user()["id"];

        try {
            $filme = new Filme();
            $filme->marca = $data["marca"];
            $filme->validade = $data["validade"];
            $filme->modelo = $data["modelo"];
            $filme->iso = $data["iso"];
            $filme->data_compra = $data["data_compra"];
            $filme->loja = $data["loja"];
            $filme->valor = $data["valor"];
            $filme->observacoes = $data["observacoes"];
            $filme->user_id = $idUser;
            $filme->save();

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
            $filme = Filme::findOrFail($id);
            return response()->json([
                'data' => $filme
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Filme não encontrado'
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
    public function update(UpdateFilmeRequest $request, $id)
    {
        try {
            $data = $request->all();
            $data['user_id'] = auth('sanctum')->user()["id"];

            $filme = Filme::findOrFail($id);

            $filme->update($data);

            return response()->json([], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Filme não encontrado'
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
            $filme = Filme::findOrFail($id);
            $filme->delete();

            return response()->json([
                'message' => 'Filme deletado com sucesso'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Filme não encontrado'
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Um erro ocorreu ao deleter o filme'
            ], 500);
        }
    }
}
