<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class ProductEstimateForm extends Model implements Sortable
{
  use HasFactory, SortableTrait;

  protected $table = "estimate_form_product";

  protected $guarded = [];

  protected $casts = [
    "is_active" => "boolean",
  ];

  public $sortable = [
    "order_column_name" => "order_column",
    "sort_when_creating" => true,
  ];

  public function buildSortQuery(): Builder
  {
    return static::query()->where("product_id", $this->product_id);
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class, "product_id");
  }

  public function estimateForm(): BelongsTo
  {
    return $this->belongsTo(EstimateForm::class, "estimate_form_id");
  }
}
