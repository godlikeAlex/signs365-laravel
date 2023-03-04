<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderItem extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    "order_id",
    "product_id",
    "product_price_id",
    "quantity",
    "price",
  ];

  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }

  public function productPrice(): BelongsTo
  {
    return $this->belongsTo(ProductPrice::class);
  }

  public function variant(): BelongsTo
  {
    return $this->belongsTo(ProductVariant::class, "product_variant_id", "id");
  }
}
