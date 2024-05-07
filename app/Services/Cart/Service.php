<?php

namespace App\Services\Cart;

use App\DTO\AddToCartDTO;
use App\DTO\CalculatorDTO;
use App\Http\Resources\CartItemsResource;
use App\Models\Product;
use App\Models\SizeItem;
use App\Services\CalculatorService;
use Darryldecode\Cart\CartCondition;

class Service
{
  public $cart;

  public function __construct($cart_id)
  {
    $this->cart = \Cart::session($cart_id);
  }

  public function instance()
  {
    return $this->cart;
  }

  public function add(
    AddToCartDTO $addToCartDTO,
  ) {
    $product_id = $addToCartDTO->productID;
    $option_id = $addToCartDTO->optionID;
    $addons = $addToCartDTO->addons;
    $quantity = $addToCartDTO->quantity;
    $unit = $addToCartDTO->unit;
    $width = $addToCartDTO->width;
    $height = $addToCartDTO->height;
    $size_id = $addToCartDTO->size_id;
    $images = $addToCartDTO->images;

    $sizeItem = SizeItem::find($size_id);

    $calculatorService = new CalculatorService(
//      $product_id,
//      $width,
//      $height,
//      $addons,
//      $option_id,
//      $unit,
//      $quantity
    );

    $calculatorDTO = new CalculatorDTO(
      $product_id,
      $option_id,
      $width,
      $height,
      $quantity,
      $addons,
      $unit,
    );

    list($priceInCents) = $calculatorService->calculate($calculatorDTO, true);

    $product = $calculatorService->getProduct();
    $productOption = $calculatorService->getProductOption();

    $options = [
      "productOptionType" => $productOption->type,
      "addons" => $addons,
      "width" => $width,
      "height" => $height,
      "unit" => $unit,
      "productOption" => [
        "id" => $productOption->id,
        "title" => $productOption->title,
      ],
      "images" => $images,
      "product" => [
        "id" => $product->id,
        "title" => $product->title,
      ],
    ];

    if ($sizeItem) {
      $options["sizeItem"] = [
        "id" => $sizeItem->id,
        "title" => $sizeItem->label,
      ];
    }

    $id = md5($product->id . $productOption->id . serialize($options));

    $this->cart->add([
      "id" => $id,
      "name" => $product->title,
      "quantity" => $quantity,
      "price" => $priceInCents,
      "attributes" => $options,
      "associatedModel" => $product,
    ]);
  }

  public function addQuantity($item_id)
  {
    $itemExist = $this->cart->has($item_id);

    if (!$itemExist) {
      return response()->json(
        [
          "error" => "This cart item does'nt exists",
        ],
        404
      );
    }

    $this->cart->update($item_id, [
      "quantity" => +1,
    ]);
  }

  public function reduceQuantity($item_id)
  {
    $itemExist = $this->cart->has($item_id);

    if (!$itemExist) {
      return response()->json(
        [
          "error" => "This cart item does'nt exists",
        ],
        404
      );
    }

    $this->cart->update($item_id, [
      "quantity" => -1,
    ]);
  }

  public function removeItem($item_id)
  {
    $itemExist = $this->cart->has($item_id);

    if (!$itemExist) {
      return response()->json(
        [
          "error" => "This cart item does'nt exists",
        ],
        404
      );
    }

    $this->cart->remove($item_id);
  }

  public function format($city)
  {
    $cart = $this->cart->getContent()->map(function ($cart_item) use ($city) {
      // $product = Product::whereHas("cities", function ($query) use ($city) {
      //   return $query->where("city_id", $city->id);
      // })->find($cart_item->associatedModel->id);

      // if ($product) {
      //   $variant = $cart_item->attributes->get("product_variant");

      //   $variant = $product->variants()->find($variant["id"]);

      //   if ($variant) {
      //     $productPrice = $variant
      //       ->prices()
      //       ->where("city_id", $city->id)
      //       ->first();

      //     $this->cart->update($cart_item->id, [
      //       "price" => $productPrice->price,
      //     ]);

      //     $cart_item["disabled"] = false;
      //   } else {
      //     $cart_item["disabled"] = true;
      //   }
      // } else {
      //   $cart_item["disabled"] = true;
      // }
      return $cart_item;
    });

    $humanTax = $city->tax * 100;

    $createdTaxCondition = new CartCondition([
      "name" => "TAX",
      "type" => "tax",
      "target" => "subtotal", // this condition will be applied to cart's subtotal when getSubTotal() is called.
      "value" => "{$humanTax}%",
    ]);

    $this->cart->condition($createdTaxCondition);

    $sub_total = $cart->reduce(function ($carry, $item) {
      return $carry + $item->getPriceSumWithConditions();

      // if ($item["disabled"] === false) {
      //   return $carry + $item->getPriceSumWithConditions();
      // } else {
      //   return $carry;
      // }
    }, 0);

    $condition = $this->cart->getCondition("TAX");
    $tax = $condition->getCalculatedValue($sub_total);

    return [
      "items" => json_decode(
        CartItemsResource::collection($cart->sort()->values())->toJson()
      ),
      "tax" => round($tax / 100, 3),
      "total" => round($sub_total / 100, 3),
      "total_with_tax" => round(($sub_total + $tax) / 100, 2),
    ];
  }
}
