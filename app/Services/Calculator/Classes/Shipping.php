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
        $result = $this->getRangedPriceWidthHeight(
          $this->shipping->condition["range_wh"],
          $width,
          $height
        );

        info("Shipping price {price}", ["price" => $result]);

        return $result;
      default:
        return 0;
    }
  }

  // private function getRangedPriceWidthHeight($array, $width, $height)
  // {
  //   $rangePrices = collect($array);
  //   // 1 range width[0-23] && height[0-35] // ok
  //   // 2 range width[24-48] && height[36-48] // ok
  //   // 3 range width[49-(-1)] && height[49-(-1)] // ok
  //   // 4 range width[49-(-1)] && height[(-1)-(-1)] // ok

  //   $priceFromRange = $rangePrices->first(function ($rangeOfPrice) use (
  //     $width,
  //     $height
  //   ) {
  //     $fromWidth = intval($rangeOfPrice["from_width"]);
  //     $toWidth = intval($rangeOfPrice["to_width"]);

  //     $fromHeight = intval($rangeOfPrice["from_height"]);
  //     $toHeight = intval($rangeOfPrice["to_height"]);

  //     $anyHeight = $fromHeight === -1 && $toHeight === -1;

  //     if (
  //       $this->isNumberInRange($fromWidth, $toWidth, $width) &&
  //       $this->isNumberInRange($fromHeight, $toHeight, $height)
  //     ) {
  //       return true;
  //     }

  //     if (
  //       $width >= $fromWidth &&
  //       $toWidth === -1 &&
  //       $height >= $fromHeight &&
  //       $height <= $toHeight
  //     ) {
  //       return true;
  //     }

  //     if (
  //       $width >= $fromWidth &&
  //       $toWidth === -1 &&
  //       $fromHeight === -1 &&
  //       $toHeight === -1
  //     ) {
  //       return true;
  //     }

  //     return false;
  //   });

  //   return $priceFromRange ? $priceFromRange["price"] : 0;
  // }

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

    // info("price", ["priceRangeBetween" => $priceRangeBetween]);

    if ($priceRangeBetween) {
      return $priceRangeBetween["price"];
    }

    return 0;

    // FIND INFINITY
    // $rangePrices->first(function ($rangeOfPrice) {
    //   $fromWidth = $rangeOfPrice["from_width"];
    //   $toWidth = $rangeOfPrice["to_width"];

    //   $fromHeight = $rangeOfPrice["from_height"];
    //   $toHeight = $rangeOfPrice["to_height"];

    //   if ($toWidth === -1 && $fromHeight === -1 && $toHeight === -1) {

    //   } else {
    //     return false;
    //   }
    // });

    // 1 range width[0-23] && height[0-35] // ok
    // 2 range width[24-48] && height[36-48] // ok
    // 3 range width[49-(-1)] && height[49-(-1)] // ok
    // 4 range width[49-(-1)] && height[(-1)-(-1)] // ok

    // $priceFromRange = $rangePrices->first(function ($rangeOfPrice) use (
    //   $width,
    //   $height
    // ) {
    //   $fromWidth = intval($rangeOfPrice["from_width"]);
    //   $toWidth = intval($rangeOfPrice["to_width"]);

    //   $fromHeight = intval($rangeOfPrice["from_height"]);
    //   $toHeight = intval($rangeOfPrice["to_height"]);

    //   $anyHeight = $fromHeight === -1 && $toHeight === -1;

    //   if (
    //     $this->isNumberInRange($fromWidth, $toWidth, $width) &&
    //     $this->isNumberInRange($fromHeight, $toHeight, $height)
    //   ) {
    //     return true;
    //   }

    //   if (
    //     $width >= $fromWidth &&
    //     $toWidth === -1 &&
    //     $height >= $fromHeight &&
    //     $height <= $toHeight
    //   ) {
    //     return true;
    //   }

    //   if (
    //     $width >= $fromWidth &&
    //     $toWidth === -1 &&
    //     $fromHeight === -1 &&
    //     $toHeight === -1
    //   ) {
    //     return true;
    //   }

    //   return false;
    // });

    return 0;
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

  private function isNumberInRange($from = -1, $to = -1, $target = 55)
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
