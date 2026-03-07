<?php

namespace App\Models;

use App\Enums\OptionTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EstimateForm extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  protected $casts = [
    "type" => OptionTypeEnum::class,
    "common_data" => "json",
    "range_prices" => "array",
    "per_quantity_prices" => "json",
    "quantity_list" => "json",
    "size_for_collect" => "boolean",
    "show_custom_sizes" => "boolean",
    "need_file" => "boolean",
    "prevent_user_input_size" => "boolean",
    "is_active" => "boolean",
  ];

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

  public function fields(): HasMany
  {
    return $this->hasMany(EstimateField::class)->orderBy("order_column");
  }
}
