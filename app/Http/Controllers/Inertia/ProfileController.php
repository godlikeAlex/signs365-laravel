<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
  public function __construct(Request $request)
  {
    if (!$request->user()) {
      return Inertia::render("Login");
    }
  }

  public function indexProfile(Request $request)
  {
    $user = $request->user();

    $orders = $user
      ->orders()
      ->paid()
      ->orderBy("created_at", "DESC")
      ->latest()
      ->paginate(5);

    return Inertia::render("Profile", [
      "orders" => OrderResource::collection($orders),
    ]);
  }

  public function edit(Request $request)
  {
    return Inertia::render("EditProfile");
  }
}
