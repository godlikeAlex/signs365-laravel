<?php

namespace App\DTO\Estimate;

class AddToEstimateCartDTO
{
  public function __construct(
    public int $productID,
    public int $formID,
    public string $title,
    public int $quantity,
    public int $price,
    public array $payload = []
  ) {
  }
}
