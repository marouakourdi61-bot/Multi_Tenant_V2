<?php

namespace App\Features\Clients\Models;

use Illuminate\Database\Eloquent\Model;

class Fournisseur
extends Model
{
    protected $table =
        'fournisseurs';

    protected $fillable = [

        'name',

        'email',

        'phone',

        'address',

        'city',

        'country',

        'notes',

    ];
}