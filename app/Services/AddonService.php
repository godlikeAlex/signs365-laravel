<?php

namespace App\Services;

use App\DTO\CalculateAddonsDTO;
use App\Enums\AddonTypeEnum;
use App\Models\Product;
use App\Models\ProductAddons;

class AddonService
{
  public function calculate(CalculateAddonsDTO $calculateAddonsDTO): array {
    $totalAddonsPrice = 0;
    $actualAddons = collect([]);

    foreach ($calculateAddonsDTO->addons as $addon) {
      $actualAddon = $this->getAddonInProduct($calculateAddonsDTO->product);

      if (!$actualAddon) {
        continue;
      }

      $calculateAddonsDTO->addon = $actualAddon;

      $totalAddonsPrice += $this->calculateSingleAddon($calculateAddonsDTO, $actualAddon);

      if ($actualAddon->with_qty) {
        $totalAddonsPrice += $actualAddon->per_item_price * ($addon["quantity"] ?? 0);
      }

      $actualAddons->push($actualAddon);
    }

    return [$totalAddonsPrice, $actualAddons];
  }

  private function calculateSingleAddon(CalculateAddonsDTO $calculateAddonDTO) {
    $addon = $calculateAddonDTO->addon;
    $width = $calculateAddonDTO->width;
    $height = $calculateAddonDTO->height;
    $sqft = $calculateAddonDTO->sqft;
    $unit = $calculateAddonDTO->unit;
    $currentPrice = $calculateAddonDTO->productPrice;

    $type = $addon->type;
    $condition = $addon->condition;

    $regExpNumber = "/[+-]\d*$/m";
    $regExpWithPercent = "/[+-]\d*%$/m";

    if ($type === AddonTypeEnum::SQFT) {
      $conditionPrice = intval($condition) * 100;

      return $conditionPrice * $sqft;
    }

    if ($type === AddonTypeEnum::LINEAR_FOOT) {
      $conditionPrice = intval($condition) * 100;

      if ($unit === "feet") {
        $linerFoot = ($width + $height) * 2;
      } else {
        $linerFoot = (($width + $height) * 2) / 12;
      }

      return $linerFoot * $conditionPrice;
    }

    // Check condition is number
    if (preg_match($regExpNumber, $condition)) {
      return intval($condition) * 100;
    }

    // Check condition is %
    if (preg_match($regExpWithPercent, $condition)) {
      $percent = intval(str_replace("%", "", $condition)) / 100;

      return $currentPrice * $percent;
    }

    return 0;
  }

  private function getAddonInProduct(Product $product, int $addonID) {
    return $product->addons()->where('id', $addonID)->first();
  }
}
