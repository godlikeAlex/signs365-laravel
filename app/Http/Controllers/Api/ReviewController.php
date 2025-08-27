<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductReviewResource;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
  public function index(Request $request, Product $product)
  {
    $reviews = $product->reviews()->published();

    $sort = $this->resolveSort($request->query("sort", "created_at,desc"));

    if ($sort) {
      list($sortColumn, $sortDirection) = $sort;

      $reviews->orderBy($sortColumn, $sortDirection);

      $reviews->orderBy("created_at", "desc");
    }

    return ProductReviewResource::collection($reviews->paginate(5));
  }

  public function createReview(Request $request, Product $product)
  {
    $user = auth()->user();

    info($user);

    $review = Review::create([
      "review" => $request->input("review"),
      "rating" => $request->input("rating"),
      "product_id" => $product->id,
    ]);

    if ($user) {
      $review->update([
        "user_id" => $user->id,
      ]);
    } else {
      $review->update([
        "reviewer_name" => $request->input("name"),
        "reviewer_email" => $request->input("email"),
      ]);
    }

    if ($request->hasFile("media")) {
      foreach ($request->file("media") as $media) {
        $path = $media->store("reviews", "public");

        $review->media()->create([
          "file_path" => $path,
          "file_type" => str_starts_with($media->getMimeType(), "video")
            ? "video"
            : "image",
        ]);
      }
    }

    return response()->noContent();
  }

  private function resolveSort($sort)
  {
    $sortData = explode(",", $sort);

    if (count($sortData) < 2) {
      return null;
    }

    return $sortData;
  }
}
