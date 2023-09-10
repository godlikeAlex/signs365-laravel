<?php
namespace App\Enums;

enum OrderStatusEnum: string
{
  case PENDING = "pending";
  case IN_PRODUCTION = "in_production";
  case SHIPPED = "shipped";
  case DONE = "done";

  public static function values(): array
  {
    return array_values(self::cases());
  }
}
