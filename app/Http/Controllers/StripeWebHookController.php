<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductAddons;
use App\Models\ProductOption;
use App\Models\ProductPrice;
use App\Models\ProductVariant;
use App\Models\SizeItem;
use App\Models\TemporaryOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Services\Calculator\Service as CalculatorService;
use App\Services\VoucherService;

class StripeWebHookController extends Controller
{
  public function webhook(VoucherService $voucherService)
  {
    $endpoint_secret =
      "whsec_3754cd89f3876b2211eb2eb896799315888a32cc9de27a2527fa5057b77bc97c";

    $payload = @file_get_contents("php://input");
    $sig_header = $_SERVER["HTTP_STRIPE_SIGNATURE"];
    $event = null;

    try {
      $event = \Stripe\Webhook::constructEvent(
        $payload,
        $sig_header,
        $endpoint_secret
      );
    } catch (\UnexpectedValueException $e) {
      // Invalid payload
      abort(400);
      exit();
    } catch (\Stripe\Exception\SignatureVerificationException $e) {
      // Invalid signature
      info($e);

      abort(400);
      exit();
    }

    // Handle the event
    switch ($event->type) {
      case "payment_intent.canceled":
        return "";
      case "payment_intent.succeeded":
        $paymentIntent = $event->data->object;
        $order = Order::findByPaymentIntent($paymentIntent->id);

        if (!$order) {
          return;
        }

        $order->update(["status" => OrderStatusEnum::PENDING]);

        if ($order->user && $order->voucher) {
          $resultValidationVoucher = $voucherService->validateVoucher(
            $order->voucher,
            $order->user,
            $order->amount
          );

          if ($resultValidationVoucher["isValid"] === false) {
            $stripe = new \Stripe\StripeClient(env("STRIPE_SECRET_KEY"));

            $stripe->refunds->create([
              "payment_intent" => $paymentIntent->id,
            ]);

            $order->update([
              "status" => OrderStatusEnum::CANCELED,
              "voucher_id" => null,
            ]);
          }
        }

      case "setup_intent.canceled":
        $setupIntent = $event->data->object;
      // ... handle other event types
      default:
        echo "Received unknown event type " . $event->type;
    }

    return response("ok", 200);
  }
}
