<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCameraRequest;
use App\Http\Requests\UpdateCameraRequest;
use App\Models\Camera;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CameraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $idUser =  auth('sanctum')->user()["id"];

        try {
            $cameras = Camera::where('user_id', $idUser)->get();
            return response()->json([
                'data' => $cameras
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
    public function store(StoreCameraRequest $request)
    {
        $data = $request->all();
        $idUser =  auth('sanctum')->user()["id"];

        try {
            $camera = new Camera();
            $camera->marca = $data["marca"];
            $camera->modelo = $data["modelo"];
            $camera->user_id = $idUser;

            $camera->save();

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
            $camera = Camera::findOrFail($id);
            return response()->json([
                'data' => $camera
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
     * Show the form for editing the specified resource.
     */
    public function edit(Camera $camera)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCameraRequest $request, $id)
    {
        try {

            $data = $request->all();
            $data['user_id'] = auth('sanctum')->user()["id"];

            $camera = Camera::findOrFail($id);

            $camera->update($data);

            return response()->json([], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Camera não encontrado'
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
            $camera = Camera::findOrFail($id);
            $camera->delete();

            return response()->json([
                'message' => 'Câmera deletada com sucesso'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Câmera não encontrada'
            ], 404);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Um erro ocorreu ao deleter a câmera'
            ], 500);
        }
    }
}
