<?php

namespace App\Http\Controllers;

use App\Features\Invoices\Models\Invoice;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $tenant = $user->tenant;

        // Get invoice stats for the current tenant
        $invoiceStats = Invoice::forCurrentTenant()
            ->select(
                DB::raw('COUNT(*) as total_invoices'),
                DB::raw('SUM(total) as total_revenue'),
                DB::raw('SUM(CASE WHEN status = "paid" THEN total ELSE 0 END) as paid_amount'),
                DB::raw('SUM(CASE WHEN status = "pending" THEN total ELSE 0 END) as pending_amount')
            )
            ->first();

        // Get distinct clients count
        $clients_count = Invoice::forCurrentTenant()
            ->distinct('recipient')
            ->count('recipient');

        // Get recent invoices
        $recent_invoices = Invoice::forCurrentTenant()
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_revenue' => $invoiceStats->total_revenue ?? 0,
                'pending_amount' => $invoiceStats->pending_amount ?? 0,
                'clients_count' => $clients_count,
                'total_invoices' => $invoiceStats->total_invoices ?? 0,
            ],
            'recent_invoices' => $recent_invoices,
        ]);
    }
}
