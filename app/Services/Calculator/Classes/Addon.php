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

  public function calculate($price, $sqft)
  {
    $calculatedPrice = $this->getPriceByCondition(
      $this->model->condition,
      $price,
      $sqft
    );

    return $calculatedPrice;
  }

  public function getModel()
  {
    return $this->model;
  }

  private function getPriceByCondition($condition, $currentPrice, $sqft = 1)
  {
    $regExpNumber = "/[+-]\d*$/m";
    $regExpWithPrecentage = "/[+-]\d*%$/m";

    info($condition);
    info($currentPrice);
    info($this->model->type);

    if ($this->model->type === AddonTypeEnum::SQFT->value) {
      $conditionPrice = intval($condition) * 100;

      return $conditionPrice * $sqft;
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
