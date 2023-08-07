<?php
namespace App\Services\Calculator;

use App\Enums\AddonTypeEnum;
use App\Enums\OptionTypeEnum;
use App\Models\Product;
use App\Models\ProductOption;
use App\Services\Calculator\Classes\Addon;
use App\Services\Calculator\Classes\Option;
use App\Services\Calculator\Classes\Shipping;

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

    $this->selectedOption = $product->options->find($selectedOptionID);

    if (!$this->selectedOption) {
      abort(400, "Product Option not found");
    }

    $this->quantity = intval($quantity);

    $this->product = $product;

    $this->width = intval($width);
    $this->height = intval($height);

    if ($unit) {
      $this->unit = $unit;
    }

    $this->addons = $addons;
  }

  public function getProduct()
  {
    return $this->product;
  }

  public function getProductOption()
  {
    return $this->selectedOption;
  }

  public function calculate($originalPrice = null)
  {
    if ($originalPrice == null) {
      $originalPrice = false;
    }

    if ($this->type === "calculator") {
      return $this->calculateCalculatorProduct($originalPrice);
    }

    return "";
  }

  private function calculateCalculatorProduct($originalPrice)
  {
    $sqft = $this->calculateSQFT();

    $selectedOption = new Option($this->selectedOption);
    $shipping = new Shipping($this->selectedOption->shipping);

    $optionPrice = $selectedOption->getPrice($this->quantity, $sqft);

    list($calculatedPriceAddons, $calculatedAddons) = $this->calculateAddons(
      $optionPrice
    );
    $shippingPrice = $shipping->calculate($this->width, $this->height, $sqft);

    $calculatedPrice = $calculatedPriceAddons + $optionPrice + $shippingPrice;

    $calculatedPrice =
      $calculatedPrice * ($originalPrice ? 1 : $this->quantity);

    return [
      round($calculatedPrice, 3),
      number_format(round($calculatedPrice / 100, 3), 2),
      number_format($shippingPrice / 100, 3),
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
