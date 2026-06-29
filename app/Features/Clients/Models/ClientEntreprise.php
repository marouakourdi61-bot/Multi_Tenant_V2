<?php

namespace App\Features\Clients\Models;

use Illuminate\Database\Eloquent\Model;
use App\Features\Invoices\Models\Invoice;

class ClientEntreprise extends Model
{
    protected $table =
        'clients_entreprises';

    protected $fillable = [

        'tenant_id',

        'name',

        'email',

        'phone',

        'address',

        'city',

        'postal_code',

        'country',

        'ice',

        'rc',

        'if_number',

        'cnss',

        'notes',
    ];

    public function invoices()
    {
        return $this->hasMany(
            Invoice::class,
            'recipient',
            'id'
        );
    }
}