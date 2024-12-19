<?php

use App\Http\Controllers\Auth\PasswordResetLinkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post("/test-csrf", fn() => [1, 2, 3]);

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

// NAO CONSEGUI INSTALAR O BREEZE A PROXIMA PARTE SÓ DEPOIS DE INSTALAR ELE
Route::post("/forgot-password", [PasswordResetLinkController::class, 'store']);
