<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;
    protected $guarded = [];

    static $ORDERS_STATUSES = [
        'pending' => 'Pending',
        'approved' => 'Approved',
        'process' => 'Process',
        'shipping' => 'Shipping',
        'completed' => 'Completed'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($order) {
            $order['uuid'] = (string) Str::uuid();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
