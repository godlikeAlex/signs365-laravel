<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Order extends Model
{
  use HasFactory;

  private $skipNotification;

  protected $casts = [
    "status" => OrderStatusEnum::class,
  ];

  protected $guarded = [];

  static $ORDERS_STATUSES = [
    "pending" => "Pending",
    "approved" => "Approved",
    "process" => "Process",
    "shipping" => "Shipping",
    "completed" => "Completed",
  ];

  protected static function boot()
  {
    parent::boot();
    static::creating(function ($order) {
      if (!isset($order["uuid"])) {
        $order["uuid"] = (string) Str::random(8);
      }
    });
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function city(): BelongsTo
  {
    return $this->belongsTo(City::class);
  }

  public function orderItems(): HasMany
  {
    return $this->hasMany(OrderItem::class);
  }
}
