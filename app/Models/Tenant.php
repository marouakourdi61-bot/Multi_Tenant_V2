<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Multitenancy\Contracts\IsTenant;

class Tenant extends Model implements IsTenant
{
    protected $fillable = [
        'name',
        'slug',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}