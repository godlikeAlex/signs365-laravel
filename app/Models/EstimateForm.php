<?php

namespace App\Models;

use App\Enums\OptionTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EstimateForm extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  protected $casts = [
    "type" => OptionTypeEnum::class,
    "range_prices" => "array",
    "per_quantity_prices" => "json",
    "is_active" => "boolean",
  ];

  public function products(): BelongsToMany
  {
    return $this->belongsToMany(
      Product::class,
      "estimate_form_product",
      "estimate_form_id",
      "product_id"
    )->withPivot(["sort", "is_active"]);
  }

  public function fields(): HasMany
  {
    return $this->hasMany(EstimateField::class)->orderBy("order_column");
  }
}
