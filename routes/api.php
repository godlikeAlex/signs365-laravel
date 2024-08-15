<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\OrdersController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\StripeWebHookController;
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

Route::post("webhook", [StripeWebHookController::class, "webhook"]);

Route::post("/product-request/{product}", [
  ContactController::class,
  "sendProductRequest",
]);

Route::post("/request/contacts", [ContactController::class, "requestContacts"]);

Route::middleware("handleCityFromRequest")->group(function () {
  Route::get("/categories", [
    \App\Http\Controllers\Api\CategoryController::class,
    "index",
  ]);

  Route::get("/shop/{product_category:slug}", [
    \App\Http\Controllers\Api\ShopController::class,
    "category",
  ]);

  Route::get("/shop/{product_category:slug}", [
    \App\Http\Controllers\Api\ShopController::class,
    "products",
  ]);

  Route::get("/shop/categories", [
    \App\Http\Controllers\Api\ShopController::class,
    "categories",
  ]);

  Route::prefix("cart")->group(function () {
    Route::get("", [\App\Http\Controllers\Api\CartController::class, "index"]);

    Route::post("calculate-single", [
      \App\Http\Controllers\Api\CartController::class,
      "calculateSingle",
    ]);

    Route::post("add", [
      \App\Http\Controllers\Api\CartController::class,
      "addToCart",
    ]);
    Route::post("update-quantity", [
      \App\Http\Controllers\Api\CartController::class,
      "updateQuantity",
    ]);
    Route::post("remove-item", [
      \App\Http\Controllers\Api\CartController::class,
      "removeItem",
    ]);
    Route::post("clear", [
      \App\Http\Controllers\Api\CartController::class,
      "clear",
    ]);
  });

  Route::post("payment-intent", [
    PaymentController::class,
    "createPaymentIntent",
  ]);

  Route::post("/temp-order/update/{temporary_order}", [
    PaymentController::class,
    "updateTempOrder",
  ]);

  Route::post("/checkout/update-order/{paymentIntentID}", [
    PaymentController::class,
    "updateCheckoutOrder",
  ]);

  Route::get("/payment-intent/retrive/{payment_intent_id}", [
    PaymentController::class,
    "retrivePayment",
  ]);
});

Route::middleware("handleCityFromRequest")
  ->prefix("products")
  ->group(function () {
    Route::get("{product}", [ProductController::class, "product"]);
  });

Route::middleware("auth:sanctum")->group(function () {
  Route::post("/profile/edit", [
    \App\Http\Controllers\Api\UserController::class,
    "edit",
  ])->middleware("optimizeImages");
  Route::post("/profile/password/edit", [
    \App\Http\Controllers\Api\UserController::class,
    "changePassword",
  ]);
  Route::get("/orders", [OrdersController::class, "list"]);

  Route::get("/order-item/{orderItemID}/images", [
    OrdersController::class,
    "getImagesOrderItem",
  ]);

  Route::post("/order-item/{orderItemID}/images/delete", [
    OrdersController::class,
    "orderItemImageDelete",
  ]);

  Route::post("/order-item/{orderItemID}/images/upload", [
    OrdersController::class,
    "orderItemImageUpload",
  ]);
});

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
  return $request->user();
});
