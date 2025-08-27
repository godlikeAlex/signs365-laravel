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
    if ($this->user) {
      $userName = $this->user->name;
    } elseif ($this->reviewer_name) {
      $userName = $this->reviewer_name;
    } else {
      $userName = "Deleted User";
    }

    return [
      "id" => $this->id,
      "user" => [
        "name" => $userName,
        "avatar" => $this->user ? $this->user->avatar : null,
      ],
      "media" => $this->media,
      "review" => $this->review,
      "rating" => $this->rating,
      "date" => $this->created_at,
    ];
  }
}
