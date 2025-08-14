<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductCardResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $categories = $this->categories()->get();

    return [
      "id" => $this->id,
      "title" => $this->title,
      "slug" => $this->slug,
      "short_description" => $this->short_description,
      "min_price" => $this->getMinPrice(),
      "categories" => ProductSimpleCategoryResource::collection($categories),
      "images" => ProductImageResource::collection($this->images),
    ];
  }

  private function getMinPrice()
  {
    if (!$this->relationLoaded("options")) {
      return null;
    }

    $minPrice = $this->options->min("min_price");

    return $minPrice ? $minPrice / 100 : null;
  }
}
