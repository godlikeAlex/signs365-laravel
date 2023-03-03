<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  public function scopeAvailableInCity($query, $city)
  {
    $categories = $query->whereHas("cities", function ($cityQuery) use ($city) {
      return $cityQuery->where("city_id", $city);
    });

    return $categories;
  }

  public function scopePublishedProducts($query, $city)
  {
    $products = $query
      ->with("products", function ($productQuery) use ($city) {
        return $productQuery->where("published", 1)->availableInCity($city);
      })
      ->latest();

    return $products;
  }

  public function cities()
  {
    return $this->belongsToMany(
      City::class,
      "city_product_category",
      "product_category_id",
      "city_id"
    );
  }

  public function products()
  {
    return $this->belongsToMany(
      Product::class,
      "product_product_category",
      "product_category_id",
      "product_id"
    );
  }
}
