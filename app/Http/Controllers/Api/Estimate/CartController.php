<?php

namespace App\Http\Controllers\Api\Estimate;

use App\DTO\Estimate\AddToEstimateCartDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Estimate\AddBundleToEstimateCartRequest;
use App\Http\Requests\Estimate\AddToEstimateCartRequest;
use App\Http\Requests\Estimate\CalculateBundleEstimateRequest;
use App\Http\Requests\Estimate\CalculateSingleEstimateRequest;
use App\Http\Requests\Estimate\SubmitEstimateRequest;
use App\Mail\EstimateRequestAdmin;
use App\Mail\EstimateRequestReceived;
use App\Models\Product;
use App\Services\Estimate\CalculatorService;
use App\Services\Estimate\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
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
        formIDs: [$form->id],
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

  public function calculateBundle(
    CalculateBundleEstimateRequest $request,
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

    $selectedFormIDs = collect($data["selected_form_ids"] ?? [])
      ->map(fn($id) => (int) $id)
      ->filter(fn($id) => $id > 0)
      ->unique()
      ->values();

    $availableForms = $product
      ->estimateForms()

      ->whereIn("estimate_forms.id", $selectedFormIDs)
      ->get(["estimate_forms.id"]);

    if ($availableForms->count() !== $selectedFormIDs->count()) {
      return response()->json(
        [
          "error" => "One or more estimate forms are invalid.",
        ],
        422
      );
    }

    try {
      [, $priceInDollars, , , $breakdown] = $calculatorService->calculateBundle(
        productID: (int) $data["product_id"],
        selectedFormIDs: $selectedFormIDs->all(),
        width: (float) $data["width"],
        height: (float) $data["height"],
        quantity: (int) $data["quantity"],
        fieldsByForm: $data["fields_by_form"] ?? [],
        unit: $data["unit"] ?? "inches"
      );

      return response()->json([
        "price" => $priceInDollars,
        "breakdown" => $breakdown,
      ]);
    } catch (\Exception $exception) {
      return response()->json(["error" => $exception->getMessage()], 400);
    }
  }

  public function addBundle(
    AddBundleToEstimateCartRequest $request,
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

    $selectedFormIDs = collect($data["selected_form_ids"] ?? [])
      ->map(fn($id) => (int) $id)
      ->filter(fn($id) => $id > 0)
      ->unique()
      ->values();

    $forms = $product
      ->estimateForms()
      ->whereIn("estimate_forms.id", $selectedFormIDs)
      ->get(["estimate_forms.id", "estimate_forms.type"]);

    if ($forms->count() !== $selectedFormIDs->count()) {
      return response()->json(
        [
          "error" => "One or more estimate forms are invalid.",
        ],
        422
      );
    }

    [
      $priceWithoutQtyInCents,
      $priceWithoutQtyInDollars,
      $shippingPrice,
      $calculatedFields,
      $breakdownWithoutQty,
    ] = $calculatorService->calculateBundle(
      productID: (int) $data["product_id"],
      selectedFormIDs: $selectedFormIDs->all(),
      width: (float) $data["width"],
      height: (float) $data["height"],
      quantity: (int) $data["quantity"],
      fieldsByForm: $data["fields_by_form"] ?? [],
      unit: $data["unit"] ?? "inches",
      priceWithoutQuantity: true
    );

    [
      $lineTotalInCents,
      $lineTotalInDollars,
    ] = $calculatorService->calculateBundle(
      productID: (int) $data["product_id"],
      selectedFormIDs: $selectedFormIDs->all(),
      width: (float) $data["width"],
      height: (float) $data["height"],
      quantity: (int) $data["quantity"],
      fieldsByForm: $data["fields_by_form"] ?? [],
      unit: $data["unit"] ?? "inches",
      priceWithoutQuantity: false
    );

    $this->cart->add(
      new AddToEstimateCartDTO(
        productID: $product->id,
        formID: null,
        formIDs: $selectedFormIDs->all(),
        title: $product->title,
        quantity: (int) $data["quantity"],
        price: (int) $priceWithoutQtyInCents,
        payload: [
          "estimate_form_ids" => $selectedFormIDs->all(),
          "form_types" => $forms
            ->mapWithKeys(fn($form) => [$form->id => $form->type?->value])
            ->all(),
          "is_bundle" => true,
          "unit" => $data["unit"] ?? "inches",
          "width" => (float) $data["width"],
          "height" => (float) $data["height"],
          "selected_fields_by_form" => $data["fields_by_form"] ?? [],
          "server_price_dollars" => $priceWithoutQtyInDollars,
          "line_total_dollars" => $lineTotalInDollars,
          "line_total_cents" => (int) $lineTotalInCents,
          "shipping_price_cents" => $shippingPrice,
          "breakdown" => $breakdownWithoutQty,
          "calculated_field_ids_by_form" => collect($calculatedFields)
            ->map(function ($formFields) {
              return [
                "estimate_form_id" => $formFields["estimate_form_id"] ?? null,
                "ids" => collect($formFields["fields"] ?? [])
                  ->map(
                    fn($item) => $item["option_id"] ??
                      ($item["field_id"] ?? null)
                  )
                  ->filter()
                  ->values()
                  ->all(),
              ];
            })
            ->values()
            ->all(),
        ]
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

  public function submit(SubmitEstimateRequest $request)
  {
    $cart = $this->cart->format();
    $requestID = str_pad((string) random_int(0, 999999), 6, "0", STR_PAD_LEFT);

    if (count($cart["items"] ?? []) === 0) {
      return response()->json(["error" => "Estimate cart is empty."], 422);
    }

    $submittedAt = now()
      ->setTimezone("America/New_York")
      ->format("Y-m-d H:i T");

    $adminRecipients = collect([
      env("NOTIFICATION_EMAIL"),
      config("mail.from.address"),
    ])
      ->filter()
      ->unique()
      ->values();

    foreach ($adminRecipients as $email) {
      Mail::to($email)->later(
        now()->addMinute(),
        new EstimateRequestAdmin(
          requestID: $requestID,
          customerName: $request->string("name")->toString(),
          customerEmail: $request->string("email")->toString(),
          customerPhone: $request->string("phone")->toString(),
          customerAddress: $request->string("address")->toString(),
          cart: $cart,
          submittedAt: $submittedAt
        )
      );
    }

    Mail::to($request->string("email")->toString())->later(
      now()->addMinute(),
      new EstimateRequestReceived(
        name: $request->string("name")->toString(),
        requestID: $requestID,
        cart: $cart
      )
    );

    return response()->json([
      "ok" => true,
      "request_id" => $requestID,
    ]);
  }
}
