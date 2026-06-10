<?php

namespace App\Features\Invoices\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Invoices\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return inertia('Features/Invoices/Pages/Index', [
            'invoices' => Invoice::latest()->get(),
        ]);
    }

    public function create()
    {
        return inertia('Features/Invoices/Pages/Create');
    }

    public function store(Request $request)
    {
        
        $data = $request->validate([
            'recipient' => 'required|string',
            'currency' => 'required|string',
            'vat' => 'boolean',
            'items' => 'required|array',
            'notes' => 'nullable|string',
            'concluding_text' => 'nullable|string',
            'issue_date' => 'required|date',
        ]);

        $total = 0;

        foreach ($data['items'] as $item) {
            $lineTotal = $item['qty'] * $item['unit_price'];
            $total += $lineTotal;
        }

        $invoice = Invoice::create([
            'user_id' => auth()->id(),
            'invoice_number' => 'INV-' . time(),
            'recipient' => $data['recipient'],
            'currency' => $data['currency'],
            'vat' => $data['vat'],
            'items' => $data['items'],
            'notes' => $data['notes'] ?? null,
            'concluding_text' => $data['concluding_text'] ?? null,
            'total' => $total,
            'status' => 'draft',
            'issue_date' => $data['issue_date'],
            'due_date' => now()->addDays(7),
        ]);

        return redirect()->route('invoices.index');
    }
}