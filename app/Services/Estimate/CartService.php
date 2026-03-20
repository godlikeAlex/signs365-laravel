<?php

namespace App\Services\Estimate;

use App\DTO\Estimate\AddToEstimateCartDTO;

class CartService
{
  private $cart;

  public function __construct(string $cartID)
  {
    $this->cart = \Cart::session($cartID);
  }

  public function instance()
  {
    return $this->cart;
  }

  public function add(AddToEstimateCartDTO $dto): void
  {
    $options = [
      "product" => [
        "id" => $dto->productID,
        "title" => $dto->title,
      ],
      "estimate_form_id" => $dto->formID,
      "estimate_form_ids" => $dto->formIDs,
      "payload" => $dto->payload,
    ];

    $id = md5($dto->productID . serialize($dto->formIDs) . serialize($options));

    $this->cart->add([
      "id" => $id,
      "name" => $dto->title,
      "quantity" => $dto->quantity,
      "price" => $dto->price,
      "attributes" => $options,
      "associatedModel" => null,
    ]);
  }

  public function addQuantity(string $itemID): void
  {
    if (!$this->cart->has($itemID)) {
      return;
    }

    $this->cart->update($itemID, ["quantity" => +1]);
  }

  public function reduceQuantity(string $itemID): void
  {
    if (!$this->cart->has($itemID)) {
      return;
    }

    $this->cart->update($itemID, ["quantity" => -1]);
  }

  public function removeItem(string $itemID): void
  {
    if (!$this->cart->has($itemID)) {
      return;
    }

    $this->cart->remove($itemID);
  }

  public function clear(): void
  {
    $this->cart->clear();
  }

  public function format(): array
  {
    $items = $this->cart
      ->getContent()
      ->sort()
      ->values()
      ->map(function ($item) {
        $lockedLineTotal =
          (bool) ($item->attributes["payload"]["lock_line_total"] ?? false);
        $lineTotalInCents = $lockedLineTotal
          ? $item->attributes["payload"]["line_total_cents"] ?? null
          : null;

        if ($lineTotalInCents === null) {
          $formType = $item->attributes["payload"]["form_type"] ?? null;
          $lineTotalInCents =
            $formType === "per_qty"
              ? $item->price
              : $item->price * $item->quantity;
        }

        return [
          "id" => $item->id,
          "name" => $item->name,
          "quantity" => $item->quantity,
          "price" => round($item->price / 100, 2),
          "line_total" => round($lineTotalInCents / 100, 2),
          "attributes" => $item->attributes,
        ];
      });

    $subtotalInCents = $this->cart
      ->getContent()
      ->reduce(function ($carry, $item) {
        $lockedLineTotal =
          (bool) ($item->attributes["payload"]["lock_line_total"] ?? false);
        $lineTotalInCents = $lockedLineTotal
          ? $item->attributes["payload"]["line_total_cents"] ?? null
          : null;
        if ($lineTotalInCents !== null) {
          return $carry + (int) $lineTotalInCents;
        }

        $formType = $item->attributes["payload"]["form_type"] ?? null;

        if ($formType === "per_qty") {
          return $carry + $item->price;
        }

        return $carry + $item->price * $item->quantity;
      }, 0);

    return [
      "items" => $items->values(),
      "subtotal" => round($subtotalInCents / 100, 2),
      "total" => round($subtotalInCents / 100, 2),
      "amount_in_cents" => (int) round($subtotalInCents),
    ];
  }
}
