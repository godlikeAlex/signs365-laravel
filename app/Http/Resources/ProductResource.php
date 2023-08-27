<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class ProductResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param Request $request
   * @return array|Arrayable|JsonSerializable
   */
  public function toArray($request)
  {
    $categories = $this->categories()
      ->whereHas("cities", function ($query) use ($request) {
        info($request->get("city"));
        return $query->where("city_id", $request->get("city"));
      })
      ->get();

    return [
      "id" => $this->id,
      "title" => $this->title,
      "slug" => $this->slug,
      "description" => $this->description,
      "with_checkout" => $this->with_checkout,
      "published" => $this->published,
      // "min_price" => $this->min_price / 100,
      "min_price" => 0,
      "images" => ProductImageResource::collection($this->images),

      "seo_title" => $this->seo_title,
      "seo_desc" => $this->seo_desc,
      "seo_keywords" => $this->seo_keywords,

      "options" => OptionResource::collection($this->whenLoaded("options")),

      "categories" => ProductSimpleCategoryResource::collection($categories),
    ];
  }
}
