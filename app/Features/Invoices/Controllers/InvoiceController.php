<?php

namespace App\Features\Invoices\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Invoices\Models\Invoice;
use Illuminate\Http\Request;
use App\Features\Clients\Models\Client;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
{
    $invoices = Invoice::forCurrentTenant()
        ->with('client')
        ->latest()
        ->get();

    return inertia('Invoices/Index', [
        'invoices' => $invoices,
    ]);
}

    public function create()
    {
        $tenantId = auth()->user()->tenant?->id
            ?? auth()->user()->tenants()->latest()->value('id');

        $clients = Client::query()
            ->where(function ($query) use ($tenantId) {
                $query->where('tenant_id', $tenantId)
                    ->orWhereNull('tenant_id');
            })
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('Invoices/Create', [
            'clients' => $clients,
        ]);
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'recipient' => 'required|exists:clients,id',
            'currency' => 'required|string',
            'vat' => 'boolean',
            'discount' => 'nullable|numeric|min:0|max:100',
            'discount_type' => 'nullable|string|in:%,fixed',
            'items' => 'required|array',
            'notes' => 'nullable|string',
            'concluding_text' => 'nullable|string',
            'issue_date' => 'required|date',
        ]);

        $subtotal = 0;
        foreach ($data['items'] as $item) {
            $lineTotal = ($item['qty'] ?? 0) * ($item['unit_price'] ?? 0);
            $subtotal += $lineTotal;
        }

        // Calcul de la remise
        $discount = (float) ($data['discount'] ?? 0);
        $discountType = $data['discount_type'] ?? '%';
        $discountAmount = $discountType === '%'
            ? $subtotal * ($discount / 100)
            : $discount;

        $afterDiscount = $subtotal - $discountAmount;

        // Calcul TVA (20% si vat est false = TVA applicable)
        $vatEnabled = !($data['vat'] ?? false);
        $taxAmount = $vatEnabled ? $afterDiscount * 0.20 : 0;

        $totalTtc = $afterDiscount + $taxAmount;

        $tenantId = auth()->user()->tenant?->id
            ?? auth()->user()->tenants()->latest()->value('id');

        $invoice = Invoice::create([
            'tenant_id' => $tenantId,
            'invoice_number' => 'INV-' . time(),
            'recipient' => $data['recipient'],
            'currency' => $data['currency'],
            'vat' => $data['vat'],
            'discount' => $discount,
            'discount_type' => $discountType,
            'items' => $data['items'],
            'notes' => $data['notes'],
            'concluding_text' => $data['concluding_text'],
            'total' => $subtotal,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_ttc' => $totalTtc,
            'status' => 'draft',
            'issue_date' => $data['issue_date'],
            'due_date' => now()->addDays(7),
        ]);

        return redirect()->route('invoices.index');
    }

    public function show($id)
    {
        $invoice = Invoice::forCurrentTenant()->findOrFail($id);

        return inertia('Invoices/Show', [
            'invoice' => $invoice,
        ]);
    }

    public function edit($id)
    {
        $invoice = Invoice::forCurrentTenant()->findOrFail($id);

        return inertia('Invoices/Edit', [
            'invoice' => $invoice,
        ]);
    }

    public function update(Request $request, $id)
    {
        $invoice = Invoice::forCurrentTenant()->findOrFail($id);

        $data = $request->validate([
            'recipient' => 'required|string',
            'currency' => 'required|string',
            'vat' => 'boolean',
            'discount' => 'nullable|numeric|min:0|max:100',
            'discount_type' => 'nullable|string|in:%,fixed',
            'items' => 'required|array',
            'notes' => 'nullable|string',
            'concluding_text' => 'nullable|string',
            'issue_date' => 'required|date',
            'status' => 'required|string',
        ]);

        $subtotal = 0;
        foreach ($data['items'] as $item) {
            $lineTotal = ($item['qty'] ?? 0) * ($item['unit_price'] ?? 0);
            $subtotal += $lineTotal;
        }

        // Calcul de la remise
        $discount = (float) ($data['discount'] ?? 0);
        $discountType = $data['discount_type'] ?? '%';
        $discountAmount = $discountType === '%'
            ? $subtotal * ($discount / 100)
            : $discount;

        $afterDiscount = $subtotal - $discountAmount;

        // Calcul TVA (20% si vat est false = TVA applicable)
        $vatEnabled = !($data['vat'] ?? false);
        $taxAmount = $vatEnabled ? $afterDiscount * 0.20 : 0;

        $totalTtc = $afterDiscount + $taxAmount;

        $invoice->update([
            'recipient' => $data['recipient'],
            'currency' => $data['currency'],
            'vat' => $data['vat'],
            'discount' => $discount,
            'discount_type' => $discountType,
            'items' => $data['items'],
            'notes' => $data['notes'],
            'concluding_text' => $data['concluding_text'],
            'total' => $subtotal,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_ttc' => $totalTtc,
            'status' => $data['status'],
            'issue_date' => $data['issue_date'],
        ]);

        return redirect()->route('invoices.index');
    }

    public function destroy($id)
    {
        $invoice = Invoice::forCurrentTenant()->findOrFail($id);
        $invoice->delete();

        return redirect()->route('invoices.index');
    }

    public function updateStatus(Request $request, $id)
    {
        $invoice = Invoice::forCurrentTenant()->findOrFail($id);
        
        $request->validate([
            'status' => 'required|string|in:draft,paid,pending',
        ]);

        $invoice->update(['status' => $request->status]);

        return back()->with('success', 'Statut de la facture mis à jour.');
    }

    public function downloadPdf($id)
    {
        $invoice = Invoice::forCurrentTenant()->findOrFail($id);

        $html = view('invoices.pdf', ['invoice' => $invoice])->render();

        if (class_exists('\Dompdf\Dompdf')) {
            $dompdf = new \Dompdf\Dompdf();
            $dompdf->loadHtml($html);
            $dompdf->setPaper('A4', 'portrait');
            $dompdf->render();

            $output = $dompdf->output();

            return response()->streamDownload(function () use ($output) {
                echo $output;
            }, 'invoice-' . $invoice->id . '.pdf', [
                'Content-Type' => 'application/pdf',
            ]);
        }

        // Fallback: return HTML if Dompdf not installed
        return response($html);
    }
}