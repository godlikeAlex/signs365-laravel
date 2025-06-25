<?php

namespace App\Enums;

enum VoucherTypeEnum: string
{
  case VOUCHER = "VOUCHER";
  case DISCOUNT = "DISCOUNT";

  public function label()
  {
    return match ($this) {
      self::VOUCHER => "Can use only specific users.",
      self::DISCOUNT => "Can use all users",
    };
  }

  public static function toArray(): array
  {
    $array = [];
    foreach (self::cases() as $case) {
      $array[$case->value] = $case->label();
    }
    return $array;
  }
}
