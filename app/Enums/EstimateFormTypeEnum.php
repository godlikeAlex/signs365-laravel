<?php

namespace App\Enums;

enum EstimateFormTypeEnum: string
{
  case SQFT = "sqft";
  case SINGLE = "single";
  case BY_QTY = "qty";
  case PER_QTY = "per_qty";
  case NO_BASE = "no_base";

  public static function listOptionsWithLabel(): array
  {
    return [
      self::SQFT->value => "SQFT",
      self::SINGLE->value => "Single Item",
      self::BY_QTY->value => "Range Prices",
      self::PER_QTY->value => "Per Quantity",
      self::NO_BASE->value => "Without Base Price",
    ];
  }
}
