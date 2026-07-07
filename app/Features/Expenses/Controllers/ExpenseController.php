<?php

namespace App\Features\Expenses\Controllers;

use App\Http\Controllers\Controller;

use App\Features\Expenses\Models\Expense;
use App\Features\Expenses\Models\ExpenseMonth;
use App\Features\Invoices\Models\Invoice;

use App\Features\Expenses\Requests\StoreExpenseRequest;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses =
            Expense::with(
                'months'
            )
                ->where(
                    'tenant_id',
                    auth()->user()->tenant?->id
                )
                ->get();

        $invoices = Invoice::forCurrentTenant()
            ->where('status', 'paid')
            ->get(['total', 'issue_date']);

        return inertia(
            'Expenses/Index',
            [
                'expenses' => $expenses,
                'invoices' => $invoices,
            ]
        );
    }

    public function create()
    {
        return Inertia::render(
            'Expenses/Create'
        );
    }

    public function store(
        StoreExpenseRequest $request
    ) {
        $amount = $request->filled('monthly_amount')
            ? (float) $request->monthly_amount
            : 0;

        $expense = Expense::create([
            'tenant_id' => auth()->user()->tenant?->id,
            'name' => $request->name,
            'recurrence' => $request->recurrence,
            'amount' => $amount,
        ]);

        return redirect()
            ->route('expenses.index');
    }

    public function updateMonth(Request $request, Expense $expense)
    {
        $request->validate([
            'year' => 'required|integer',
            'month' => 'required|integer|between:1,12',
            'amount' => 'nullable|numeric|min:0',
        ]);

        $amount = $request->filled('amount')
            ? (float) $request->amount
            : 0;

        ExpenseMonth::updateOrCreate(
            [
                'expense_id' => $expense->id,
                'year' => $request->year,
                'month' => $request->month,
            ],
            [
                'amount' => $amount,
            ]
        );

        return back();
    }
}
