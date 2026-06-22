<?php

namespace App\Features\Clients\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients';

    protected $fillable = [
        'tenant_id',
        'name',
        'email',
        'phone',
        'address',
        'city',
        'postal_code',
        'country',
        'notes',
    ];


    public function invoices()
    {
        return $this->hasMany(
            \App\Features\Invoices\Models\Invoice::class,
            'recipient',
            'id'
        );
    }
}
