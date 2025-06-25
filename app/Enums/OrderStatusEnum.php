<?php
namespace App\Enums;

enum OrderStatusEnum: string
{
  case UNPAID = "unpaid";
  case PENDING = "pending";
  case IN_PRODUCTION = "in_production";
  case SHIPPED = "shipped";
  case DONE = "done";
  case CANCELED = "canceled";

  public static function values(): array
  {
    return array_values(self::cases());
  }
}
