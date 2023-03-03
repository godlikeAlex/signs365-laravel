<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Order;
use App\Models\TemporaryOrder;
use Cookie;
use Illuminate\Http\Request;
use App\Services\Cart\Service as CartService;

class PaymentController extends Controller
{
  protected $stripe;
  protected $cart;

  public function __construct(Request $request)
  {
    $stripe = new \Stripe\StripeClient(env("STRIPE_SECRET_KEY"));

    if (Cookie::has("cart")) {
      $this->cart = new CartService(Cookie::get("cart"));
    } else {
      return response()->json(
        [
          "error" => "Cart not found!",
        ],
        404
      );
    }

    $this->stripe = $stripe;
  }

  public function createPaymentIntent(Request $request)
  {
    $city = City::find($request->get("city"));
    $cart = $this->cart->format($city);

    if ($cart["total"] <= 0) {
      return response()->json([
        "error" => "Invalid Cart Data",
      ]);
    }

    $temp_order = TemporaryOrder::create([
      "cart_data" => $cart,
    ]);

    $intent = $this->stripe->paymentIntents->create([
      "amount" => round($cart["total_with_tax"] * 100, 2),
      "currency" => "usd",
      "automatic_payment_methods" => ["enabled" => true],
      "metadata" => ["temp_order_id" => $temp_order->id],
    ]);

    return response()->json([
      "client_secret" => $intent->client_secret,
      "temp_order_id" => $temp_order->id,
    ]);
  }

  public function updateTempOrder(
    Request $request,
    TemporaryOrder $temporary_order
  ) {
    $data = $request->validate([
      "name" => "required",
      "email" => "required",
      "phone" => "required",
      "address" => "nullable",
      "user_id" => "nullable",
    ]);

    $temporary_order->update($data);
    $temporary_order->update([
      "city_id" => $request->get("city"),
    ]);

    return [
      "ok" => true,
    ];
  }

  public function retrivePayment(Request $request, $payment_intent_id)
  {
    $payment_itntent = $this->stripe->paymentIntents->retrieve(
      $payment_intent_id
    );

    if ($payment_itntent->metadata->temp_order_id) {
      $tempOrder = TemporaryOrder::find(
        $payment_itntent->metadata->temp_order_id
      );

      if (!$tempOrder) {
        abort(400);
      }

      if (!$tempOrder->main_order_uuid) {
        return ["status" => "in proccess", "email" => $tempOrder->email];
      }

      $order = Order::where("uuid", $tempOrder->main_order_uuid)->first();

      return ["status" => "completed", "uuid" => $order->uuid];
    }
  }
}
