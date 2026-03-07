<?php

namespace App\Models\Estimate;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EstimateRequestItem extends Model
{
  use HasFactory;

  protected $guarded = [];

  protected $casts = [
    "selected_value" => "json",
    "meta" => "json",
  ];

  public function request(): BelongsTo
  {
    return $this->belongsTo(EstimateRequest::class, "estimate_request_id");
  }
}
