<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrdersResource;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
  public function list(Request $request)
  {
    $user = $request->user();

    $orders = $user
      ->orders()
      ->orderBy("created_at", "DESC")
      ->latest()
      ->paginate(2);

    return OrderResource::collection($orders);
  }
}
