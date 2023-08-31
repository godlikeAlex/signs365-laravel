<?php

namespace App\Models;

use App\Enums\AddonExtraDataTypeEnum;
use App\Enums\AddonTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductAddons extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  protected $casts = [
    "type" => AddonTypeEnum::class,
    "extra_data_type" => AddonExtraDataTypeEnum::class,
    "with_qty" => "boolean",
    "extra_data_content" => "json",
  ];

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

  public function options(): BelongsToMany
  {
    return $this->belongsToMany(
      ProductOption::class,
      "product_option_product_addon",
      "product_addon_id",
      "product_option_id"
    );
  }

  public function products(): BelongsToMany
  {
    return $this->belongsToMany(
      Product::class,
      "product_product_addon",
      "product_addon_id",
      "product_id"
    );
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
