<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
  public function renderCart()
  {
    return Inertia::render("Cart");
  }

  public function renderCheckout()
  {
    return Inertia::render("Checkout");
  }

  public function renderSuccess(Request $request)
  {
    return Inertia::render("SuccessPayment", [
      "payment_intent" => $request->query("payment_intent"),
    ]);
  }
}
