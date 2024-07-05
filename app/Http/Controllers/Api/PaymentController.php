<?php

namespace App\Http\Controllers\Api;

use App\DTO\CreateOrderFromCartDTO;
use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Order;
use App\Models\TemporaryOrder;
use Cookie;
use Illuminate\Http\Request;
use App\Services\Cart\Service as CartService;
use App\Services\OrderService;
use App\Services\VoucherService;

class PaymentController extends Controller
{
  protected $stripe;
  protected $cart;

  public function __construct(Request $request)
  {
    $stripe = new \Stripe\StripeClient(env("STRIPE_SECRET_KEY"));
    $city = City::where("id", $request->get("city"))->first();

    if (!$city) {
      $city = City::first();
    }

    if (Cookie::has("cart")) {
      $this->cart = new CartService(Cookie::get("cart"), $city);
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

  public function createPaymentIntent(
    Request $request,
    OrderService $orderService
  ) {
    $city = City::find($request->get("city"));

    $order = $orderService->createOrderFromCart($this->cart, $city);

    // if ($cart["total"] <= 0) {
    // return response()->json([
    // "error" => "Invalid Cart Data",
    // ]);
    // }

    $intent = $this->stripe->paymentIntents->create([
      "amount" => round($order->amount, 2),
      "currency" => "usd",
      "automatic_payment_methods" => ["enabled" => true],
      // "metadata" => ["temp_order_id" => $temp_order->id],
    ]);

    $order->payment_intent_id = $intent->id;

    $order->save();

    return response()->json([
      "client_secret" => $intent->client_secret,
      "payment_intent_id" => $intent->id,
    ]);
  }

  public function updateCheckoutOrder(
    VoucherService $voucherService,
    Request $request,
    OrderService $orderService,
    $paymentIntentID
  ) {
    \Stripe\Stripe::setApiKey(env("STRIPE_SECRET_KEY"));

    $data = $request->validate([
      "name" => "required",
      "email" => "required",
      "phone" => "required",
      "address" => "nullable",
      "user_id" => "nullable",
    ]);

    $order = Order::findByPaymentIntent($paymentIntentID);

    $order->update($data);

    $order->update([
      "city_id" => $request->get("city"),
    ]);

    $user = auth()->user();
    $voucher = $this->cart->getVoucher();

    if ($voucher && !$user) {
      return back()->withErrors([
        "voucher" => "Unlock special savings with our exclusive promo code! 
          To use the promo code, please log in to your account or register for a new account.
          Enjoy your shopping experience with us!",
      ]);
    }

    if ($voucher && $user) {
      $resultValidationVoucher = $voucherService->validateVoucher(
        $voucher,
        $user,
        $order->amount
      );

      if ($resultValidationVoucher["isValid"] === false) {
        return back()->withErrors([
          "voucher" => $resultValidationVoucher["message"],
        ]);
      } else {
        $order->update(["voucher_id" => $voucher->id]);
      }
    }

    if ($user) {
      $order->update(["email" => $user->email]);
    }

    $updatedOrder = $orderService->updatePriceByVoucher($order, $this->cart);

    \Stripe\PaymentIntent::update($updatedOrder->payment_intent_id, [
      "amount" => $updatedOrder->amount,
    ]);

    return back();
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
    $order = Order::findByPaymentIntent($payment_intent_id);

    if ($order) {
      if ($order->status === OrderStatusEnum::UNPAID) {
        return ["status" => "in proccess", "email" => $order->email];
      } else {
        return ["status" => $order->status, "uuid" => $order->uuid];
      }
    }
  }
}
