<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Services\Estimate\CartService as EstimateCartService;
use Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EstimateCartController extends Controller
{
  private EstimateCartService $cart;

  public function index()
  {
    return Inertia::render("EstimateCart");
  }
}
