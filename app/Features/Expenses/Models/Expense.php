<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'recurrence',
        'amount',
    ];

    public function months()
    {
        return $this->hasMany(
            ExpenseMonth::class
        );
    }

    public function tenant()
    {
        return $this->belongsTo(
            Tenant::class
        );
    }
}