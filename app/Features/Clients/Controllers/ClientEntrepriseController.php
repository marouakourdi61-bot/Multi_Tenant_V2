<?php

namespace App\Features\Clients\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Features\Clients\Models\ClientEntreprise;

class ClientEntrepriseController extends Controller
{
    public function index()
    {
        $companies =
            ClientEntreprise::query()
                ->where(
                    'tenant_id',
                    auth()->user()->tenant->id
                )
                ->withCount('invoices')
                ->latest()
                ->get();

        return Inertia::render(
            'Clients/Entreprises/Index',
            [
                'companies' => $companies
            ]
        );
    }

    public function store(Request $request)
    {
        $validated =
            $request->validate([

                'name' =>
                    'required|string',

                'email' =>
                    'nullable|email',

                'phone' =>
                    'nullable|string',

                'address' =>
                    'nullable|string',

                'city' =>
                    'nullable|string',

                'postal_code' =>
                    'nullable|string',

                'country' =>
                    'nullable|string',

                'ice' =>
                    'nullable|string',

                'rc' =>
                    'nullable|string',

                'if_number' =>
                    'nullable|string',

                'cnss' =>
                    'nullable|string',

                'notes' =>
                    'nullable|string',
            ]);

        ClientEntreprise::create([

            ...$validated,

            'tenant_id' =>
                auth()
                    ->user()
                    ->tenant
                    ->id,
        ]);

        return back();
    }


    public function edit(ClientEntreprise $company)
    {
        return Inertia::render(
            'Clients/Entreprises/Edit',
            [
                'company' => $company,
            ]
        );
    }

    public function update(
        Request $request,
        ClientEntreprise $company
    ) {

        $data = $request->validate([

            'name' => 'required',

            'email' => 'nullable',

            'phone' => 'nullable',

            'address' => 'nullable',

            'city' => 'nullable',

            'postal_code' => 'nullable',

            'country' => 'nullable',

            'ice' => 'nullable',

            'rc' => 'nullable',

            'if_number' => 'nullable',

            'cnss' => 'nullable',

            'notes' => 'nullable',

        ]);

        $company->update($data);

        return redirect()
            ->route(
                'entreprises.index'
            );
    }

    public function destroy(
        ClientEntreprise $client
    ) {

        $client->delete();

        return back();
    }
}