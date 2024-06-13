<?php

namespace App\DTO;

use App\Models\Product;
use App\Models\ProductAddons;
use App\Models\ProductOption;

class CalculateAddonsDTO
{
  public function __construct(
    public array $addons,
    public ProductOption $productOption,
    public int $productPrice,
    public int $width,
    public int $height,
    public int $sqft,
    public $unit,
    public ?ProductAddons $addon = null
  ) {
  }
}
