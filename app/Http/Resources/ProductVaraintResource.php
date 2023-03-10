<?php

namespace App\Http\Resources;

use App\Models\ProductPrice;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVaraintResource extends JsonResource
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
      "label" => $this->label,
      "price" => ProductPriceResource::make($this->price)->price / 100,
    ];
  }
}
