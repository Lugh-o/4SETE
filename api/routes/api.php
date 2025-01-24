<?php

use App\Http\Controllers\CameraController;
use App\Http\Controllers\FilmeController;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\ProcessoEtapaController;
use App\Http\Controllers\RevelacaoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get('/user', function (Request $request) {
        try {
            return $request->user();
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    });

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

    Route::post("/logout", function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    });
});


Route::post("/login", function (Request $request) {
    $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
        'device_name' => ['required']
    ]);

    $user = User::where('email', $request->email)->first();
    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect']
        ]);
    }
    return response()->json([
        'token' => $user->createToken($request->device_name)->plainTextToken
    ]);
});

Route::post("/register", function (Request $request) {
    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'device_name' => ['required']
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    return response()->json([
        'token' => $user->createToken($request->device_name)->plainTextToken
    ]);
});
