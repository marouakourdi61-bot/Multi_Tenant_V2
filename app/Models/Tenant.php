<?php

namespace App\Models;

use Spatie\Multitenancy\Models\Tenant as SpatieTenant;

class Tenant extends SpatieTenant
{
    protected $fillable = [
        'name',
        'slug',
        'is_active',
    ];
}