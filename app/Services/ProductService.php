<?php

namespace App\Services;

use App\DTO\CalculateProductDTO;
use App\Enums\OptionTypeEnum;
use App\Models\Product;
use App\Models\ProductOption;

class ProductService
{
  private ProductOption $productOption;
  public function calculatePrice(CalculateProductDTO $calculateProductDTO): int
  {
    $this->productOption = $calculateProductDTO->productOption;

    $sqft = $calculateProductDTO->sqft;
    $quantity = $calculateProductDTO->quantity;

    $minPrice = $this->productOption->min_price;

    $calculatedPrice = match ($this->productOption->type) {
      OptionTypeEnum::SQFT => $this->calculateProductOptionSQFT($sqft),
      OptionTypeEnum::SINGLE => $this->calculateProductOptionSingle(),
      OptionTypeEnum::BY_QTY => $this->calculateProductOptionByQTY($quantity),
      OptionTypeEnum::PER_QTY => $this->calculateProductOptionPerQuantity(
        $quantity
      ),
      default => 0,
    };

    info("test service", [
      "type" => $this->productOption->type,
      "calculated_price" => $calculatedPrice,
      "product_option" => $this->productOption,
    ]);

    return max($calculatedPrice, $minPrice);
  }

  private function calculateProductOptionSQFT($sqft): int
  {
    return $this->productOption->price * $sqft;
  }

  private function calculateProductOptionSingle(): int
  {
    return $this->productOption->price;
  }

  private function calculateProductOptionByQTY($quantity): int
  {
    $rangePrices = collect($this->productOption->range_prices);

    $priceForSpecificQuantity = $rangePrices
      ->filter(function ($rangeOfPrice) use ($quantity) {
        $from = intval($rangeOfPrice["from"]);
        $to = intval($rangeOfPrice["to"]);

        // -1 from $quanty to infinity
        if ($quantity >= $from && $to === -1) {
          return true;
        }

        if ($quantity >= $from && $quantity <= $to) {
          return true;
        } else {
          return false;
        }
      })
      ->first();

    info($priceForSpecificQuantity);

    return $priceForSpecificQuantity ? $priceForSpecificQuantity["price"] : 0;
  }

  private function calculateProductOptionPerQuantity($quantity): int
  {
    $rangePrices = collect($this->productOption->per_quantity_prices);

    $priceForSpecificQuantity = $rangePrices
      ->filter(function ($rangeOfPrice) use ($quantity) {
        $from = intval($rangeOfPrice["from"]);
        $to = intval($rangeOfPrice["to"]);

        // -1 from $quanty to infinity
        if ($quantity >= $from && $to === -1) {
          return true;
        }

        if ($quantity >= $from && $quantity <= $to) {
          return true;
        } else {
          return false;
        }
      })
      ->first();

    info($priceForSpecificQuantity);

    return $priceForSpecificQuantity ? $priceForSpecificQuantity["price"] : 0;
  }
}
