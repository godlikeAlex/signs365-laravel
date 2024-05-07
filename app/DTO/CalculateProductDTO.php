<?php

namespace App\DTO;

use App\Models\Product;
use App\Models\ProductOption;

class CalculateProductDTO
{
  public function __construct(
    public Product $product,
    public ProductOption $productOption,
    public int $quantity,
    public int $sqft
  ) {}
}
