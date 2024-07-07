<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  static function getCategoriesWithProducts()
  {
    $categoriesWithProducts = ProductCategory::query()
      ->orderBy("menu_order", "asc")
      ->where("show_on_home", true)
      ->with("products", function ($query) {
        $query->where("published", true);
      })
      ->get();

    $categoriesWithProducts->each(function ($category) {
      $category->products
        ->each(function ($product) {
          if ($product->with_checkout) {
            $product->load("options", "addons");
          }
        })
        ->filter(fn($product) => $product->is_published === true);
    });

    return $categoriesWithProducts;
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
