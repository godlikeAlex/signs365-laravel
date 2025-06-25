<?php

namespace App\DTO;

use App\Models\Shipping;

class CalculateShippingDTO
{
  public function __construct(
    public Shipping|null $shipping,
    public int $width,
    public int $height,
    public int $sqft,
  )
  {}
}
