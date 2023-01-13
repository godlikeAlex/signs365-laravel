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
    $categoriesWithProducts = ProductCategory::availableInCity($request->get('city'))
      ->publishedProducts(6)
      ->get();

    return ['categories' => CategoryResource::collection($categoriesWithProducts)];
  }
}
