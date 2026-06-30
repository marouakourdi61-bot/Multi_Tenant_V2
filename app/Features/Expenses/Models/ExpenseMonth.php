<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseMonth extends Model
{
    protected $fillable = [
        'expense_id',
        'year',
        'month',
        'amount',
    ];

    public function expense()
    {
        return $this->belongsTo(
            Expense::class
        );
    }
}