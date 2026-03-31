<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryWithOutProducts extends JsonResource
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
      "slug" => $this->slug,
      "icon" => $this->icon,
      "active_icon" => $this->icon_active,
      "colors" => [
        "primary" => $this->primary_color,
        "alternative" => $this->alternative_color,
      ],
      "show_on_home" => $this->show_on_home,
    ];
  }
}
