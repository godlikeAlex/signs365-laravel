<?php

namespace App\Models;

use Awcodes\Curator\Models\Media;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  protected $casts = [
    "sizes" => "array",
    "is_published" => "boolean",
    "with_checkout" => "boolean",
  ];

  /**
   * Get the route key for the model.
   */
  public function getRouteKeyName(): string
  {
    return "slug";
  }

  public function options(): BelongsToMany
  {
    return $this->belongsToMany(
      ProductOption::class,
      "product_product_option",
      "product_id",
      "product_option_id"
    );
  }

  public function addons(): BelongsToMany
  {
    return $this->belongsToMany(
      ProductAddons::class,
      "product_product_addon",
      "product_id",
      "product_addon_id"
    );
  }

  public function categories(): BelongsToMany
  {
    return $this->belongsToManyCategories();
  }

  public function productCategories(): BelongsToMany
  {
    return $this->belongsToManyCategories();
  }

  public function images(): BelongsToMany
  {
    return $this->belongsToMany(
      Media::class,
      "media_product",
      "product_id",
      "media_id"
    )
      ->withPivot("order")
      ->orderBy("order");
  }

  // public function faqs(): BelongsToMany
  // {
  //   return $this->belongsToMany(Faq::class);
  // }

  public function faq(): BelongsTo
  {
    return $this->belongsTo(Faq::class);
  }

  private function belongsToManyCategories(): BelongsToMany
  {
    return $this->belongsToMany(
      ProductCategory::class,
      "product_product_category",
      "product_id",
      "product_category_id"
    );
  }
}
