<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryWithOutProducts;
use App\Http\Resources\ProductResource;
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
      ->paginate(12);

    $categoriesWithOutProducts = ProductCategory::query()
      ->orderBy("id", "desc")
      ->get();

    return Inertia::render("Catalog", [
      "currentCategory" => $product_category,
      "countedProducts" => $product_category
        ->products()
        ->published()
        ->count(),
      "productsWithPagenation" => ProductResource::collection($products),
      "categories" => json_decode(
        CategoryWithOutProducts::collection(
          $categoriesWithOutProducts
        )->toJson()
      ),
    ]);
  }

  public function product(Request $request, Product $product)
  {
    if ($product->with_checkout) {
      $product->load("options");
    }

    return Inertia::render("Product", [
      "product" => new ProductResource($product),
    ]);
  }
}
