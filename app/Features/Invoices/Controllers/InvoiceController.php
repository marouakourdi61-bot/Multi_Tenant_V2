<?php

namespace App\Features\Invoices\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Invoices\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return inertia('Invoices/Index', [
            'invoices' => Invoice::forCurrentTenant()->latest()->get(),
        ]);
    }

    public function create()
    {
        return inertia('Invoices/Create');
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

        $tenantId = auth()->user()->tenant?->id
            ?? auth()->user()->tenants()->latest()->value('id');

        $invoice = Invoice::create([
            'tenant_id' => $tenantId,
            'invoice_number' => 'INV-' . time(),
            'recipient' => $data['recipient'],
            'currency' => $data['currency'],
            'vat' => $data['vat'],
            'items' => $data['items'],
            'notes' => $data['notes'],
            'concluding_text' => $data['concluding_text'],
            'total' => $total,
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
            'items' => 'required|array',
            'notes' => 'nullable|string',
            'concluding_text' => 'nullable|string',
            'issue_date' => 'required|date',
            'status' => 'required|string',
        ]);

        $total = 0;
        foreach ($data['items'] as $item) {
            $lineTotal = $item['qty'] * $item['unit_price'];
            $total += $lineTotal;
        }

        $invoice->update([
            'recipient' => $data['recipient'],
            'currency' => $data['currency'],
            'vat' => $data['vat'],
            'items' => $data['items'],
            'notes' => $data['notes'],
            'concluding_text' => $data['concluding_text'],
            'total' => $total,
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