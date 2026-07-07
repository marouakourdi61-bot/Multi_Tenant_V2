<?php

namespace App\Features\Expenses\Models;

use App\Features\Expenses\Models\Expense;
use Illuminate\Database\Eloquent\Model;

class ExpenseMonth extends Model
{
    protected $fillable = [
        'expense_id',
        'year',
        'month',
        'amount',
    ];

    protected $casts = [
        'year' => 'integer',
        'month' => 'integer',
        'amount' => 'decimal:2',
    ];

    public function expense()
    {
        return $this->belongsTo(
            Expense::class
        );
    }
}
