<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
    return Inertia::render("Home", [
      "title" => "Home Page",
    ]);
  }

  public function about()
  {
    return Inertia::render("About", [
      "title" => "About Us",
    ]);
  }
}
