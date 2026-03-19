<?php

namespace App\Services\Estimate;

use App\Enums\AddonTypeEnum;
use App\Enums\EstimateFormTypeEnum;
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
    $shippingPrice = 0;

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
      if ($form->type !== EstimateFormTypeEnum::PER_QTY) {
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

  private function calculateFormPrice(
    EstimateForm $form,
    int $quantity,
    float $sqft
  ): float {
    $calculated = match ($form->type) {
      EstimateFormTypeEnum::SQFT => (float) $form->price * $sqft,
      EstimateFormTypeEnum::SINGLE => (float) $form->price,
      EstimateFormTypeEnum::BY_QTY => $this->getRangePrice(
        $form->range_prices ?? [],
        $quantity
      ),
      EstimateFormTypeEnum::PER_QTY => $this->getRangePrice(
        $form->per_quantity_prices ?? [],
        $quantity
      ),
      EstimateFormTypeEnum::NO_BASE => 0,
      default => 0,
    };

    if ($form->type === EstimateFormTypeEnum::NO_BASE) {
      return 0;
    }

    $minPrice = (int) $form->min_price;

    return max($calculated, $minPrice);
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

    $fieldsCollection = $form
      ->fields()
      ->with("options")
      ->get();
    $fieldsByID = $fieldsCollection->keyBy("id");
    $optionsByID = collect([]);

    foreach ($fieldsCollection as $formField) {
      foreach ($formField->options as $option) {
        $optionsByID->put($option->id, [$formField, $option]);
      }
    }

    foreach ($fields as $fieldData) {
      $optionID = (int) ($fieldData["option_id"] ?? ($fieldData["id"] ?? 0));
      $fieldID = (int) ($fieldData["field_id"] ?? ($fieldData["id"] ?? 0));

      /** @var EstimateField|null $field */
      $field = null;
      $option = null;

      if ($optionID > 0 && $optionsByID->has($optionID)) {
        [$field, $option] = $optionsByID->get($optionID);
      } elseif ($fieldID > 0 && $fieldsByID->has($fieldID)) {
        $field = $fieldsByID->get($fieldID);
      }

      if (!$field || !$field->is_active) {
        continue;
      }

      if ($option) {
        if (!$option->is_active) {
          continue;
        }

        $total += $this->calculateSingleAddonPrice(
          $option->type,
          (string) $option->condition,
          $formPrice,
          $sqft,
          $unit,
          $width,
          $height
        );

        $calculated->push([
          "field_id" => $field->id,
          "option_id" => $option->id,
        ]);
        continue;
      }

      // Backward compatibility for old flat fields.
      $total += $this->calculateSingleAddonPrice(
        $field->type,
        (string) $field->condition,
        $formPrice,
        $sqft,
        $unit,
        $width,
        $height
      );

      $calculated->push([
        "field_id" => $field->id,
        "option_id" => null,
      ]);
    }

    return [$total, $calculated];
  }

  private function calculateSingleAddonPrice(
    AddonTypeEnum|string|null $type,
    string $condition,
    float $currentPrice,
    float $sqft,
    string $unit,
    float $width,
    float $height
  ): float {
    if (!$type) {
      return 0;
    }

    if (is_string($type)) {
      try {
        $type = AddonTypeEnum::from($type);
      } catch (\Throwable $exception) {
        return 0;
      }
    }

    if ($type === AddonTypeEnum::SQFT) {
      return intval($condition) * 100 * $sqft;
    }

    if ($type === AddonTypeEnum::LINEAR_FOOT) {
      $conditionPrice = intval($condition) * 100;
      $linearFoot =
        $unit === "feet"
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
    $price = collect($ranges)->first(function ($range) use ($desiredNumber) {
      $from = intval($range["from"] ?? 0);
      $to = intval($range["to"] ?? 0);

      if ($to === -1 && $desiredNumber >= $from) {
        return true;
      }

      return $desiredNumber >= $from && $desiredNumber <= $to;
    });

    return $price ? (float) ($price["price"] ?? 0) : 0;
  }

  private function getWidthHeightRangePrice(
    array $ranges,
    float $width,
    float $height
  ): float {
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

    return (float) ($ranges[0]["price"] ?? 0);
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
