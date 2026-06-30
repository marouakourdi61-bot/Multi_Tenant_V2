<?php

namespace App\Features\Expenses\Controllers;

use Inertia\Inertia;

use App\Http\Controllers\Controller;

use App\Features\Expenses\Models\Expense;

use App\Features\Expenses\Requests\StoreExpenseRequest;

class ExpenseController
extends Controller
{
    public function index()
    {
        $tenantId =

            auth()
            ->user()
            ->tenant?->id

            ??

            auth()
            ->user()
            ->tenants()
            ->latest()
            ->value(
                'id'
            );

        return Inertia::render(

            'Expenses/Index',

            [

                'expenses' =>

                Expense
                    ::where(
                        'tenant_id',
                        $tenantId
                    )
                    ->latest()
                    ->get(),

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
    )
    {

        $tenantId =

            auth()
            ->user()
            ->tenant?->id

            ??

            auth()
            ->user()
            ->tenants()
            ->latest()
            ->value(
                'id'
            );

        Expense::create([

            ...$request
                ->validated(),

            'tenant_id' =>
                $tenantId,

        ]);

        return redirect()
            ->route(
                'expenses.index'
            );
    }
}