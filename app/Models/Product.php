<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $casts = [
        'images' => 'array',
    ];

    public function cities(): BelongsToMany
    {
        return $this->belongsToMany(City::class, 'city_product', 'product_id', 'city_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ProductCategory::class, 'product_product_category', 'product_id', 'product_category_id');
    }

    public function prices(): HasMany {
        return $this->hasMany(ProductPrice::class);
    }

    public function startPrice() {
        return $this->prices()->min('price');
    }
}
