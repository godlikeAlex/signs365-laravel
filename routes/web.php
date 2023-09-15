<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeWebHookController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

$DOMAIN = env("APP_DOMAIN");

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::post('login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

Route::prefix("api/auth")->group(function () {
  Route::post("login", [
    \App\Http\Controllers\Api\AuthController::class,
    "login",
  ]);
  Route::post("register", [
    \App\Http\Controllers\Api\AuthController::class,
    "register",
  ]);
  Route::post("logout", [
    \App\Http\Controllers\Api\AuthController::class,
    "logout",
  ]);

  Route::post("forgot", [
    \App\Http\Controllers\Api\ForgotPassword::class,
    "forgot",
  ]);
  Route::post("reset-password", [
    \App\Http\Controllers\Api\ForgotPassword::class,
    "reset",
  ]);
});

Route::get("/{reactRoutes?}", function ($city = null) {
  return view("app"); // your start view
})
  ->withoutMiddleware(["web"])
  ->name("react-app")
  ->where("reactRoutes", '^((?!admin).)*$')
  ->where("reactRoutes", '^((?!api).)*$')
  ->middleware(["redirectUserToCity"]); // except 'api' word
