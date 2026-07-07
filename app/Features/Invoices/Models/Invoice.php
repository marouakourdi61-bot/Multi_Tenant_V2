<?php

namespace App\Features\Invoices\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Features\Clients\Models\Client;

class Invoice extends Model
{
    protected $fillable = [
        'tenant_id',
        'invoice_number',
        'recipient',
        'currency',
        'vat',
        'discount',
        'discount_type',
        'items',
        'notes',
        'concluding_text',
        'total',
        'subtotal',
        'tax_amount',
        'total_ttc',
        'status',
        'issue_date',
        'due_date',
    ];

    protected $casts = [
        'items' => 'array',
        'vat' => 'boolean',
        'discount' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'recipient');
    }

    public function scopeForCurrentTenant($query)
    {
        $tenantId = auth()->user()->tenant?->id
            ?? auth()->user()->tenants()->latest()->value('id');

        return $query->where('tenant_id', $tenantId);
    }
}