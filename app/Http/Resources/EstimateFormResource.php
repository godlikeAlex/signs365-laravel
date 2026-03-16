<?php

namespace App\Http\Resources;

use App\Enums\OptionTypeEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class EstimateFormResource extends JsonResource
{
  public function toArray($request)
  {
    return [
      "id" => $this->id,
      "title" => $this->title,
      "type" => $this->type,
      "price" => (int) $this->price,
      "min_price" => (int) $this->min_price,
      "showCalculator" => $this->type === OptionTypeEnum::SQFT,
      "fields" => EstimateFieldResource::collection($this->fields),
    ];
  }
}
