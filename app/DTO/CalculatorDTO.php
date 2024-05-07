<?php

namespace App\DTO;

class CalculatorDTO
{
  public function __construct(
    public int $productID,
    public int $productOptionID,
    public int $width,
    public int $height,
    public int $quantity,
    public array $addons = [],
    public string $unit = "inches",
    public string $type = "calculator"
  ) {}
}
