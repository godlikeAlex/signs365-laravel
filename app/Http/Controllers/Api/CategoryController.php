<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  public function index(Request $request)
  {
    $categoriesWithProducts = ProductCategory::query()
      ->orderBy("menu_order", "asc")
      ->where("show_on_home", true)
      ->with("products")
      ->get();

    $categoriesWithProducts->each(function ($category) {
      $category->products->each(function ($product) {
        if ($product->with_checkout) {
          $product->load("options", "addons");
        }
      });
    });

    return [
      "categories" => CategoryResource::collection(
        ProductCategory::getCategoriesWithProducts()
      ),
    ];
  }
}
