<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class CartResource extends JsonResource
{
  public $city;

  public function __construct($resource, $city)
  {
    parent::__construct($resource);
    $this->city = $city;
  }

  /**
   * Transform the resource into an array.
   *
   * @param Request $request
   * @return array|Arrayable|JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id
    ];
  }
}
