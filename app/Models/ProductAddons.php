<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductAddons extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  static $ADDON_TYPES = ["FEE" => "FEE", "SQFT" => "SQFT"];

  public function addons(): BelongsToMany
  {
    return $this->belongsToMany(
      Product::class,
      "product_product_addon",
      "product_addon_id",
      "product_id"
    );
  }

  public function orderItems(): BelongsToMany
  {
    return $this->belongsToMany(
      OrderItem::class,
      "addon_order_item",
      "product_addon_id ",
      "order_item_id"
    );
  }
}
