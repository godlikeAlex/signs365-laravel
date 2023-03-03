<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddToCartRequest;
use App\Http\Requests\Installers\GetCartRequest;
use App\Http\Requests\RemoveItemFromCartRequest;
use App\Http\Requests\UpdateQuantityRequest;
use App\Http\Resources\CartResource;
use App\Models\City;
use App\Models\Product;
use Darryldecode\Cart\Cart;
use Darryldecode\Cart\CartCondition;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

use App\Services\Cart\Service as CartService;

class CartController extends Controller
{
  protected $cart;

  public function __construct(Request $request)
  {
    if (Cookie::has("cart")) {
      $this->cart = new CartService(Cookie::get("cart"));
    } else {
      $uuid = Str::uuid();
      $cookie = Cookie::forever(name: "cart", value: $uuid, httpOnly: true);

      Cookie::queue($cookie);

      $this->cart = new CartService($uuid);
    }
  }

  /**
   * Display a listing of the resource.
   *
   */
  public function index(GetCartRequest $request)
  {
    try {
      // Request get city from middleware.
      $city = City::where("id", $request->get("city"))->firstOrFail();

      return \response()->json($this->cart->format($city));
    } catch (ModelNotFoundException $e) {
      return response()->json(
        [
          "error" => "This cart does'nt exists",
          "throwed_by" => $e,
        ],
        404
      );
    }
  }

  /**
   * Add to cart
   *
   */
  public function addToCart(AddToCartRequest $request)
  {
    try {
      $data = $request->validated();

      $city = City::where("id", $request->get("city"))->firstOrFail();

      info($city->products);
      info($data);

      /** @var Product $product */
      $product = $city->products()->find($data["product_id"]);

      if (!$product) {
        return response()->json(
          [
            "error" => "This product does'nt exists in {$city->domain}",
          ],
          404
        );
      }

      $this->cart->add(
        $product,
        $request->input("product_variant_id"),
        $city->id
      );

      return \response()->json($this->cart->format($city));
    } catch (ModelNotFoundException $e) {
      return response()->json(
        [
          "error" => "This product does'nt exists",
        ],
        404
      );
    }
  }

  /**
   * Update Quantity
   *
   * @param int $id
   * @return Response
   */
  public function updateQuantity(UpdateQuantityRequest $request)
  {
    try {
      $city = City::where("id", $request->get("city"))->firstOrFail();

      if ($request->input("type") === "add") {
        $this->cart->addQuantity($request->input("item_id"));
      } else {
        $this->cart->reduceQuantity($request->input("item_id"));
      }

      return \response()->json($this->cart->format($city));
    } catch (ModelNotFoundException $e) {
      return response()->json(
        [
          "error" => "This product does'nt exists",
        ],
        404
      );
    }
  }

  /**
   * Remove item from cart.
   *
   * @return Response
   */
  public function removeItem(RemoveItemFromCartRequest $request)
  {
    try {
      $city = City::where("id", $request->get("city"))->firstOrFail();

      $this->cart->removeItem($request->input("item_id"));

      return \response()->json($this->cart->format($city));
    } catch (ModelNotFoundException $e) {
      return response()->json(
        [
          "error" => "This product does'nt exists",
        ],
        404
      );
    }
  }

  /**
   * Destroy the cart.
   *
   * @return Response
   */
  public function clear()
  {
    $this->cart->instance()->clear();

    return response()->json(["ok" => true]);
  }
}
