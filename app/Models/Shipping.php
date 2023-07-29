<?php

namespace App\Models;

use App\Enums\ShippingTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shipping extends Model
{
  use HasFactory;

  protected $guarded = [];

  protected $casts = [
    "condition" => "json",
    "type" => ShippingTypeEnum::class,
  ];

  public function productOptions(): HasMany
  {
    return $this->hasMany(ProductOption::class);
  }
}
