<?php

namespace App\Services\Calculator\Classes;

use App\Models\ProductOption;
use Illuminate\Database\Eloquent\Model;

class Option
{
  public Model $model;
  public function __construct($product, $option_id)
  {
    $productOption = $product->options->find($option_id);

    if (!$productOption) {
      abort(400, "Product Option not found");
    }

    $this->model = $productOption;
  }

  public function getPrice($quantity = 1, $sqft = 1)
  {
    switch ($this->model->type) {
      case "sqft":
        return $this->calculateSQFT($sqft);
      case "single":
        return $this->calculateSingle();
      case "qty":
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
    return $this->model->price * $sqft;
  }

  private function calculateSingle()
  {
  }

  private function calculateByQTY($quantity)
  {
    // return $this->price
  }
}
