<?php

namespace App\Http\Controllers\Api;

use App\DTO\AddToCartDTO;
use App\DTO\CalculatorDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddToCartRequest;
use App\Http\Requests\Cart\CalculateSingleItemCartRequest;
use App\Http\Requests\Installers\GetCartRequest;
use App\Http\Requests\RemoveItemFromCartRequest;
use App\Http\Requests\UpdateQuantityRequest;
use App\Http\Resources\CartResource;
use App\Models\City;
use App\Models\Product;
use App\Services\CalculatorService;
use Darryldecode\Cart\Cart;
use Darryldecode\Cart\CartCondition;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

use App\Services\Cart\Service as CartService;
use App\Services\Calculator\Service as CalculatorServiceDeprecated;

class CartController extends Controller
{
  protected $cart;

  public function __construct(Request $request)
  {
    $city = City::where("id", $request->get("city"))->first();

    if (!$city) {
      $city = City::first();
    }

    if (Cookie::has("cart")) {
      $this->cart = new CartService(Cookie::get("cart"), $city);
    } else {
      $uuid = Str::uuid();
      $cookie = Cookie::forever(name: "cart", value: $uuid, httpOnly: true);

      Cookie::queue($cookie);

      $this->cart = new CartService($uuid, $city);
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
      $images = null;

      $city = City::where("id", $request->get("city"))->firstOrFail();

      /** @var Product $product */
      $product = Product::with("images")->find($request->input("product_id"));

      if (!$product) {
        return response()->json(
          [
            "error" => "This product does'nt exists, please refresh page.",
          ],
          404
        );
      }

      if ($request->hasFile("files")) {
        $images = [];

        foreach ($request->file("files") as $file) {
          $path = $file->store("cart", "public");

          $images[] = $path;
        }
      }

      $addToCartDTO = new AddToCartDTO(
        $request->input("product_id"),
        $request->input("option_id"),
        $request->addons ?? [],
        $request->input("quantity"),
        $request->input("unit"),
        $request->input("width"),
        $request->input("height"),
        $request->input("size_id"),
        $images
      );

      $this->cart->add($addToCartDTO);

      // return \response()->json($this->cart->format($city));

      return back();
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

      return back();

      // return \response()->json($this->cart->format($city));
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

      return back();
      // return \response()->json($this->cart->format($city));
    } catch (ModelNotFoundException $e) {
      return back();

      // return response()->json(
      //   [
      //     "error" => "This product does'nt exists",
      //   ],
      //   404
      // );
    }
  }

  public function calculateSingle(
    CalculateSingleItemCartRequest $request,
    CalculatorService $calculatorService
  ) {
    try {
      $calculatorDto = new CalculatorDTO(
        $request->input("product_id"),
        $request->input("option_id"),
        $request->input("width"),
        $request->input("height"),
        $request->input("quantity"),
        $request->addons,
        $request->input("unit")
      );

      list($priceInCents, $priceInDollars) = $calculatorService->calculate(
        $calculatorDto
      );

      return response()->json(["price" => $priceInDollars]);
    } catch (\Exception $exception) {
      return response(["error" => $exception->getMessage()], 400);
    }
    //    $calculator = new CalculatorService(
    //      $request->input("product_id"),
    //      width: $request->input("width"),
    //      height: $request->input("height"),
    //      unit: $request->input("unit"),
    //      addons: $request->addons,
    //      selectedOptionID: $request->input("option_id"),
    //      quantity: $request->input("quantity")
    //    );
    //
    //    list($priceInCents, $priceInDollars) = $calculator->calculate();
    //
    //    return response()->json(["price" => $priceInDollars]);
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
