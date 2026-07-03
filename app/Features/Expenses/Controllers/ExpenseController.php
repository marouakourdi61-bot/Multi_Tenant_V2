<?php

namespace App\Features\Expenses\Controllers;

use App\Http\Controllers\Controller;

use App\Features\Expenses\Models\Expense;
use App\Features\Expenses\Models\ExpenseMonth;

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

        return inertia(
            'Expenses/Index',
            [
                'expenses' => $expenses
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
        $expense = Expense::create([
            'tenant_id' => auth()->user()->tenant?->id,
            'name' => $request->name,
            'recurrence' => $request->recurrence,
        ]);

        // Si c'est une dépense fixe, créer les 12 mois automatiquement
        if ($request->recurrence === 'fixed') {
            $amount = $request->monthly_amount ?? 0;
            for ($month = 1; $month <= 12; $month++) {
                ExpenseMonth::create([
                    'expense_id' => $expense->id,
                    'year' => now()->year,
                    'month' => $month,
                    'amount' => $amount,
                ]);
            }
        }

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

        ExpenseMonth::updateOrCreate(
            [
                'expense_id' => $expense->id,
                'year' => $request->year,
                'month' => $request->month,
            ],
            [
                'amount' => $request->amount ?? 0,
            ]
        );

        return back();
    }
}
