<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CameraController;
use App\Http\Controllers\FilmeController;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\ProcessoEtapaController;
use App\Http\Controllers\RevelacaoController;
use Illuminate\Support\Facades\Route;

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post("/logout", [AuthController::class, 'logout']);
    
    Route::get('/filmes', [FilmeController::class, 'index']);
    Route::post('/filmes', [FilmeController::class, 'store']);
    Route::get('/filmes/{id}', [FilmeController::class, 'show']);
    Route::delete('/filmes/{id}', [FilmeController::class, 'destroy']);
    Route::put('/filmes/{id}', [FilmeController::class, 'update']);

    Route::get('/processos', [ProcessoController::class, 'index']);
    Route::post('/processos', [ProcessoController::class, 'store']);
    Route::get('/processos/{id}', [ProcessoController::class, 'show']);
    Route::delete('/processos/{id}', [ProcessoController::class, 'destroy']);
    Route::put('/processos/{id}', [ProcessoController::class, 'update']);
    Route::put('/processos/{id}/increment', [ProcessoController::class, 'incrementTimesUsed']);

    Route::get('/revelacoes', [RevelacaoController::class, 'index']);
    Route::post('/revelacoes', [RevelacaoController::class, 'store']);
    Route::get('/revelacoes/{id}', [RevelacaoController::class, 'show']);
    Route::delete('/revelacoes/{id}', [RevelacaoController::class, 'destroy']);
    Route::put('/revelacoes/{id}', [RevelacaoController::class, 'update']);
    Route::put('/revelacoes/{id}/finish', [RevelacaoController::class, 'concluirRevelacao']);

    Route::get('/etapasProcesso/{id}', [ProcessoEtapaController::class, 'index']);

    Route::get('/cameras', [CameraController::class, 'index']);
    Route::post('/cameras', [CameraController::class, 'store']);
    Route::get('/cameras/{id}', [CameraController::class, 'show']);
    Route::delete('/cameras/{id}', [CameraController::class, 'destroy']);
    Route::put('/cameras/{id}', [CameraController::class, 'update']);

});


Route::post("/login", [AuthController::class, 'login']);
Route::post("/register", [AuthController::class, 'register']);
