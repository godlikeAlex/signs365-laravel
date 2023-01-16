<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductVaraintResource;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  public function product(Request $request) {}

  public function productVariants(Request $request, Product $product) {
    $city = $request->get('city');

    $variants = $product->variants()->with(['price' => function ($query) use ($city) {
      return $query->where('city_id', $city);
    }])->get();

    return response()->json([
      'variants' => ProductVaraintResource::collection($variants)
    ]);
  }
}
