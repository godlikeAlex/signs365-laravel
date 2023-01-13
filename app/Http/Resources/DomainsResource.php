<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class DomainsResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param Request $request
   * @return array|Arrayable|JsonSerializable
   */
  public function toArray($request)
  {
    $DOMAIN = env('APP_DOMAIN');

    return [
      'id' => $this->id,
      'domain' => "https://{$this->domain}.${DOMAIN}"
    ];
  }
}
