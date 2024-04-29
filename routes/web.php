<?php

use App\Http\Controllers\Inertia\CartController;
use App\Http\Controllers\Inertia\HomeController;
use App\Http\Controllers\Inertia\ProfileController as InertiaProfileController;
use App\Http\Controllers\Inertia\ShopController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeWebHookController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;
use App\Services\Thumbnail\Service as Thumbnail;
use Inertia\Inertia;

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

Route::get("", [HomeController::class, "index"])->name("home");

Route::get("/shop/category/{product_category:slug}", [
  ShopController::class,
  "index",
]);

Route::get("/shop/product/{product}", [ShopController::class, "product"]);

Route::get("/cart", [CartController::class, "renderCart"]);
Route::post("/cart/toggle-with-installation", [
  CartController::class,
  "toggleExtraInstallation",
]);
Route::get("/checkout/success-payment", [
  CartController::class,
  "renderSuccess",
]);
Route::get("/checkout", [CartController::class, "renderCheckout"]);

Route::get("login", [
  \App\Http\Controllers\Inertia\AuthController::class,
  "indexLogin",
]);
Route::post("login", [
  \App\Http\Controllers\Inertia\AuthController::class,
  "login",
]);

Route::get("register", [
  \App\Http\Controllers\Inertia\AuthController::class,
  "indexRegister",
]);
Route::post("register", [
  \App\Http\Controllers\Inertia\AuthController::class,
  "register",
]);

Route::get("profile", [
  InertiaProfileController::class,
  "indexProfile",
])->middleware("auth:sanctum");

Route::middleware("auth:sanctum")->group(function () {
  Route::get("profile", [InertiaProfileController::class, "indexProfile"]);
  Route::get("profile/edit", [InertiaProfileController::class, "edit"]);

  // Route::post("/profile/edit", [
  //   \App\Http\Controllers\Api\UserController::class,
  //   "edit",
  // ])->middleware("optimizeImages");
});

Route::post("logout", [
  \App\Http\Controllers\Inertia\AuthController::class,
  "logout",
]);

Route::get("/test/images", function () {
  $product = Product::first();

  foreach (Product::all() as $product) {
    foreach ($product->images as $image) {
      $thumbnail = new Thumbnail($image->path);

      $path = $thumbnail->generate(348, 348, 55);

      // $image->path_thumb = $path;
      // $image->save();
    }
  }
});

// Route::post("forgot", [
//   \App\Http\Controllers\Api\ForgotPassword::class,
//   "forgot",
// ]);
// Route::post("reset-password", [
//   \App\Http\Controllers\Api\ForgotPassword::class,
//   "reset",
// ]);

// Route::get("/{reactRoutes?}", function ($city = null) {
//   return view("app"); // your start view
// })
//   ->withoutMiddleware(["web"])
//   ->name("react-app")
//   ->where("reactRoutes", '^((?!admin).)*$')
//   ->where("reactRoutes", '^((?!api).)*$')
//   ->middleware(["redirectUserToCity"]); // except 'api' word
