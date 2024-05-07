<?php

namespace App\Services;

use App\DTO\CalculateShippingDTO;
use App\Enums\ShippingTypeEnum;
use App\Models\Shipping;

class ShippingService
{
  public function calculate(CalculateShippingDTO $calculateShippingDTO) {
    $shipping = $calculateShippingDTO->shipping;
    $width = $calculateShippingDTO->width;
    $height = $calculateShippingDTO->height;
    $sqft = $calculateShippingDTO->sqft;

    if (!$shipping) {
      return 0;
    }

    $shippingPrice = match ($shipping->type) {
      ShippingTypeEnum::SINGLE => $this->calculateSingleShipping($shipping),
      ShippingTypeEnum::SQFT => $this->getRangedPrice(
        $shipping->condition["range_sqft"],
        $sqft
      ),
      ShippingTypeEnum::WIDTHxHEIGHT => $this->getRangedPriceWidthHeight(
        $shipping->condition["range_wh"],
        $width,
        $height
      ),
      default => 0
    };


    return $shippingPrice;
  }

  private function calculateSingleShipping(Shipping $shipping) {
    return $shipping->condition["price"] ?? 0;
  }

  private function getRangedPrice($array, $desiredNumber)
  {
    $rangePrices = collect($array);

    $priceFromRange = $rangePrices
      ->filter(function ($rangeOfPrice) use ($desiredNumber) {
        $from = intval($rangeOfPrice["from"]);
        $to = intval($rangeOfPrice["to"]);

        // -1 from $quanty to infinity
        if ($desiredNumber >= $from && $to === -1) {
          return true;
        }

        if ($this->isNumberInRange($from, $to, $desiredNumber)) {
          return true;
        } else {
          return false;
        }
      })
      ->first();

    return $priceFromRange ? $priceFromRange["price"] : 0;
  }

  private function getRangedPriceWidthHeight($array, $width, $height)
  {
    $rangePrices = collect($array)->map(
      fn($rangePrice) => [
        "from_width" => intval($rangePrice["from_width"]),
        "to_width" => intval($rangePrice["to_width"]),

        "from_height" => intval($rangePrice["from_height"]),
        "to_height" => intval($rangePrice["to_height"]),

        "price" => $rangePrice["price"],
      ]
    );

    $priceRangeBetween = $rangePrices->first(function ($rangeOfPrice) use (
      $width,
      $height
    ) {
      $fromWidth = intval($rangeOfPrice["from_width"]);
      $toWidth = intval($rangeOfPrice["to_width"]);

      $fromHeight = intval($rangeOfPrice["from_height"]);
      $toHeight = intval($rangeOfPrice["to_height"]);

      if (
        $this->isNumberInRange($fromWidth, $toWidth, $width) &&
        $this->isNumberInRange($fromHeight, $toHeight, $height)
      ) {
        return true;
      }

      return false;
    });

    if ($priceRangeBetween) {
      return $priceRangeBetween["price"];
    } else {
      return $rangePrices[0]["price"] ?? 0;
    }
  }


  private function isNumberInRange($from = -1, $to = -1, $target = 55): bool
  {
    if ($to === -1 && $target >= $from) {
      return true;
    }

    if ($from === -1 && $to === -1) {
      return true;
    }

    return $target >= $from && $target <= $to;
  }
}
