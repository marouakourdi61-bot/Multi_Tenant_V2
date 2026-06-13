<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Facture {{ $invoice->invoice_number }}</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            background: #ffffff;
            color: #111827;
            font-size: 12px;
            padding: 40px;
        }

        .top-bar {
            height: 8px;
            background: #6366f1;
            margin: -40px -40px 40px;
        }

        .primary {
            color: #6366f1;
        }

        .header {
            width: 100%;
            margin-bottom: 50px;
        }

        .left {
            float: left;
            width: 55%;
        }

        .right {
            float: right;
            width: 40%;
            text-align: right;
        }

        .clear {
            clear: both;
        }

        .company-name {
            font-size: 26px;
            font-weight: bold;
            color: #6366f1;
        }

        .company-type {
            font-size: 10px;
            font-weight: bold;
            margin-top: 8px;
        }

        .address {
            margin-top: 15px;
            line-height: 1.8;
            color: #6b7280;
        }

        .invoice-badge {
            display: inline-block;
            background: #6366f1;
            color: white;
            padding: 10px 35px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 8px;
            margin-bottom: 15px;
        }

        .meta {
            line-height: 2;
            color: #374151;
        }

        .client-box {

            margin-left: auto;

            width: 280px;

            padding: 20px;

            border: 1px solid #e5e7eb;

            border-radius: 10px;

            margin-bottom: 40px;

        }

        .client-title {

            font-size: 10px;

            color: #6366f1;

            font-weight: bold;

            margin-bottom: 8px;

        }

        .client-name {

            font-size: 18px;

            font-weight: bold;

        }

        .items {

            width: 100%;

            border-collapse: collapse;

            margin-top: 20px;

        }

        .items thead {

            background: #6366f1;

            color: white;

        }

        .items th {

            padding: 15px;

            font-size: 11px;

        }

        .items td {

            padding: 15px;

            border-bottom: 1px solid #ececec;

        }

        .center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .summary {

            width: 320px;

            margin-left: auto;

            margin-top: 40px;

        }

        .summary-row {

            padding: 10px 0;

        }

        .summary-table {

            width: 100%;

        }

        .summary-table td {

            padding: 8px 0;

        }

        .total-final {

            font-size: 22px;

            font-weight: bold;

            border-top: 1px solid #ddd;

            padding-top: 18px;

            color: #6366f1;

        }

        .notes {

            margin-top: 50px;

            padding-top: 20px;

            border-top: 1px solid #eee;

        }

        .notes-title {

            font-weight: bold;

            margin-bottom: 10px;

        }
    </style>

</head>

<body>

    <div class="top-bar"></div>

    <div class="header">

        <div class="left">

            <div class="company-name">
                {{ optional(auth()->user()->tenant)->name ?? 'Organisation' }}
            </div>

            <div class="company-type">
                {{ strtoupper(optional(auth()->user()->tenant)->legal_form ?? '') }}
            </div>

            <div class="address">

                {{ optional(auth()->user()->tenant)->address }}

                <br>

                {{ optional(auth()->user()->tenant)->postal_code }}
                {{ optional(auth()->user()->tenant)->city }}

                <br>

                {{ optional(auth()->user()->tenant)->country }}

            </div>

        </div>

        <div class="right">

            <div class="invoice-badge">
                FACTURE
            </div>

            <div class="meta">

                <div>
                    N° :
                    {{ $invoice->invoice_number }}
                </div>

                <div>
                    Date :
                    {{ \Carbon\Carbon::parse($invoice->issue_date)->format('d/m/Y') }}
                </div>

                @if($invoice->due_date)

                    <div>
                        Échéance :
                        {{ \Carbon\Carbon::parse($invoice->due_date)->format('d/m/Y') }}
                    </div>

                @endif

            </div>

        </div>

        <div class="clear"></div>

    </div>


    <div class="client-box">

        <div class="client-title">
            FACTURÉ À
        </div>

        <div class="client-name">
            {{ $invoice->recipient }}
        </div>

    </div>


    <table class="items">

        <thead>

            <tr>

                <th>DÉSIGNATION</th>

                <th class="center">
                    QTÉ
                </th>

                <th class="text-right">
                    PRIX
                </th>

                <th class="text-right">
                    TOTAL
                </th>

            </tr>

        </thead>

        <tbody>

            @foreach($invoice->items as $item)

                        <tr>

                            <td>
                                {{ $item['description'] ?? '-' }}
                            </td>

                            <td class="center">
                                {{ $item['qty'] ?? 0 }}
                            </td>

                            <td class="text-right">

                                {{ number_format($item['unit_price'] ?? 0, 2) }}

                                {{ $invoice->currency }}

                            </td>

                            <td class="text-right">

                                {{ number_format(
                    ($item['qty'] ?? 0)
                    *
                    ($item['unit_price'] ?? 0),
                    2
                ) }}

                                {{ $invoice->currency }}

                            </td>

                        </tr>

            @endforeach

        </tbody>

    </table>


    <div class="summary">

        <table class="summary-table">

            <tr>

                <td>
                    Sous-total
                </td>

                <td class="text-right">

                    {{ number_format($invoice->total, 2) }}

                    {{ $invoice->currency }}

                </td>

            </tr>

            @if($invoice->vat)

                <tr>

                    <td>
                        TVA
                    </td>

                    <td class="text-right">
                        20%
                    </td>

                </tr>

            @endif

            <tr>

                <td class="total-final">
                    Total
                </td>

                <td class="text-right total-final">

                    {{ number_format($invoice->total, 2) }}

                    {{ $invoice->currency }}

                </td>

            </tr>

        </table>

    </div>


    @if($invoice->notes)

        <div class="notes">

            <div class="notes-title">
                Notes
            </div>

            <div>
                {{ $invoice->notes }}
            </div>

        </div>

    @endif


    @if($invoice->concluding_text)

        <div style="margin-top:20px">

            {{ $invoice->concluding_text }}

        </div>

    @endif

</body>

</html>