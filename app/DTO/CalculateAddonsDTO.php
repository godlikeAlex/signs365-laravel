<?php

namespace App\DTO;

use App\Models\Product;
use App\Models\ProductAddons;

class CalculateAddonsDTO
{
  public function __construct(
    public array $addons,
    public Product $product,
    public int $productPrice,
    public int $width,
    public int $height,
    public int $sqft,
    public $unit,
    public ?ProductAddons $addon = null,
  ) {}
}
