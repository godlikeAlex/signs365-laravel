<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryWithOutProducts;
use App\Http\Resources\ProductResource;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ShopController extends Controller
{
  public function category(ProductCategory $product_category)
  {
    return [
      "category" => $product_category,
      "count_products" => $product_category->products()->count(),
    ];
  }

  public function categories(Request $request)
  {
    $categoriesWithProducts = ProductCategory::query()
      ->orderBy("id", "desc")
      ->get();

    return [
      "categories" => CategoryWithOutProducts::collection(
        $categoriesWithProducts
      ),
    ];
  }

  public function products(Request $request, ProductCategory $product_category)
  {
    $products = $product_category
      ->products()
      ->orderby("order")
      ->paginate(12);

    $products->each(function ($product) {
      $product->load("options", "addons");
    });

    return ProductResource::collection($products);
  }
}
