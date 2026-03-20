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
      "min_price" => (int) ($this->min_price ?? 0),
      "disclaimer" => $this->disclaimer,
      "extra_inputs" => $this->extra_inputs ?? [],
      "is_active" => (bool) $this->is_active,
    ];
  }
}
