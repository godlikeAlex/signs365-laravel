<?php

namespace App\Models\Estimate;

use App\Models\EstimateForm;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EstimateRequest extends Model
{
  use HasFactory;

  protected $guarded = [];

  protected $casts = [
    "payload" => "json",
  ];

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }

  public function form(): BelongsTo
  {
    return $this->belongsTo(EstimateForm::class, "estimate_form_id");
  }

  public function items(): HasMany
  {
    return $this->hasMany(EstimateRequestItem::class);
  }

  public function files(): HasMany
  {
    return $this->hasMany(EstimateRequestFile::class);
  }
}
