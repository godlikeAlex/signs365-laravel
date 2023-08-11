<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SizeItem extends Model
{
  use HasFactory;
  use SoftDeletes;

  protected $guarded = [];

  public function sizeList(): BelongsTo
  {
    return $this->belongsTo(SizeList::class);
  }
}