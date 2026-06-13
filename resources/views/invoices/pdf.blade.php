<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Facture {{ $invoice->invoice_number }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 20px; }
        .items { width: 100%; border-collapse: collapse; }
        .items th, .items td { border: 1px solid #ddd; padding: 8px; }
        .right { text-align: right; }
    </style>
 </head>
<body>
    <div class="header">
        <h1>Facture {{ $invoice->invoice_number }}</h1>
        <div>Émise le: {{ \Illuminate\Support\Carbon::parse($invoice->issue_date)->format('d/m/Y') }}</div>
    </div>

    <div>
        <strong>Destinataire:</strong>
        <div>{{ $invoice->recipient }}</div>
    </div>

    <table class="items">
        <thead>
            <tr>
                <th>Libellé</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
        @foreach($invoice->items as $item)
            <tr>
                <td>{{ $item['description'] ?? '-' }}</td>
                <td class="right">{{ $item['qty'] ?? 0 }}</td>
                <td class="right">{{ number_format($item['unit_price'] ?? 0, 2) }}</td>
                <td class="right">{{ number_format( ($item['qty'] ?? 0) * ($item['unit_price'] ?? 0), 2) }}</td>
            </tr>
        @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="right">Sous-total</td>
                <td class="right">{{ number_format($invoice->total, 2) }}</td>
            </tr>
        </tfoot>
    </table>

    @if($invoice->notes)
    <div style="margin-top:20px;">
        <strong>Notes:</strong>
        <div>{{ $invoice->notes }}</div>
    </div>
    @endif

</body>
</html>
