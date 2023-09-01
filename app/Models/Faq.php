<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Faq extends Model
{
  use HasFactory;

  protected $guarded = [];

  protected $casts = [
    "content" => "json",
  ];

  // public function products(): BelongsToMany
  // {
  //   return $this->belongsToMany(Product::class);
  // }

  public function products(): HasMany
  {
    return $this->hasMany(Product::class);
  }
}
