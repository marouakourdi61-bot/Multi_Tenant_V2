<?php

namespace App\Features\Clients\Controllers;

use Inertia\Inertia;

use App\Http\Controllers\Controller;

use App\Features\Clients\Models\Fournisseur;

use App\Features\Clients\Requests\StoreFournisseurRequest;
use App\Features\Clients\Requests\UpdateFournisseurRequest;

class FournisseurController extends Controller
{
    public function index()
    {
        $tenantId =
            auth()->user()->tenant?->id
            ?? auth()->user()->tenants()->latest()->value('id');

        return Inertia::render(
            'Clients/Fournisseurs/Index',
            [

                'suppliers' =>

                    Fournisseur::where(
                        'tenant_id',
                        $tenantId
                    )
                        ->latest()
                        ->get(),

            ]
        );
    }

    public function store(
        StoreFournisseurRequest $request
    ) {

        $tenantId =
            auth()->user()->tenant?->id
            ?? auth()->user()->tenants()->latest()->value('id');

        Fournisseur::create([

            ...$request->validated(),

            'tenant_id' =>
                $tenantId,

        ]);

        return back();
    }

    public function update(
        UpdateFournisseurRequest $request,
        Fournisseur $fournisseur
    ) {
        abort_if(

            $fournisseur->tenant_id
            !== auth()->user()->tenant_id,

            403

        );

        $fournisseur->update(

            $request->validated()

        );

        return back();
    }

    public function destroy(
        Fournisseur $fournisseur
    ) {
        abort_if(

            $fournisseur->tenant_id
            !== auth()->user()->tenant_id,

            403

        );

        $fournisseur->delete();

        return back();
    }
}