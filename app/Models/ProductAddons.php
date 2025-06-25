<?php

namespace App\Models;

use App\Enums\AddonExtraDataTypeEnum;
use App\Enums\AddonTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class ProductAddons extends Model implements Sortable
{
  use HasFactory, SoftDeletes, SortableTrait;

  protected $guarded = [];

  protected $casts = [
    "type" => AddonTypeEnum::class,
    "extra_data_type" => AddonExtraDataTypeEnum::class,
    "with_qty" => "boolean",
    "extra_data_content" => "json",
    "extra_data" => "json",
  ];

  static $ADDON_TYPES = ["FEE" => "FEE", "SQFT" => "SQFT"];

  public function option(): BelongsTo
  {
    return $this->belongsTo(ProductOption::class);
  }

  // public function products(): BelongsToMany
  // {
  //   return $this->belongsToMany(
  //     Product::class,
  //     "product_product_addon",
  //     "product_addon_id",
  //     "product_id"
  //   );
  // }

  // public function product(): BelongsTo
  // {
  //   return $this->belongsTo(Product::class);
  // }
}
