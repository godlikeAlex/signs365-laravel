<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductReviewResource extends JsonResource
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
      "user" => [
        "name" => $this->user ? $this->user->name : "Deleted User",
        "avatar" => $this->user ? $this->user->avatar : null,
      ],
      "review" => $this->review,
      "rating" => $this->rating,
      "date" => $this->created_at,
    ];
  }
}
