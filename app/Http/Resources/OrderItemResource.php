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
      "product" => $this->product()
        ->with("images")
        ->withTrashed()
        ->first(),
      "product_id" => $this->product_id,
      "images" => $this->images,
    ];
  }
}
