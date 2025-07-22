<?php

namespace App\Exceptions;

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Resources\CategoryResource;
use App\Models\City;
use App\Models\ProductCategory;
use Config;
use Cookie;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;
use Laravel\Jetstream\Http\Middleware\ShareInsertiaData;
use Str;
use Tightenco\Ziggy\Ziggy;
use App\Services\Cart\Service as CartService;

class Handler extends ExceptionHandler
{
  /**
   * A list of the exception types that are not reported.
   *
   * @var array<int, class-string<Throwable>>
   */
  protected $dontReport = [
    //
  ];

  /**
   * A list of the inputs that are never flashed for validation exceptions.
   *
   * @var array<int, string>
   */
  protected $dontFlash = [
    "current_password",
    "password",
    "password_confirmation",
  ];

  /**
   * Register the exception handling callbacks for the application.
   *
   * @return void
   */
  public function register()
  {
    $this->reportable(function (Throwable $e) {
      //
    });
  }

  /**
   * Prepare exception for rendering.
   *
   * @param  \Throwable  $e
   * @return \Throwable
   */
  public function render($request, Throwable $e)
  {
    $response = parent::render($request, $e);

    if (Config::get("app.debug")) {
      return $response;
    }

    if (
      // !app()->environment(["local", "testing"]) &&
      in_array($response->status(), [500, 503, 404, 403])
    ) {
      // (new ShareInertiaData())->handle($request, fn() => null);
      // Inertia::share((new HandleInertiaRequests())->share($request));

      $geoInfo = geoip($request->ip());

      if ($geoInfo->country === "United States") {
        $currentCity = $geoInfo->state_name;
      } else {
        $currentCity = "New York";
      }

      return Inertia::render("Error", ["status" => $response->status()])
        ->with([
          "homeCategories" => json_decode(
            CategoryResource::collection(
              ProductCategory::getCategoriesWithProducts()
            )->toJson()
          ),
          "cart" => ["items" => []],
          "auth" => [
            "user" => $request->user(),
          ],
          "currentCity" => $currentCity,
        ])
        ->toResponse($request)
        ->setStatusCode($response->status());
    } elseif ($response->status() === 419) {
      return back()->with([
        "message" => "The page expired, please try again.",
      ]);
    }

    return $response;
  }
}
