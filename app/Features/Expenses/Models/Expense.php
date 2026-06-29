<?php

namespace App\Features\Expenses\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $table =
        'expenses';

    protected $fillable = [

        'tenant_id',

        'name',

        'recurrence',

        'amount',

    ];

    public function tenant()
    {
        return $this
            ->belongsTo(
                \App\Models\Tenant::class
            );
    }
}