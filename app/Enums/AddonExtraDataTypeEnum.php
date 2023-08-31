<?php

namespace App\Enums;

enum AddonExtraDataTypeEnum: string
{
  case UNSET = "unset";
  case GROMMETS = "grommets";
  case POLE_POCKET = "pole_pocket";

  public static function values(): array
  {
    return array_values(self::cases());
  }
}
