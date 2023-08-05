<?php
namespace App\Services\Calculator\Classes;

use App\Enums\ShippingTypeEnum;
use App\Models\Shipping as ModelShipping;

class Shipping
{
  public $shipping;

  public function __construct($shipping)
  {
    $this->shipping = $shipping;
  }

  public function calculate($width, $height, $sqft)
  {
    if (!$this->shipping) {
      return 0;
    }

    switch ($this->shipping->type) {
      case ShippingTypeEnum::SINGLE:
        return $this->shipping->condition["price"] ?? 0;
      case ShippingTypeEnum::SQFT:
        $result = $this->getRangedPrice(
          $this->shipping->condition["range_sqft"],
          $sqft
        );
        return $result;
      case ShippingTypeEnum::WIDTHxHEIGHT:
        return $this->getRangedPrice(
          $this->shipping->condition["range_wh"],
          $width * $height
        );
      default:
        return 0;
    }
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

        if ($desiredNumber >= $from && $desiredNumber <= $to) {
          return true;
        } else {
          return false;
        }
      })
      ->first();

    return $priceFromRange ? $priceFromRange["price"] : 0;
  }
}
