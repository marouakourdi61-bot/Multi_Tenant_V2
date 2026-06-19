<?php

namespace App\Features\Quotes\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tenant;

class Quote extends Model
{
    protected $fillable = [
        'tenant_id',
        'quote_number',
        'recipient',
        'currency',
        'validity_days',
        'vat',
        'items',
        'notes',
        'concluding_text',
        'terms_conditions',
        'footer_text',
        'general_discount',
        'general_discount_type',
        'subtotal',
        'tax_amount',
        'total',
        'status',
        'issue_date',
        'expiry_date',
    ];

    protected $casts = [
        'items' => 'array',
        'vat' => 'boolean',
        'issue_date' => 'date',
        'expiry_date' => 'date',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}