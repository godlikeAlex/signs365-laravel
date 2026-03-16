<?php

namespace App\Http\Controllers\Api\Estimate;

use App\DTO\Estimate\AddToEstimateCartDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Estimate\AddToEstimateCartRequest;
use App\Http\Requests\Estimate\CalculateSingleEstimateRequest;
use App\Models\Product;
use App\Services\Estimate\CalculatorService;
use App\Services\Estimate\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

class CartController extends Controller
{
  private CartService $cart;

  public function __construct(Request $request)
  {
    if (Cookie::has("cart_estimate")) {
      $this->cart = new CartService(Cookie::get("cart_estimate"));
      return;
    }

    $uuid = Str::uuid()->toString();

    Cookie::queue(
      Cookie::forever(name: "cart_estimate", value: $uuid, httpOnly: true)
    );

    $this->cart = new CartService($uuid);
  }

  public function index()
  {
    return response()->json($this->cart->format());
  }

  public function calculateSingle(
    CalculateSingleEstimateRequest $request,
    CalculatorService $calculatorService
  ) {
    $data = $request->validated();

    try {
      [, $priceInDollars] = $calculatorService->calculate(
        productID: (int) $data["product_id"],
        estimateFormID: (int) $data["estimate_form_id"],
        width: (float) $data["width"],
        height: (float) $data["height"],
        quantity: (int) $data["quantity"],
        fields: $data["fields"] ?? [],
        unit: $data["unit"] ?? "inches"
      );

      return response()->json(["price" => $priceInDollars]);
    } catch (\Exception $exception) {
      return response()->json(["error" => $exception->getMessage()], 400);
    }
  }

  public function add(
    AddToEstimateCartRequest $request,
    CalculatorService $calculatorService
  ) {
    $data = $request->validated();

    $product = Product::query()->find($data["product_id"]);

    if (!$product || !$product->is_estimate) {
      return response()->json(
        [
          "error" => "Estimate product not found.",
        ],
        404
      );
    }

    $form = $product
      ->estimateForms()
      ->wherePivot("is_active", true)
      ->find($data["estimate_form_id"]);

    if (!$form) {
      return response()->json(
        [
          "error" => "Estimate form not found.",
        ],
        404
      );
    }

    [
      $priceInCents,
      $priceInDollars,
      $shippingPrice,
      $calculatedFields,
    ] = $calculatorService->calculate(
      productID: (int) $data["product_id"],
      estimateFormID: (int) $data["estimate_form_id"],
      width: (float) $data["width"],
      height: (float) $data["height"],
      quantity: (int) $data["quantity"],
      fields: $data["fields"] ?? [],
      unit: $data["unit"] ?? "inches",
      priceWithoutQuantity: true
    );

    $this->cart->add(
      new AddToEstimateCartDTO(
        productID: $product->id,
        formID: $form->id,
        title: $product->title,
        quantity: $data["quantity"],
        price: $priceInCents,
        payload: array_merge($data["payload"] ?? [], [
          "estimate_form_id" => $form->id,
          "form_type" => $form->type?->value,
          "unit" => $data["unit"] ?? "inches",
          "width" => (float) $data["width"],
          "height" => (float) $data["height"],
          "selected_fields" => $data["fields"] ?? [],
          "server_price_dollars" => $priceInDollars,
          "shipping_price_cents" => $shippingPrice,
          "calculated_field_ids" => collect($calculatedFields)
            ->map(
              fn($item) => $item["option_id"] ?? ($item["field_id"] ?? null)
            )
            ->filter()
            ->values()
            ->all(),
        ])
      )
    );

    return response()->json($this->cart->format());
  }

  public function updateQuantity(Request $request)
  {
    $data = $request->validate([
      "item_id" => ["required", "string"],
      "type" => ["required", "in:add,reduce"],
    ]);

    if ($data["type"] === "add") {
      $this->cart->addQuantity($data["item_id"]);
    } else {
      $this->cart->reduceQuantity($data["item_id"]);
    }

    return response()->json($this->cart->format());
  }

  public function removeItem(Request $request)
  {
    $data = $request->validate([
      "item_id" => ["required", "string"],
    ]);

    $this->cart->removeItem($data["item_id"]);

    return response()->json($this->cart->format());
  }

  public function clear()
  {
    $this->cart->clear();

    return response()->json(["ok" => true]);
  }
}
