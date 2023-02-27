<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  public function productCategories()
  {
    return $this->belongsToMany(ProductCategory::class, 'city_product_category', 'city_id', 'product_category_id');
  }

  public function products()
  {
    return $this->belongsToMany(Product::class, 'city_product', 'city_id', 'product_id');
  }
}
