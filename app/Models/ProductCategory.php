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
    return $query->whereHas('cities', function ($cityQuery) use ($city) {
      $cityQuery->where('city_id', $city);
    });
  }

  public function scopePublishedProducts($query, $limit)
  {
    $products = $query->with('products', function ($productQuery) {
      $productQuery->where('published', 1);
    })->latest();

    if ($limit) {
      $products->limit($limit);
    }

    return $products;
  }

  public function cities()
  {
    return $this->belongsToMany(City::class, 'city_product_category', 'product_category_id', 'city_id');
  }

  public function products()
  {
    return $this->belongsToMany(Product::class, 'product_product_category', 'product_category_id', 'product_id');
  }
}
