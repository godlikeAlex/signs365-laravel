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

  public function addons(): BelongsToMany
  {
    return $this->belongsToMany(
      Product::class,
      "product_product_addon",
      "product_addon_id",
      "product_id"
    );
  }
}
