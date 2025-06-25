<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Voucher extends Model
{
  use HasFactory;

  protected $guarded = [];

  protected $casts = [
    "is_fixed" => "boolean",
  ];

  static function findByCode($code)
  {
    return self::where("code", $code)->first();
  }

  //

  public function orders(): HasMany
  {
    return $this->hasMany(Order::class);
  }

  static function usesNotReached()
  {
    $vouchers = Voucher::get();

    return $vouchers->filter(function ($voucher) {
      return !$voucher->reachedMaximumUses();
    });
  }

  // Helper functions
  public function reachedMaximumUses()
  {
    if (is_null($this->max_uses)) {
      return false;
    }

    $uses = $this->orders()->count();

    return $uses >= $this->max_uses;
  }

  public function userReachedMaximumUses(User $user)
  {
    if ($this->max_uses_user <= 0) {
      return false;
    }

    $voucherUsedByUser = $this->orders()
      ->where("user_id", $user->id)
      ->count();

    return $voucherUsedByUser >= $this->max_uses_user;
  }

  public function isAvailableNow()
  {
    $now = now()->setTimezone($this->timezone);
    $starts_at = Carbon::parse($this->starts_at)->setTimezone($this->timezone);

    if ($starts_at->greaterThan($now)) {
      return false;
    }

    if (is_null($this->expires_at)) {
      return true;
    }

    $expires_at = Carbon::parse($this->expires_at)->setTimezone(
      $this->timezone
    );

    if ($expires_at->greaterThan($now)) {
      return true;
    } else {
      return false;
    }
  }

  public function isMinimumAmountValid($price)
  {
    if (is_null($this->min_price)) {
      return true;
    }

    return $price >= $this->min_price;
  }

  public function isValid()
  {
    return $this->isAvailableNow() && $this->reachedMaximumUses() == false;
  }

  public function getDiscount($price)
  {
    if ($this->is_fixed) {
      return $this->discount_amount;
    }

    return $price * ($this->discount_percent / 100);
  }
}
