<?php

namespace App\Services\Calculator\Classes;

use App\Enums\OptionTypeEnum;
use App\Models\ProductOption;
use Illuminate\Database\Eloquent\Model;

class Option
{
  public Model $model;

  public function __construct($option)
  {
    $this->model = $option;
  }

  public function getPrice($quantity = 1, $sqft)
  {
    switch ($this->model->type) {
      case OptionTypeEnum::SQFT:
        return $this->calculateSQFT($sqft);
      case OptionTypeEnum::SINGLE:
        return $this->calculateSingle();
      case OptionTypeEnum::BY_QTY:
        return $this->calculateByQTY($quantity);
    }
  }

  public function currentTypeIs($type)
  {
    return $this->model->type === $type;
  }

  public function applyAddons($addons)
  {
  }

  private function calculateSQFT($sqft)
  {
    info("model price", [
      "price" => $this->model->price,
      "sqft" => $sqft,
    ]);
    return $this->model->price * $sqft;
  }

  private function calculateSingle()
  {
    return $this->model->price;
  }

  private function calculateByQTY($quantity)
  {
    $rangePrices = collect($this->model->range_prices);

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

    return $priceForSpecificQuantity ? $priceForSpecificQuantity["price"] : 0;
  }
}
