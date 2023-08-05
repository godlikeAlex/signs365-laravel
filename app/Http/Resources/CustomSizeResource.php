<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomSizeResource extends JsonResource
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
      "width" => $this->width,
      "height" => $this->height,
      "label" => $this->label,
      "product_option_id" => $this->product_option_id,
    ];
  }
}
