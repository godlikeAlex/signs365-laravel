<?php

namespace App\Http\Resources;

use App\Enums\OptionTypeEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class OptionResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $sizeList = $this->sizeList;

    return [
      "id" => $this->id,
      "title" => $this->title,
      "price" => $this->price,
      "type" => $this->type,
      "validation" => [
        "max_width" => $this->max_width,
        "max_height" => $this->max_height,
      ],
      "showCalculator" =>
        $this->size_for_collect ||
        $this->sizeList ||
        $this->type === OptionTypeEnum::SQFT,
      "show_custom_sizes" => $this->show_custom_sizes,
      "size_for_collect" => $this->size_for_collect,
      "common_data" => $this->when(
        $this->size_for_collect && !$this->show_custom_sizes,
        $this->common_data
      ),
      "customSizes" => is_null($this->sizeList)
        ? []
        : CustomSizeResource::collection($this->sizeList->sizeItems),
      "addons" => AddonResource::collection($this->addons),
    ];
  }
}
