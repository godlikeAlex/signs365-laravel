<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductPrice;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    $cities = City::all();

    Product::factory(100)
      ->create()
      ->each(function ($product) use ($cities) {
        $productVariants = ProductVariant::factory(3)->create([
          "product_id" => $product->id,
        ]);

        $product->categories()->attach(
          ProductCategory::inRandomOrder()
            ->limit(1)
            ->first()->id
        );
        $product->cities()->attach($cities->pluck("id"));

        foreach ($product->variants as $productVariant) {
          foreach ($product->cities as $city) {
            ProductPrice::updateOrCreate(
              [
                "city_id" => $city->id,
                "product_variant_id" => $productVariant->id,
              ],
              [
                "city_id" => $city->id,
                "product_variant_id" => $productVariant->id,
                "product_id" => $product->id,
                "price" => rand(8000, 30000),
              ]
            );
          }
        }
      });
  }
}
