<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Voucher;
use App\Services\VoucherService;
use Cookie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\Cart\Service as CartService;
use Illuminate\Support\Str;

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

  public function renderCart()
  {
    $this->cart->destroyVoucher();

    return Inertia::render("Cart", [
      "with_installation" => session("with_installation", false),
    ]);
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

  public function toggleExtraInstallation(Request $request)
  {
    $currentInstallationStatus = session("with_installation", false);

    session(["with_installation" => !$currentInstallationStatus]);

    return redirect()->back();
  }

  public function applyVoucher(Request $request, VoucherService $voucherService)
  {
    $voucherCode = $request->input("code");
    $user = $request->user();

    info($user);

    if (!$user) {
      return back()->withErrors([
        "voucher" =>
          "To use a promo code you need to create or log in to an account.",
      ]);
    }

    if (!$voucherCode) {
      return back()->withErrors(["voucher" => "Voucher Code Is Required"]);
    }

    $voucher = Voucher::findByCode($voucherCode);

    info("voucher", [
      "voucher" => $voucher,
      "code" => $voucherCode,
    ]);

    if (!$voucher) {
      return back()->withErrors(["voucher" => "Voucher not found."]);
    }

    $this->cart->destroyVoucher();

    list($totalCart) = $this->cart->getPrices();

    $resultValidationVoucher = $voucherService->validateVoucher(
      $voucher,
      $user,
      $totalCart
    );

    if ($resultValidationVoucher["isValid"] == false) {
      return back()->withErrors([
        "voucher" => $resultValidationVoucher["message"],
      ]);
    }

    $this->cart->applyVoucher($voucher);

    return back();
  }

  public function cancelVoucher()
  {
    $this->cart->destroyVoucher();

    return back();
  }
}
