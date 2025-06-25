<?php

namespace App\DTO;

class AddToCartDTO
{
  public int $productID;
  public int $optionID;
  public array $addons;
  public int $quantity;
  public string $unit;
  public int $width;
  public int $height;
  public int|null $size_id;
  public array|null $images;

  public function __construct(
    int $productID,
    int $optionID,
    array $addons,
    int $quantity,
    string $unit,
    int $width,
    int $height,
    int|null $size_id,
    array|null $images
  ) {
    $this->productID = $productID;
    $this->optionID = $optionID;
    $this->addons = $addons;
    $this->quantity = $quantity;
    $this->unit = $unit;
    $this->width = $width;
    $this->height = $height;

    $this->size_id = $size_id;
    $this->images = $images;
  }
}
