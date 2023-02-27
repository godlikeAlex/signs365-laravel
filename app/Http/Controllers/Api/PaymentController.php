<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
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
    $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

    if (Cookie::has('cart')) {
      $this->cart = new CartService(Cookie::get('cart'));
    } else {
      return response()->json([
        'error' => 'Cart not found!'
      ], 404);
    }

    $this->stripe = $stripe;
  }

  public function createPaymentIntent(Request $request) {
    $city = City::find($request->get('city'));
    $cart = $this->cart->format($city);

    if ($cart['total'] <= 0) {
      return response()->json([
        'error' => 'Invalid Cart Data'
      ]);
    }

    $temp_order = TemporaryOrder::create([
      'cart_data' => $cart
    ]);

    $intent = $this->stripe->paymentIntents->create(
      [
        'amount' => $cart['total_with_tax'],
        'currency' => 'usd',
        'automatic_payment_methods' => ['enabled' => true],
        'metadata' => ['temp_order_id' => $temp_order->id],
      ]
    );

    return response()->json([
      'client_secret' => $intent->client_secret
    ]);
  }
}
