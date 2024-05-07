<?php

namespace App\Services;

use App\DTO\CalculateAddonsDTO;
use App\DTO\CalculateProductDTO;
use App\DTO\CalculateShippingDTO;
use App\DTO\CalculatorDTO;
use App\Models\Product;
use App\Models\ProductOption;
use App\Models\Shipping;

class CalculatorService
{
  private ProductService $productService;
  private ShippingService $shippingService;
  private AddonService $addonService;
  private Product $product;
  private ProductOption $productOption;
  private int $width;
  private int $height;

  public function __construct()
  {
    $this->productService = new ProductService();
    $this->shippingService = new ShippingService();
    $this->addonService = new AddonService();
  }

  public function calculate(CalculatorDTO $calculatorDTO, $priceWithoutQuantity = false): array {
    $width = $calculatorDTO->width;
    $height = $calculatorDTO->height;

    $product = Product::with('images')->find($calculatorDTO->productID);
    /**
     * @var ProductOption $productOption
     */
    $productOption = $product?->options()->find($calculatorDTO->productOptionID);


    if (!$product) {
      throw new \Exception('Product not found');
    }

    if (!$productOption) {
      throw new \Exception('ProductOption not found');
    }

    $this->width = $calculatorDTO->width;
    $this->height = $calculatorDTO->height;

    $this->product = $product;
    $this->productOption = $productOption;

    $sqft = $this->getSQFT(
      $width,
      $height,
      $calculatorDTO->unit
    );

    $productPrice = $this->productService->calculatePrice(new CalculateProductDTO(
      $product,
      $productOption,
      $calculatorDTO->quantity,
      $sqft
    ));

    $shippingPrice = $this->shippingService->calculate(new CalculateShippingDTO(
      $productOption->shipping,
      $width,
      $height,
      $sqft
    ));

    list($addonsPrice, $calculatedAddons) = $this->addonService->calculate(new CalculateAddonsDTO(
      $calculatorDTO->addons,
      $product,
      $productPrice,
      $width,
      $height,
      $sqft,
      $calculatorDTO->unit
    ));

    $calculatePrice =  $productPrice + $shippingPrice + $addonsPrice;

    info('price', [
      'productPrice' => $productPrice,
      'shippingPrice' => $shippingPrice,
      'addonsPrice' => $addonsPrice,
      'totalPrice' => $calculatePrice,
    ]);

    if (!$priceWithoutQuantity) {
      $calculatePrice = $calculatePrice * $calculatorDTO->quantity;
    }

    return [
      round($calculatePrice, 3),
      number_format(round($calculatePrice / 100, 3), 2),
      $shippingPrice,
      $calculatedAddons,
    ];
  }

  public function getProduct(): Product {
    return $this->product;
  }

  public function getProductOption(): ProductOption {
    return $this->productOption;
  }

  private  function getSQFT($width, $height, $unit = 'feet') {
    $square = $width * $height;

    if ($unit === "feet") {
      return $square;
    } else {
      return $square / 144;
    }
  }
}
