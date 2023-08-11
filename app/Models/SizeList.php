<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SizeList extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function productOptions(): HasMany
  {
    return $this->hasMany(ProductOption::class);
  }

  public function sizeItems(): HasMany
  {
    return $this->hasMany(SizeItem::class);
  }
}
