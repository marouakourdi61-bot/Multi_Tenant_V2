<?php

namespace App\Models;

use Spatie\Multitenancy\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'email',
        'legal_form',
        'address',
        'address_complement',
        'postal_code',
        'city',
        'country',
        'timezone',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}