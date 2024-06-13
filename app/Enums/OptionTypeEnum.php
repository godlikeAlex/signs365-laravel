<?php
namespace App\Enums;

enum OptionTypeEnum: string
{
  case SQFT = "sqft";
  case SINGLE = "single";
  case BY_QTY = "qty"; // RANGE
  case PER_QTY = "per_qty";

  public static function values(): array
  {
    return array_values(self::cases());
  }

  public static function listOptionsWithLabel()
  {
    $values = collect(self::values());

    $list = $values->mapWithKeys(function ($enum) {
      switch (OptionTypeEnum::from($enum->value)) {
        case OptionTypeEnum::SQFT:
          return [$enum->value => "SQFT"];
        case OptionTypeEnum::BY_QTY:
          return [$enum->value => "Range Prices"];
        case OptionTypeEnum::SINGLE:
          return [$enum->value => "Single Item"];
        case OptionTypeEnum::PER_QTY:
          return [$enum->value => "Per Quantity"];
      }
    });

    return $list->all();
  }
}
