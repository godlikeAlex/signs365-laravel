<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class CategoryResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param Request $request
   * @return array|Arrayable|JsonSerializable
   */
  public function toArray($request)
  {
    return [
      "id" => $this->id,
      "title" => $this->title,
      "slug" => $this->slug,
      "icon" => $this->icon,
      "show_on_home" => $this->show_on_home,
      "products" => ProductResource::collection($this->products)->take(10),
    ];
  }
}
