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
      "extra_data_type" => $this->extra_data_type,
      "group_addon" => $this->group_addon,
      "validation" => $this->when($this->with_qty, [
        "min-qty" => $this["min-qty"],
        "max-qty" => $this["max-qty"],
      ]),
    ];
  }
}
