<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Api\CategoryController;
use App\Http\Resources\CategoryResource;
use App\Models\City;
use App\Models\ProductCategory;
use Cookie;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Str;
use Tightenco\Ziggy\Ziggy;
use App\Services\Cart\Service as CartService;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = "app";

  /**
   * Determine the current asset version.
   *
   * @param Request $request
   * @return string|null
   */
  public function version(Request $request)
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @param Request $request
   * @return mixed[]
   */
  public function share(Request $request)
  {
    $cart = null;
    $city = City::where("id", $request->get("city"))->first() ?? City::first();

    if (Cookie::has("cart")) {
      $cart = new CartService(Cookie::get("cart"));
    } else {
      $uuid = Str::uuid();
      $cookie = Cookie::forever(name: "cart", value: $uuid, httpOnly: true);

      Cookie::queue($cookie);

      $cart = new CartService($uuid);
    }

    return array_merge(parent::share($request), [
      "homeCategories" => json_decode(
        CategoryResource::collection(
          ProductCategory::getCategoriesWithProducts()
        )->toJson()
      ),
      "cart" => $cart->format($city),
      "auth" => [
        "user" => $request->user(),
      ],
      "ziggy" => function () use ($request) {
        return array_merge((new Ziggy())->toArray(), [
          "location" => $request->url(),
        ]);
      },
    ]);
  }
}
