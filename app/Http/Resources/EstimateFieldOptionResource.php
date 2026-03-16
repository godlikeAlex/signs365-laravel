<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EstimateFieldOptionResource extends JsonResource
{
  public function toArray($request)
  {
    return [
      "id" => $this->id,
      "title" => $this->title,
      "type" => $this->type,
      "condition" => $this->condition,
      "disclaimer" => $this->disclaimer,
      "is_active" => (bool) $this->is_active,
    ];
  }
}
