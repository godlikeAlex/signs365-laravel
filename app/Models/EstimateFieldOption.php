<?php

namespace App\Models;

use App\Enums\AddonTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class EstimateFieldOption extends Model implements Sortable
{
  use HasFactory, SoftDeletes, SortableTrait;

  protected $guarded = [];

  public $sortable = [
    "order_column_name" => "order_column",
    "sort_when_creating" => true,
  ];

  protected $casts = [
    "type" => AddonTypeEnum::class,
    "min_price" => "integer",
    "extra_inputs" => "array",
    "is_active" => "boolean",
  ];

  public function field(): BelongsTo
  {
    return $this->belongsTo(EstimateField::class, "estimate_field_id");
  }
}
