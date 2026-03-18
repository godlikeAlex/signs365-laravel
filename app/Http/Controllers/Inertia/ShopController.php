<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryWithOutProducts;
use App\Http\Resources\ProductCardResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductReviewResource;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
  public function index(ProductCategory $product_category)
  {
    $products = $product_category
      ->products()
      ->published()
      ->orderby("order")
      ->with("options")
      ->paginate(12);

    $categoriesWithOutProducts = ProductCategory::query()
      // ->orderBy("id", "desc")
      ->orderBy("menu_order", "asc")
      ->get();

    $currentCategory = new CategoryResource($product_category);

    $currentCategory->wrap(null);

    return Inertia::render("Catalog", [
      "currentCategory" => $currentCategory,
      "countedProducts" => $product_category
        ->products()
        ->published()
        ->count(),
      "productsWithPagination" => ProductCardResource::collection($products),
    ]);
  }

  public function product(
    Request $request,
    ProductCategory $product_category,
    Product $product
  ) {
    if ($product->with_checkout) {
      $product->load("options");
    }

    if ($product->is_estimate) {
      $product->load("estimateForms");
    }

    $productResource = new ProductResource($product);
    $categoryResource = new CategoryResource($product_category);

    $productResource->wrap(null);
    $categoryResource->wrap(null);

    return Inertia::render("Product", [
      "product" => $productResource,
      "category" => $categoryResource,
    ]);
  }
}
