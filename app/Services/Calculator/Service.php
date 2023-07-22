<?php
namespace App\Services\Calculator;

use App\Models\Product;
use App\Models\ProductOption;
use App\Services\Calculator\Classes\Addon;
use App\Services\Calculator\Classes\Option;

class Service
{
  private $product = null;

  public int $width;
  public int $height;
  public mixed $selectedOption;
  public int $quantity;
  private int $selectedOptionID;
  public $addons = [];
  public string $unit = "inches";
  private $type = "calculator";

  public $total = 0;

  public function __construct(
    $productID,
    $width,
    $height,
    $addons = [],
    $selectedOptionID = null,
    $unit = "inches",
    $quantity = 1
  ) {
    $product = Product::find($productID);

    if (!$product) {
      abort(400, "CalcService Product not found");
    }

    $this->quantity = intval($quantity);

    $this->product = $product;

    $this->width = intval($width);
    $this->height = intval($height);
    $this->unit = $unit;

    $this->addons = $addons;

    $this->selectedOptionID = $selectedOptionID;
  }

  public function calculate()
  {
    if ($this->type === "calculator") {
      return $this->calculateCalculatorProduct();
    }

    return "";
  }

  private function calculateCalculatorProduct()
  {
    $sqft = $this->calculateSQFT();

    $selectedOption = new Option($this->product, $this->selectedOptionID);

    $optionPrice = $selectedOption->getPrice($this->quantity, $sqft);

    list($calculatedPriceAddons, $calculatedAddons) = $this->calculateAddons(
      $optionPrice
    );

    $calculatedPrice = $calculatedPriceAddons + $optionPrice;

    if ($selectedOption->currentTypeIs("sqft")) {
      $calculatedPrice = $calculatedPrice * $this->quantity;
    }

    return [
      round($calculatedPrice, 3),
      round($calculatedPrice / 100, 3),
      $calculatedAddons,
    ];
  }

  private function calculateAddons($price)
  {
    $actualAddons = collect([]);
    $total = 0; //

    foreach ($this->addons as $addon) {
      $actualAddon = new Addon($this->product, $addon["id"]);

      $total += $actualAddon->calculate($price, $this->calculateSQFT());

      $actualAddons->push($actualAddon->getModel());
    }

    return [$total, $actualAddons];
  }

  private function calculateSQFT()
  {
    if ($this->unit === "feet") {
      return $this->width * $this->height;
    } else {
      return ($this->width * $this->height) / 144;
    }
  }
}
