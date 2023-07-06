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
      "start_at" => 0,
      "images" => $this->images,
      // new

      "sizes" => $this->whenNotNull($this->sizes),
      "options" => OptionResource::collection($this->whenLoaded("options")),
      "addons" => AddonResource::collection($this->whenLoaded("addons")),

      //
      "categories" => ProductSimpleCategoryResource::collection($categories),
    ];
  }
}
