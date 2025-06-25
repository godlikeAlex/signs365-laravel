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
      "address" => $this->address,
      "amount" => $this->amount / 100,
      "tax" => $this->tax / 100,
      "created_at" => $this->created_at,
      "order_items" => OrderItemResource::collection($this->orderItems),
    ];
  }
}
