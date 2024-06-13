<?php

namespace App\Services\Cart;

use App\DTO\AddToCartDTO;
use App\DTO\CalculatorDTO;
use App\Enums\OptionTypeEnum;
use App\Http\Resources\CartItemsResource;
use App\Models\City;
use App\Models\Product;
use App\Models\SizeItem;
use App\Models\Voucher;
use App\Services\CalculatorService;
use Darryldecode\Cart\CartCondition;

class Service
{
  public $cart;
  public $city;

  public function __construct($cart_id, City $city)
  {
    $this->cart = \Cart::session($cart_id);
    $this->city = $city;
  }

  public function instance()
  {
    return $this->cart;
  }

  public function setCity(City $city)
  {
    $this->city = $city;
  }

  public function add(AddToCartDTO $addToCartDTO)
  {
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

    $calculatorService = new CalculatorService();
    //      $product_id,
    //      $width,
    //      $height,
    //      $addons,
    //      $option_id,
    //      $unit,
    //      $quantity

    $calculatorDTO = new CalculatorDTO(
      $product_id,
      $option_id,
      $width,
      $height,
      $quantity,
      $addons,
      $unit
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

    $this->recalculateItem($item_id);
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

    $this->recalculateItem($item_id);
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

  /**
   *
   * CART VOUCHER
   *
   **/
  public function applyVoucher($voucher)
  {
    $this->destroyVoucher();

    $voucherCondition = new \Darryldecode\Cart\CartCondition([
      "name" => "VOUCHER",
      "type" => $voucher->is_fixed ? "promo-fixed" : "promo-amount",
      "target" => "subtotal",
      "value" => $voucher->is_fixed
        ? $voucher->discount_amount
        : $voucher->discount_percent,
      "order" => 999999,
      "attributes" => [
        "id" => $voucher->id,
        "code" => $voucher->code,
        "name" => $voucher->name,
      ],
    ]);

    $this->cart->condition($voucherCondition);
  }

  public function destroyVoucher()
  {
    if ($this->cart->getCondition("VOUCHER")) {
      $this->cart->removeCartCondition("VOUCHER");
    }
  }

  public function getVoucher()
  {
    $voucherCondition = $this->cart->getCondition("VOUCHER");

    if (!$voucherCondition) {
      return null;
    }

    $conditionAttributes = $voucherCondition->getAttributes();

    return Voucher::find($conditionAttributes["id"]);
  }

  private function getVoucherAndDiscount($total)
  {
    $voucherCondition = $this->cart->getCondition("VOUCHER");
    $discountAmount = 0;

    if (!$voucherCondition) {
      return [null, $discountAmount];
    }

    $voucherValue = $voucherCondition->getValue();
    $voucherType = $voucherCondition->getType();

    if ($voucherType === "promo-fixed") {
      $discountAmount = $voucherValue;
    } else {
      $discountAmount = $total * ($voucherValue / 100);
    }

    $voucher = [
      "id" => $voucherCondition->getAttributes()["id"],
      "name" => $voucherCondition->getAttributes()["name"] ?? "VOUCHER",
      "value" =>
        $voucherCondition->getType() === "promo-fixed"
          ? -$voucherValue / 100 . "$"
          : "$voucherValue%",
      "discountAmount" => ceil($discountAmount) / 100,
    ];

    return [$voucher, $discountAmount];
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

    list($totalCart, $totalItems, $tax) = $this->getPrices();

    list($voucher, $discountVoucher) = $this->getVoucherAndDiscount($totalCart);

    $total = $totalCart - $discountVoucher;

    return [
      "items" => json_decode(
        CartItemsResource::collection($cart->sort()->values())->toJson()
      ),
      "voucher" => $voucher,
      "discount_voucher" => $discountVoucher / 100,
      "tax" => round($tax / 100, 3),
      "total" => round($totalItems / 100, 3),
      "total_with_tax" => round($total / 100, 2),

      "amount_in_cents" => $total,
      "tax_in_cents" => $tax,
      "discount_voucher_in_cents" => $discountVoucher,
    ];
  }

  public function getPrices()
  {
    $humanTax = $this->city->tax * 100;

    $createdTaxCondition = new CartCondition([
      "name" => "TAX",
      "type" => "tax",
      "target" => "subtotal", // this condition will be applied to cart's subtotal when getSubTotal() is called.
      "value" => "{$humanTax}%",
    ]);

    $this->cart->condition($createdTaxCondition);

    $totalItems = $this->cart->getContent()->reduce(function ($carry, $item) {
      if ($item->attributes["productOptionType"] === OptionTypeEnum::PER_QTY) {
        return $carry + $item->price;
      }

      return $carry + $item->getPriceSumWithConditions();
    }, 0);

    $condition = $this->cart->getCondition("TAX");
    $tax = $condition->getCalculatedValue($totalItems);
    $totalCart = $totalItems + $tax;

    return [$totalCart, $totalItems, $tax];
  }

  public function calculateForOrder()
  {
    list($total, $totalItems, $tax) = $this->getPrices();
    list($voucher, $discountVoucher) = $this->getVoucherAndDiscount($total);

    $totalAmountWithDiscount = $total - $discountVoucher;

    return [
      round($totalAmountWithDiscount),
      round($tax),
      round($discountVoucher),
    ];
  }

  private function recalculateItem($itemID)
  {
    $calculatorService = new CalculatorService();
    $item = $this->cart->get($itemID);

    $calculatorDTO = new CalculatorDTO(
      $item->attributes->product["id"],
      $item->attributes->productOption["id"],
      $item->attributes->width,
      $item->attributes->height,
      $item->quantity,
      $item->attributes->addons,
      $item->attributes->unit
    );

    list($priceInCents) = $calculatorService->calculate($calculatorDTO, true);

    $this->cart->update($itemID, [
      "price" => $priceInCents,
    ]);
  }
}
