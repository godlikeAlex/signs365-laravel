<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EstimateFieldResource extends JsonResource
{
  public function toArray($request)
  {
    return [
      "id" => $this->id,
      "title" => $this->title,
      "field_type" => $this->field_type ?: "radio",
      "is_required" => (bool) $this->is_required,
      "cart_label" => $this->cart_label,
      "disclaimer" => $this->disclaimer,
      "is_active" => (bool) $this->is_active,
      "options" => EstimateFieldOptionResource::collection($this->options),
    ];
  }
}
