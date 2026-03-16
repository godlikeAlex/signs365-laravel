<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class EstimateField extends Model implements Sortable
{
  use HasFactory, SoftDeletes, SortableTrait;

  protected $guarded = [];

  public $sortable = [
    "order_column_name" => "order_column",
    "sort_when_creating" => true,
  ];

  protected $casts = [
    "field_type" => "string",
    "is_required" => "boolean",
    "is_active" => "boolean",
  ];

  public function form(): BelongsTo
  {
    return $this->belongsTo(EstimateForm::class, "estimate_form_id");
  }

  public function options(): HasMany
  {
    return $this->hasMany(EstimateFieldOption::class)->orderBy("order_column");
  }
}
