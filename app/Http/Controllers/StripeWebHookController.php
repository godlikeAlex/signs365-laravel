<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Models\Order;
use App\Notifications\OrderPaid;
use App\Services\VoucherService;
use Notification;

class StripeWebHookController extends Controller
{
  public function webhook(VoucherService $voucherService)
  {
    $endpoint_secret = env("STRIPE_ENDPOINT_SECREET");

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

        foreach (
          [
            env("NOTIFICATION_EMAIL"),
            "viktor@easywayinstall.com",
            "david@easywayinstall.com",
          ]
          as $email
        ) {
          Notification::route("mail", $email)->notify(new OrderPaid($order));
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
