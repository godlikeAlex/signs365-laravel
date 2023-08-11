<?php

namespace App\Models;

use App\Enums\OptionTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductOption extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  static $TYPES_FOR_OPTIONS = [
    "sqft" => "SQFT",
    "single" => "SINGLE PRICE",
    "qty" => "BY QUANTITY",
  ];

  protected $casts = [
    "range_prices" => "array",
    "common_data" => "json",
    "type" => OptionTypeEnum::class,
    "show_custom_sizes" => "boolean",
    "size_for_collect" => "boolean",
  ];

  public function products(): BelongsToMany
  {
    return $this->belongsToMany(
      Product::class,
      "product_product_option",
      "product_option_id",
      "product_id"
    );
  }

  public function addons(): BelongsToMany
  {
    return $this->belongsToMany(
      ProductAddons::class,
      "product_option_product_addon",
      "product_option_id",
      "product_addon_id"
    );
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }

  public function shipping(): BelongsTo
  {
    return $this->belongsTo(Shipping::class);
  }

  public function sizeList(): BelongsTo
  {
    return $this->belongsTo(SizeList::class);
  }

  public function orderItems(): HasMany
  {
    return $this->hasMany(OrderItem::class);
  }
}
