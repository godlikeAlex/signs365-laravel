<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrdersResource;
use App\Models\OrderItem;
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

  public function getImagesOrderItem($orderItemID)
  {
    $orderItem = OrderItem::find($orderItemID);

    if ($orderItem) {
      return response()->json(["images" => $orderItem->images]);
    }

    return response()->json(["images" => []]);
  }

  public function orderItemImageDelete($orderItemID)
  {
    $orderItem = OrderItem::find($orderItemID);

    if ($orderItem) {
      $images = collect($orderItem->images)->filter(
        fn($path) => request()->path != $path
      );

      $orderItem->update(["images" => $images->values()]);

      return response()->json(["ok" => true]);
    }

    return response()->json(["ok" => false]);
  }

  public function orderItemImageUpload($orderItemID, Request $request)
  {
    $orderItem = OrderItem::find($orderItemID);

    if (!$orderItem) {
      return response()->json(["ok" => false]);
    }

    if ($request->hasFile("files")) {
      $images = collect($orderItem->images);
      $uploadedImages = collect([]);

      foreach ($request->file("files") as $file) {
        $path = $file->store("cart", "public");

        $uploadedImages->add($path);
      }

      $mergedImages = $images->merge($uploadedImages)->values();

      $orderItem->update(["images" => $mergedImages]);
    }

    return response()->json(["ok" => true]);
  }
}
