<?php

namespace App\Services\Estimate;

use App\Enums\AddonTypeEnum;
use App\Enums\OptionTypeEnum;
use App\Models\EstimateField;
use App\Models\EstimateForm;
use App\Models\Product;

class CalculatorService
{
  public function calculate(
    int $productID,
    int $estimateFormID,
    float $width,
    float $height,
    int $quantity,
    array $fields = [],
    string $unit = "inches",
    bool $priceWithoutQuantity = false
  ): array {
    $product = Product::query()->find($productID);

    if (!$product || !$product->is_estimate) {
      throw new \Exception("Estimate product not found.");
    }

    /** @var EstimateForm|null $form */
    $form = $product->estimateForms()->find($estimateFormID);

    if (!$form || !$form->is_active) {
      throw new \Exception("Estimate form not found.");
    }

    $sqft = $this->getSQFT($width, $height, $unit);

    $formPrice = $this->calculateFormPrice($form, $quantity, $sqft);
    $shippingPrice = $this->calculateShippingPrice($form, $width, $height, $sqft);

    [$fieldsPrice, $calculatedFields] = $this->calculateFields(
      $form,
      $fields,
      $formPrice,
      $width,
      $height,
      $sqft,
      $unit
    );

    $total = $formPrice + $shippingPrice + $fieldsPrice;

    if (!$priceWithoutQuantity) {
      if ($form->type !== OptionTypeEnum::PER_QTY) {
        $total = $total * $quantity;
      }
    }

    return [
      (int) round($total),
      number_format(round($total / 100, 2), 2),
      (int) round($shippingPrice),
      $calculatedFields,
    ];
  }

  private function calculateFormPrice(EstimateForm $form, int $quantity, float $sqft): float
  {
    $minPrice = (int) $form->min_price;

    $calculated = match ($form->type) {
      OptionTypeEnum::SQFT => (float) $form->price * $sqft,
      OptionTypeEnum::SINGLE => (float) $form->price,
      OptionTypeEnum::BY_QTY => $this->getRangePrice($form->range_prices ?? [], $quantity),
      OptionTypeEnum::PER_QTY => $this->getRangePrice($form->per_quantity_prices ?? [], $quantity),
      default => 0,
    };

    return max($calculated, $minPrice);
  }

  private function calculateShippingPrice(EstimateForm $form, float $width, float $height, float $sqft): float
  {
    if (!$form->shipping) {
      return 0;
    }

    $shipping = $form->shipping;

    return match ($shipping->type->value) {
      "single" => $shipping->condition["price"] ?? 0,
      "sqft" => $this->getRangePrice($shipping->condition["range_sqft"] ?? [], $sqft),
      "widthxheight" => $this->getWidthHeightRangePrice(
        $shipping->condition["range_wh"] ?? [],
        $width,
        $height
      ),
      default => 0,
    };
  }

  private function calculateFields(
    EstimateForm $form,
    array $fields,
    float $formPrice,
    float $width,
    float $height,
    float $sqft,
    string $unit
  ): array {
    $total = 0;
    $calculated = collect([]);

    foreach ($fields as $fieldData) {
      $fieldID = (int) ($fieldData["id"] ?? 0);
      $fieldQty = (int) ($fieldData["quantity"] ?? 0);

      /** @var EstimateField|null $field */
      $field = $form->fields()->find($fieldID);

      if (!$field || !$field->is_active) {
        continue;
      }

      $total += $this->calculateSingleField(
        $field,
        $formPrice,
        $sqft,
        $unit,
        $width,
        $height
      );

      if ($field->with_qty) {
        $safeQty = max($field->min_qty ?? 0, $fieldQty);

        if (($field->max_qty ?? 0) > 0) {
          $safeQty = min($safeQty, (int) $field->max_qty);
        }

        $total += (int) $field->per_item_price * $safeQty;
      }

      $calculated->push($field);
    }

    return [$total, $calculated];
  }

  private function calculateSingleField(
    EstimateField $field,
    float $currentPrice,
    float $sqft,
    string $unit,
    float $width,
    float $height
  ): float {
    $condition = (string) $field->condition;

    if ($field->type === AddonTypeEnum::SQFT) {
      return intval($condition) * 100 * $sqft;
    }

    if ($field->type === AddonTypeEnum::LINEAR_FOOT) {
      $conditionPrice = intval($condition) * 100;
      $linearFoot = $unit === "feet"
        ? ($width + $height) * 2
        : (($width + $height) * 2) / 12;

      return $linearFoot * $conditionPrice;
    }

    if (preg_match('/^[+-][0-9]+(\.[0-9]{1,2})?$/', $condition)) {
      return (float) $condition * 100;
    }

    if (preg_match('/^[+-][0-9]+(\.[0-9]{1,2})?%$/', $condition)) {
      $percent = floatval(str_replace("%", "", $condition)) / 100;
      return $currentPrice * $percent;
    }

    return 0;
  }

  private function getSQFT(float $width, float $height, string $unit): float
  {
    $square = $width * $height;

    if ($unit === "feet") {
      return $square;
    }

    return $square / 144;
  }

  private function getRangePrice(array $ranges, float|int $desiredNumber): float
  {
    $price = collect($ranges)
      ->first(function ($range) use ($desiredNumber) {
        $from = intval($range["from"] ?? 0);
        $to = intval($range["to"] ?? 0);

        if ($to === -1 && $desiredNumber >= $from) {
          return true;
        }

        return $desiredNumber >= $from && $desiredNumber <= $to;
      });

    return $price ? (float) ($price["price"] ?? 0) : 0;
  }

  private function getWidthHeightRangePrice(array $ranges, float $width, float $height): float
  {
    $price = collect($ranges)->first(function ($range) use ($width, $height) {
      $fromWidth = floatval($range["from_width"] ?? 0);
      $toWidth = floatval($range["to_width"] ?? 0);
      $fromHeight = floatval($range["from_height"] ?? 0);
      $toHeight = floatval($range["to_height"] ?? 0);

      return $this->isNumberInRange($fromWidth, $toWidth, $width) &&
        $this->isNumberInRange($fromHeight, $toHeight, $height);
    });

    if ($price) {
      return (float) ($price["price"] ?? 0);
    }

    return (float) (($ranges[0]["price"] ?? 0));
  }

  private function isNumberInRange(float $from, float $to, float $target): bool
  {
    if ($to === -1.0 && $target >= $from) {
      return true;
    }

    if ($from === -1.0 && $to === -1.0) {
      return true;
    }

    return $target >= $from && $target <= $to;
  }
}
