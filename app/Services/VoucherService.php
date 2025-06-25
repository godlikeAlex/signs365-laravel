<?php

namespace App\Services;

use App\Models\Order;
use App\Models\PaymentSession;
use App\Models\User;
use App\Models\Voucher;

class VoucherService
{
  public function validateVoucher(?Voucher $voucher, User $user, $amount)
  {
    if (!$voucher) {
      return [
        "isValid" => false,
        "message" => "Voucher not found.",
      ];
    }

    if ($voucher->reachedMaximumUses()) {
      return [
        "isValid" => false,
        "message" => "Voucher code can no longer be used.",
      ];
    }

    if (!$voucher->isAvailableNow()) {
      return ["isValid" => false, "message" => "Voucher code has expired."];
    }

    if ($voucher->userReachedMaximumUses($user)) {
      return [
        "isValid" => false,
        "message" => "You can no longer use this coupon.",
      ];
    }

    if (!$voucher->isMinimumAmountValid($amount)) {
      $minPrice = $voucher->min_price / 100;

      return [
        "isValid" => false,
        "message" => "The minimum price for using a voucher is {$minPrice}$.",
      ];
    }

    return ["isValid" => true];
  }

  public function attachVoucher($entity, Voucher $voucher)
  {
    if ($entity instanceof Order) {
      $entity->voucher()->associate($voucher);
      // } elseif ($entity instanceof PaymentSession) {
      //   $entity->voucher()->associate($voucher);
    } else {
      throw new \Exception("Wrong  Model to attach");
    }
  }
}
