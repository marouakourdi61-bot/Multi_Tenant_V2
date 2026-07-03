<?php

namespace App\Features\Expenses\Models;

use Illuminate\Database\Eloquent\Model;
use App\Features\Expenses\Models\ExpenseMonth;
use App\Models\Tenant;

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