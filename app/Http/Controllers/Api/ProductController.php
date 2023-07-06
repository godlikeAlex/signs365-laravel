<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductVaraintResource;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  public function product(Request $request, Product $product)
  {
    if ($product->with_checkout) {
      $product->load("options", "addons");
    }

    return ["product" => new ProductResource($product)];
  }
}
