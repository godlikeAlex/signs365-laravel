<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductOption extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  static $TYPES_FOR_OPTIONS = [
    "sqft" => "SQFT",
    "single" => "SINGLE PRICE",
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
}
