<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Middleware\GetSanctumTokenFromCookies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('handleCityFromRequest')->group(function () {
  Route::get('/categories', [\App\Http\Controllers\Api\CategoryController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/profile/edit', [\App\Http\Controllers\Api\UserController::class, 'edit'])
        ->middleware('optimizeImages');
    Route::post('/profile/password/edit', [\App\Http\Controllers\Api\UserController::class, 'changePassword']);
});

Route::prefix('cart')->group(function () {
    Route::get('', [\App\Http\Controllers\Api\CartController::class, 'index']);

    Route::post('add', [\App\Http\Controllers\Api\CartController::class, 'addToCart']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
