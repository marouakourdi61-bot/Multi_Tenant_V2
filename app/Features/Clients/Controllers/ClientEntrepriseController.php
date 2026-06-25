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
        $tenantId =
            auth()->user()->tenant?->id;

        return Inertia::render(
            'Clients/Entreprises/Index',
            [
                'clients' =>
                    ClientEntreprise::where(
                        'tenant_id',
                        $tenantId
                    )
                    ->latest()
                    ->get()
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

    public function update(
        Request $request,
        ClientEntreprise $client
    ) {

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

        $client->update(
            $validated
        );

        return back();
    }

    public function destroy(
        ClientEntreprise $client
    ) {

        $client->delete();

        return back();
    }
}