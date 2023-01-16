<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddToCartRequest;
use App\Http\Requests\Installers\GetCartRequest;
use App\Http\Resources\CartResource;
use App\Models\City;
use App\Models\Product;
use Darryldecode\Cart\Cart;
use Darryldecode\Cart\CartCondition;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class CartController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   */
  public function index(GetCartRequest $request)
  {
    try {
      // Request get city from middleware.
      $city = City::where('id', $request->get('city'))->firstOrFail();

      if (!Session::has('cart_id')) {
        Session::put('cart_id', Str::uuid());
      }

      return \response()->json($this->formatCart($city));
    } catch (ModelNotFoundException $e) {
      return response()->json([
        'error' => "This cart does'nt exists",
        'throwed_by' => $e
      ], 404);
    }
  }


  /**
   * Add to cart
   *
   */
  public function addToCart(AddToCartRequest $request)
  {
    try {
      $data = $request->validated();

      $city = City::where('domain', $data['city'])->firstOrFail();

      /** @var Product $product */
      $product = $city->products()->find($data['product_id']);

      if (!$product) {
        return response()->json([
          'error' => "This product does'nt exists in {$city->domain}"
        ], 404);
      }

      $productVariant = $product->variants()
        ->findOrFail($data['product_variant_id']);

      $productPrice = $productVariant
        ->prices()
        ->where('city_id', $city->id)
        ->firstOrFail();


      if (!Session::has('cart_id')) {
        Session::put('cart_id', Str::uuid());
      }

      \Cart::session(Session::get('cart_id'));

      $options = array(
        'product_variant_id' => $productVariant->id
      );

      $id = md5($product->id . serialize($options));

      \Cart::add(array(
        'id' => $id,
        'name' => $product->title,
        'quantity' => 1,
        'price' => $productPrice->price,
        'attributes' => $options,
        'associatedModel' => $product
      ));

      return \Cart::getContent($product->id);

//            return $this->updateOrAddToCart($product->id);


    } catch (ModelNotFoundException $e) {
      return response()->json([
        'error' => "This product does'nt exists"
      ], 404);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return Response
   */
  public function show($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param Request $request
   * @param int $id
   * @return Response
   */
  public function update(Request $request, $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return Response
   */
  public function destroy($id)
  {
    //
  }

  private function formatCart($city)
  {
    \Cart::session(Session::get('cart_id'));

    $cart = \Cart::getContent()->map(function ($cart_item) use ($city) {
      $product = Product::whereHas('cities', function ($query) use ($city) {
        return $query->where('city_id', $city->id);
      })
        ->find($cart_item->associatedModel->id);

      if ($product) {
        $variantID = $cart_item->attributes->get('product_variant_id');

        $variant = $product->variants()->find($variantID);

        if ($variant) {
          $productPrice = $variant->prices()
            ->where('city_id', $city->id)->first();

          \Cart::update($cart_item->id, [
            'price' => $productPrice->price
          ]);

          $cart_item['disabled'] = false;
        } else {
          $cart_item['disabled'] = true;
        }
      } else {
        $cart_item['disabled'] = true;
      }

      return $cart_item;
    });

    $createdTaxCondition = new CartCondition(array(
      'name' => "TAX",
      'type' => 'tax',
      'target' => 'subtotal', // this condition will be applied to cart's subtotal when getSubTotal() is called.
      'value' => '20%',
    ));

    \Cart::condition($createdTaxCondition);

    $sub_total = $cart->reduce(function ($carry, $item) {
      if ($item['disabled'] === false) {
        return $carry + $item->getPriceSumWithConditions();
      } else {
        return $carry;
      }
    }, 0);

    $condition = \Cart::getCondition('TAX');
    $tax = $condition->getCalculatedValue($sub_total);

    return [
      'cart' => $cart->values(),
      'tax' => $tax,
      'total' => $sub_total,
      'total_with_tax' => $sub_total + $tax
    ];
  }
}
