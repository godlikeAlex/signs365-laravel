<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
    return Inertia::render("Home", [
      "title" => "Signs7 - Custom Signs & Graphics",
    ]);
  }

  public function about()
  {
    return Inertia::render("About", [
      "title" => "About Us",
    ]);
  }

  public function privacy()
  {
    return Inertia::render("Privacy", [
      "title" => "Privacy Policy",
    ]);
  }

  public function terms()
  {
    return Inertia::render("Terms", [
      "title" => "Terms and Conditions",
    ]);
  }

  public function contacts()
  {
    return Inertia::render("Contacts", [
      "title" => "Contacts",
    ]);
  }
}
