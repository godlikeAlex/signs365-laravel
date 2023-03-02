<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartItemsResource extends JsonResource
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
      "name" => $this->name,
      "price" => $this->price / 100,
      "quantity" => $this->quantity,
      "attributes" => $this->attributes,
      "conditions" => $this->conditions,
      "associatedModel" => $this->associatedModel,
      "disabled" => $this->disabled,
    ];
  }
}
