<?php

namespace App\Services\Calculator\Classes;

use App\Enums\AddonTypeEnum;
use Illuminate\Database\Eloquent\Model;

class Addon
{
  private Model $model;

  public function __construct($product, $addon_id, $sqft = 1)
  {
    $this->model = $product->addons()->find($addon_id);

    if (!$this->model) {
      abort(400, "Addons not found");
    }
  }

  public function calculate(
    $price,
    $sqft,
    $qty,
    $unit = "feet",
    $width = 1,
    $height = 1
  ) {
    $calculatedPrice = $this->getPriceByCondition(
      $this->model->condition,
      $price,
      $sqft,
      $unit,
      $width,
      $height
    );

    if ($this->model->with_qty) {
      $calculatedPrice += $this->model->per_item_price * $qty;
    }

    return $calculatedPrice;
  }

  public function getModel()
  {
    return $this->model;
  }

  private function getPriceByCondition(
    $condition,
    $currentPrice,
    $sqft = 1,
    $unit,
    $width,
    $height
  ) {
    $regExpNumber = "/[+-]\d*$/m";
    $regExpWithPrecentage = "/[+-]\d*%$/m";

    if ($this->model->type === AddonTypeEnum::SQFT) {
      $conditionPrice = intval($condition) * 100;

      return $conditionPrice * $sqft;
    }

    if ($this->model->type === AddonTypeEnum::LINEAR_FOOT) {
      $linerfoot = 1;
      $conditionPrice = intval($condition) * 100;

      if ($unit === "feet") {
        $linerfoot = ($width + $height) * 2;
      } else {
        $linerfoot = (($width + $height) * 2) / 12;
      }

      return $linerfoot * $conditionPrice;
    }

    // Check condition is number
    if (preg_match($regExpNumber, $condition)) {
      $fee = intval($condition) * 100;

      return $fee;
    }

    // Check condition is %
    if (preg_match($regExpWithPrecentage, $condition)) {
      $percent = intval(str_replace("%", "", $condition)) / 100;

      return $currentPrice * $percent;
    }

    return 0;
  }
}
