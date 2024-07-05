<?php

namespace App\Services;

use App\DTO\CalculatorDTO;
use App\DTO\CreateOrderFromCartDTO;
use App\Enums\OrderStatusEnum;
use App\Models\City;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductAddons;
use App\Models\SizeItem;
use Str;
use App\Services\Cart\Service as CartService;

class OrderService
{
  public function createOrderFromCart(CartService $cartService, City $city)
  {
    $cartCalculated = $cartService->format($city);

    $order = new Order();
    $randomUUID = Str::random(8);

    $order->uuid = $randomUUID;

    list($amount, $tax, $discountVoucher) = $cartService->calculateForOrder();

    $order->tax = $tax;
    $order->voucher_discount = $discountVoucher;
    $order->amount = $amount;

    $order->status = OrderStatusEnum::UNPAID;

    $order->save();

    foreach ($cartCalculated["items"] as $cartItem) {
      $orderItem = new OrderItem();

      $width = $cartItem->attributes->width;
      $height = $cartItem->attributes->height;
      $unit = $cartItem->attributes->unit;
      $images = $cartItem->attributes->images ?? [];
      $addons = json_decode(json_encode($cartItem->attributes->addons), true);
      $selectedOptionID = $cartItem->attributes->productOption->id;

      if (property_exists($cartItem->attributes, "sizeItem")) {
        $sizeItem = SizeItem::find($cartItem->attributes->sizeItem->id);

        if ($sizeItem) {
          $width = $sizeItem->width;
          $width = $sizeItem->height;

          $orderItem->size_item_id = $sizeItem->id;
        }
      }

      $calculator = new CalculatorService();

      $calculatorDTO = new CalculatorDTO(
        $cartItem->associatedModel->id,
        $selectedOptionID,
        $width,
        $height,
        $cartItem->quantity,
        $addons,
        $unit
      );

      list($priceInCents, $_, $shippingPrice) = $calculator->calculate(
        $calculatorDTO
      );

      $orderItem->price = $priceInCents;
      $orderItem->shipping_price = $shippingPrice;
      $orderItem->product_id = $cartItem->associatedModel->id;
      $orderItem->product_option_id = $selectedOptionID;
      $orderItem->width = $width;
      $orderItem->height = $height;
      $orderItem->unit = $unit;
      $orderItem->quantity = $cartItem->quantity;
      $orderItem->images = $images;

      $orderItem->order()->associate($order);

      $orderItem->save();

      foreach ($addons as $cartAddon) {
        $addon = ProductAddons::find($cartAddon["id"]);

        if (!$addon) {
          continue;
        }

        $extraData = [];

        if (
          isset($cartAddon["extra_data_selected"]) &&
          isset($cartAddon["extra_data_type"])
        ) {
          $extraData[] = [
            "title" => $cartAddon["extra_data_type"],
            "data" => $cartAddon["extra_data_selected"],
          ];
        }

        $orderItem->addons()->attach($addon->id, [
          "quantity" => $cartAddon["quantity"] ?? 0,
          "extra_data" => json_encode($extraData),
        ]);
      }
    }

    return $order;
  }

  public function updatePriceByVoucher(Order $order, CartService $cartService)
  {
    list($amount, $tax, $discountVoucher) = $cartService->calculateForOrder();

    $order->tax = $tax;
    $order->voucher_discount = $discountVoucher;
    $order->amount = $amount;

    $order->save();

    return $order;
  }
}
