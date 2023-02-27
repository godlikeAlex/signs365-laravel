<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemporaryOrder extends Model
{
    use HasFactory;

    protected $casts = [
        'cart_data' => 'object'
    ];

    protected $fillable = ['cart_data'];
}
