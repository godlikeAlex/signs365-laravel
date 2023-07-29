<?php
namespace App\Enums;

enum ShippingTypeEnum: string
{
  case SQFT = "sqft";
  case SINGLE = "single";
  case WIDTHxHEIGHT = "widthxheight";

  public static function values(): array
  {
    return array_values(self::cases());
  }
}
