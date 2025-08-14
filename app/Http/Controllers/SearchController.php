<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCardResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
  public function search(Request $request)
  {
    $searchTerm = $request->query("query");

    $result = Product::published()
      ->where("title", "like", "%{$searchTerm}%")
      ->whereHas("categories")
      ->get();

    $products = ProductCardResource::collection($result);

    $products->wrap(null);

    return Inertia::render("SearchResult", [
      "searchTerm" => $searchTerm,
      "products" => $products,
    ]);
  }
}
