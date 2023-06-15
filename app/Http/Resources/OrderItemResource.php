<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
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
      "quantity" => $this->quantity,
      "price" => $this->price / 100,
      "product_variant_title" => $this->variant->label,
      "product" => $this->product()
        ->withTrashed()
        ->first(),
      "product_id" => $this->product_id,
    ];
  }
}
