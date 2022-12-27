<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DomainsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
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
