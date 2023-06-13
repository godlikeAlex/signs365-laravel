<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  protected $casts = [
    "images" => "array",
    "is_published" => "boolean",
    "with_checkout" => "boolean",
  ];

  public function scopeAvailableInCity($query, $city)
  {
    $products = $query->whereHas("cities", function ($cityQuery) use ($city) {
      return $cityQuery->where("city_id", $city);
    });

    return $products;
  }

  /**
   * Get the route key for the model.
   */
  public function getRouteKeyName(): string
  {
    return "slug";
  }

  public function cities(): BelongsToMany
  {
    return $this->belongsToMany(
      City::class,
      "city_product",
      "product_id",
      "city_id"
    )->using(CityProduct::class);
  }

  public function categories(): BelongsToMany
  {
    return $this->belongsToManyCategories();
  }

  public function productCategories(): BelongsToMany
  {
    return $this->belongsToManyCategories();
  }

  private function belongsToManyCategories()
  {
    return $this->belongsToMany(
      ProductCategory::class,
      "product_product_category",
      "product_id",
      "product_category_id"
    );
  }

  public function prices(): HasManyThrough
  {
    return $this->hasManyThrough(ProductPrice::class, ProductVariant::class);
  }

  public function variants(): HasMany
  {
    return $this->hasMany(ProductVariant::class);
  }

  public function startPriceInCity($city)
  {
    return $this->prices()
      ->where("city_id", $city)
      ->min("price");
  }

  public function startPrice()
  {
    return $this->prices()->min("price");
  }
}
