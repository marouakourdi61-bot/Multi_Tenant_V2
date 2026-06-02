<?php

namespace App\Models;

use Spatie\Multitenancy\Models\Tenant as BaseTenant;
use Spatie\Multitenancy\TenantCollection;
 
class Tenant extends BaseTenant
{
    protected $fillable = [
        'name',
        'slug',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function newCollection(array $models = []): TenantCollection
    {
        return new TenantCollection($models);
    }
}