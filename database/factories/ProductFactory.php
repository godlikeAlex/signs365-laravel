<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\=Product>
 */
class ProductFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    $namesForProduct = [
      "Banner",
      "Board",
      "Flag 1",
      "Flag 2",
      "Frame",
      "Sign",
      "Vehicle Wrap",
      "Vinyl",
      "Wallpaper",
      "Alumagraphics",
      "Clear Adhisive Vynil",
      "Cut Vynil",
      "Heat rolled vynil",
    ];

    $currentName = "{$namesForProduct[array_rand(
        $namesForProduct
      )]} - {$this->faker->unique()->numberBetween(1, 999)}";

    return [
      "title" => $currentName,
      "slug" => Str::slug($currentName),
      "published" => true,
      "description" => $this->faker->text(200),
      "images" => [rand(1, 10) . ".png", rand(1, 10) . ".png"],
    ];
  }
}
