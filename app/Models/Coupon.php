<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'coupon_id',
        'month',
        'album',
        'artist',
        'pressing',
        'web_link',
        'date_claimed',
        'claimed',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_claimed' => 'date',
    ];

    public function getRouteKeyName()
    {
        return 'coupon_id';
    }
}
