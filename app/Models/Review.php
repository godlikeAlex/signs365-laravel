<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
  use HasFactory;

  protected $guarded = [];

  protected $casts = [
    "published" => "boolean",
  ];

  public function scopePublished($query)
  {
    return $query->where("published", true);
  }

  public function product()
  {
    return $this->belongsTo(Product::class);
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function media()
  {
    return $this->hasMany(ReviewMedia::class);
  }
}
