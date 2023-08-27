<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImageSeed extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $products = Product::query()->get();

    foreach ($products as $product) {
      if ($product->categories->count() == 0) {
        continue;
      }

      for ($i = 0; $i < count($product->images); $i++) {
        $order = $i + 1;

        info($product->images[$i], [$product->images]);

        $product
          ->productImages()
          ->attach($product->images[$i], ["order" => $order]);
      }
    }
  }
}
