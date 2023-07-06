<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AddonResource extends JsonResource
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
      "title" => $this->title,
      "condition" => $this->condition,
      "withQuantity" => $this->with_qty,
      "validation" => $this->when($this->with_qty, [
        "min-qty" => $this["min-qty"],
        "max-qty" => $this["max-qty"],
      ]),
    ];
  }
}
