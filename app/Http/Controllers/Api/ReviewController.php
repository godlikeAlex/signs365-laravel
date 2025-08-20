<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
  public function index(Request $request)
  {
    $reviews = Review::published()->latest();

    $sort = $this->resolveSort($request->query("sort", "created_at,desc"));

    if ($sort) {
      list($sortColumn, $sortDirection) = $sort;

      $reviews->orderBy($sortColumn, $sortDirection);
    }

    return ProductReviewResource::collection($reviews->paginate(2));
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
