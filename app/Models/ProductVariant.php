<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductVariant extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  public static function boot()
  {
    parent::boot();

    self::created(function ($model) {
      $product = $model->product;

      foreach ($product->cities as $city) {
        $model->prices()->create([
          "city_id" => $city->id,
          "product_id" => $product->id,
          "price" => 0,
        ]);
      }
    });
  }

  public function prices(): HasMany
  {
    return $this->hasMany(ProductPrice::class)->withTrashed();
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }

  public function price(): HasOne
  {
    return $this->hasOne(ProductPrice::class)->withTrashed();
  }
}
