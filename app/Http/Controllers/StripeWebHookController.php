<?php

namespace App\Http\Controllers;

use App\Models\TemporaryOrder;
use Illuminate\Http\Request;

class StripeWebHookController extends Controller
{
  public function webhook()
  {
    $endpoint_secret =
      "whsec_6ac403be7a327f85e01d68deacc79eeaf6b26a64d3b45416f5df638e79b5daac";

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
      abort(400);
      exit();
    }

    // Handle the event
    switch ($event->type) {
      case "payment_intent.canceled":
        $paymentIntent = $event->data->object;

        info($paymentIntent);

        $cart_data = TemporaryOrder::find(1)->cart_data;

      case "payment_intent.succeeded":
        $paymentIntent = $event->data->object;

        info($paymentIntent);
      case "setup_intent.canceled":
        $setupIntent = $event->data->object;
      // ... handle other event types
      default:
        echo "Received unknown event type " . $event->type;
    }

    return response("ok", 200);
  }
}