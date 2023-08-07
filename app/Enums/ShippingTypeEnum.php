<?php
namespace App\Enums;

enum ShippingTypeEnum: string
{
  case SQFT = "sqft";
  case SINGLE = "single";
  case WIDTHxHEIGHT = "widthxheight";
  case BANNERS_SHEET = "banners_sheets";

  public static function values(): array
  {
    return array_values(self::cases());
  }
}
