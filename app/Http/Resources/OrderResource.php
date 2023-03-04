<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
      "uuid" => $this->uuid,
      "status" => $this->status,
      "total" => $this->total / 100,
      "total_without_tax" => $this->total_without_tax / 100,
      "address" => $this->address,
    ];
  }
}
