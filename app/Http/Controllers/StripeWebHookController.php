<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductPrice;
use App\Models\ProductVariant;
use App\Models\TemporaryOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
      // $paymentIntent = $event->data->object;

      // info($paymentIntent);

      // $cart_data = TemporaryOrder::find(1)->cart_data;

      case "payment_intent.succeeded":
        $paymentIntent = $event->data->object;
        $orderID = $paymentIntent->metadata->temp_order_id;
        $tempOrder = TemporaryOrder::find($orderID);

        if ($tempOrder) {
          $order = new Order();
          $randomUUID = Str::random(8);

          $order->name = $tempOrder->name;
          $order->phone = $tempOrder->phone;
          $order->address = $tempOrder->address;
          $order->email = $tempOrder->email;
          $order->city_id = $tempOrder->city_id;
          $order->total = $tempOrder->cart_data->total_with_tax * 100;
          $order->total_without_tax = $tempOrder->cart_data->total * 100;
          $order->uuid = $randomUUID;

          if ($tempOrder->user_id) {
            $order->user_id = $tempOrder->user_id;
          }

          $order->save();
          $tempOrder->update([
            "main_order_uuid" => $randomUUID,
          ]);

          $city = $order->city;

          foreach ($tempOrder->cart_data->items as $cartItem) {
            $orderItem = new OrderItem();

            $productVariant = ProductVariant::find(
              $cartItem->attributes->product_variant->id
            );
            $productPrice = $productVariant
              ->prices()
              ->where("city_id", $city->id)
              ->first();

            $orderItem->price = $productPrice->price;
            $orderItem->quantity = $cartItem->quantity;
            $orderItem->order()->associate($order);
            $orderItem->productPrice()->associate($productPrice);
            $orderItem->variant()->associate($productVariant);
            $orderItem->product_id = $cartItem->associatedModel->id;

            $orderItem->save();
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
