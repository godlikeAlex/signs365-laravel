<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductSimpleCategoryResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      "id" => $this->id,
      "title" => $this->title,
      "slug" => $this->slug,
      "colors" => [
        "primary" => $this->primary_color,
        "alternative" => $this->alternative_color,
      ],
    ];
  }
}
