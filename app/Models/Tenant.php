<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Multitenancy\Models\Concerns\UsesLandlordConnection;
use Spatie\Multitenancy\Contracts\IsTenant;

class Tenant extends Model implements IsTenant
{
    protected $fillable = [
        'name',
        'slug',
        'is_active',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}