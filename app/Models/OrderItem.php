<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderItem extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $guarded = [];

  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }

  public function productOption(): BelongsTo
  {
    return $this->belongsTo(ProductOption::class);
  }

  public function customSize(): BelongsTo
  {
    return $this->belongsTo(CustomSize::class);
  }

  public function addons(): BelongsToMany
  {
    return $this->belongsToMany(ProductAddons::class);
  }
}
