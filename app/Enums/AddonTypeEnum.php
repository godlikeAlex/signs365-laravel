<?php

namespace App\Enums;

enum AddonTypeEnum: string
{
  case SQFT = "SQFT";
  case FEE = "FEE";

  public static function values(): array
  {
    return array_values(self::cases());
  }
}
