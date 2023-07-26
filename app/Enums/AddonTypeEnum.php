<?php

namespace App\Enums;

enum AddonTypeEnum: string
{
  case SQFT = "sqft";
  case FEE = "fee";

  public static function values(): array
  {
    return array_values(self::cases());
  }

  public function getDependedTypes()
  {
  }
}
