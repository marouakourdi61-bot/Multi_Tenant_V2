<?php

namespace App\Features\Quotes\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Quotes\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Features\Clients\Models\Client;
use Inertia\Inertia;

class QuoteController extends Controller
{
    // List quotes
    public function index()
    {
        $quotes = Quote::where(
            'tenant_id',
            auth()->user()->tenant->id
        )
            ->with('client')
            ->latest()
            ->get();

        return Inertia::render(
            'Quotes/Index',
            [
                'quotes' => $quotes,
            ]
        );
    }

    // Page create
    public function create()
    {
        $tenantId =
            auth()->user()->tenant?->id
            ??
            auth()->user()->tenants()->latest()->value('id');

        $clients = Client::query()
            ->where('tenant_id', $tenantId)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render(
            'Quotes/Create',
            [
                'clients' => $clients,
            ]
        );
    }

    // Save quote
    public function store(Request $request)
    {
        $data = $request->validate([
            'recipient' => 'required|exists:clients,id',
            'currency' => 'required|string',
            'validity_days' => 'required|integer',
            'vat' => 'boolean',
            'items' => 'required|array',
            'notes' => 'nullable|string',
            'concluding_text' => 'nullable|string',
            'terms_conditions' => 'nullable|string',
            'footer_text' => 'nullable|string',
            'general_discount' => 'nullable|numeric',
            'general_discount_type' => 'nullable|string',
            'issue_date' => 'required|date',
        ]);

        $subtotal = 0;

        foreach ($data['items'] as $item) {
            $subtotal +=
                (float) ($item['qty'] ?? 0)
                *
                (float) ($item['unit_price'] ?? 0);
        }

        $generalDiscount = 0;
        $generalDiscountValue = (float) ($data['general_discount'] ?? 0);
        if ($generalDiscountValue > 0) {
            if ($data['general_discount_type'] === '%') {
                $generalDiscount = $subtotal * ($generalDiscountValue / 100);
            } else {
                $generalDiscount = $generalDiscountValue;
            }
        }

        $totalAfterDiscount = $subtotal - $generalDiscount;

        $tax = !empty($data['vat'])
            ? 0
            : $totalAfterDiscount * 0.20;

        $total = $totalAfterDiscount + $tax;

        Quote::create([
            'tenant_id' => auth()->user()->tenant->id,
            'quote_number' => 'DEV-' . time(),
            'recipient' => $data['recipient'],
            'currency' => $data['currency'],
            'validity_days' => $data['validity_days'],
            'vat' => $data['vat'] ?? false,
            'items' => $data['items'],
            'notes' => $data['notes'] ?? null,
            'concluding_text' => $data['concluding_text'] ?? null,
            'terms_conditions' => $data['terms_conditions'] ?? null,
            'footer_text' => $data['footer_text'] ?? null,
            'general_discount' => $data['general_discount'] ?? 0,
            'general_discount_type' => $data['general_discount_type'] ?? '%',
            'subtotal' => $subtotal,
            'tax_amount' => $tax,
            'total' => $total,
            'status' => 'draft',
            'issue_date' => $data['issue_date'],
            'expiry_date' => Carbon::parse($data['issue_date'])->addDays((int) $data['validity_days']),
        ]);

        return redirect()->route('quotes.index');
    }

    // Show edit form
    public function edit(Quote $quote)
    {
        return Inertia::render('Quotes/Edit', [
            'quote' => $quote,
        ]);
    }

    // Update quote
    public function update(Request $request, Quote $quote)
    {
        $data = $request->validate([
            'recipient' => 'required|exists:clients,id',
            'currency' => 'required|string',
            'validity_days' => 'required|integer',
            'vat' => 'boolean',
            'items' => 'required|array',
            'notes' => 'nullable|string',
            'concluding_text' => 'nullable|string',
            'terms_conditions' => 'nullable|string',
            'footer_text' => 'nullable|string',
            'general_discount' => 'nullable|numeric',
            'general_discount_type' => 'nullable|string',
            'issue_date' => 'required|date',
            'status' => 'nullable|string',
        ]);

        $subtotal = 0;
        foreach ($data['items'] as $item) {
            $subtotal += (float) ($item['qty'] ?? 0) * (float) ($item['unit_price'] ?? 0);
        }

        $generalDiscount = 0;
        $generalDiscountValue = (float) ($data['general_discount'] ?? 0);
        if ($generalDiscountValue > 0) {
            if ($data['general_discount_type'] === '%') {
                $generalDiscount = $subtotal * ($generalDiscountValue / 100);
            } else {
                $generalDiscount = $generalDiscountValue;
            }
        }

        $totalAfterDiscount = $subtotal - $generalDiscount;
        $tax = !empty($data['vat']) ? 0 : $totalAfterDiscount * 0.20;
        $total = $totalAfterDiscount + $tax;

        $quote->update([
            'recipient' => $data['recipient'],
            'currency' => $data['currency'],
            'validity_days' => $data['validity_days'],
            'vat' => $data['vat'] ?? false,
            'items' => $data['items'],
            'notes' => $data['notes'] ?? null,
            'concluding_text' => $data['concluding_text'] ?? null,
            'terms_conditions' => $data['terms_conditions'] ?? null,
            'footer_text' => $data['footer_text'] ?? null,
            'general_discount' => $data['general_discount'] ?? 0,
            'general_discount_type' => $data['general_discount_type'] ?? '%',
            'subtotal' => $subtotal,
            'tax_amount' => $tax,
            'total' => $total,
            'status' => $data['status'] ?? 'draft',
            'issue_date' => $data['issue_date'],
            'expiry_date' => Carbon::parse($data['issue_date'])->addDays((int) $data['validity_days']),
        ]);

        return redirect()->route('quotes.index');
    }

    // Download PDF
    public function downloadPdf(Quote $quote)
    {
        $html = view('quotes.pdf', ['quote' => $quote])->render();

        if (class_exists('\Dompdf\Dompdf')) {
            $dompdf = new \Dompdf\Dompdf();
            $dompdf->loadHtml($html);
            $dompdf->setPaper('A4', 'portrait');
            $dompdf->render();

            return response()->streamDownload(function () use ($dompdf) {
                echo $dompdf->output();
            }, 'devis-' . $quote->quote_number . '.pdf', [
                'Content-Type' => 'application/pdf',
            ]);
        }

        return response($html);
    }

    // Delete
    public function destroy(Quote $quote)
    {
        $quote->delete();

        return back();
    }
}
