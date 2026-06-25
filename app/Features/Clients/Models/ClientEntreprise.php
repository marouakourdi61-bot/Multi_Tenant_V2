<?php

namespace App\Features\Clients\Models;

use Illuminate\Database\Eloquent\Model;

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
}