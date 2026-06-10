<?php

namespace App\Features\Invoices\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Invoice extends Model
{
    protected $fillable = [
        'user_id',
        'invoice_number',
        'recipient',
        'currency',
        'vat',
        'items',
        'notes',
        'concluding_text',
        'total',
        'status',
        'issue_date',
        'due_date',
    ];

    protected $casts = [
        'items' => 'array',
        'vat' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}