<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CityProduct extends Pivot
{
  protected static function booted()
  {
    static::created(function ($pivot_model) {
      // your implementation here
      $variants = ProductVariant::query()
        ->where([["product_id", $pivot_model["product_id"]]])
        ->get();

      foreach ($variants as $variant) {
        foreach ($pivot_model->product->cities as $city) {
          $priceExists = $variant
            ->prices()
            ->where("city_id", $city->id)
            ->first();

          if (!$priceExists) {
            $variant->prices()->create([
              "city_id" => $city->id,
              "product_id" => $pivot_model->product->id,
              "price" => 0,
            ]);
          }
        }
      }
    });

    static::deleting(function ($pivot_model) {
      $variants = $pivot_model->product->variants;

      foreach ($variants as $variant) {
        $variant
          ->prices()
          ->where("city_id", $pivot_model->city->id)
          ->delete();
      }
    });
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }

  public function city(): BelongsTo
  {
    return $this->belongsTo(City::class);
  }
}
