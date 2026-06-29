<?php

namespace App\Features\Clients\Controllers;

use Inertia\Inertia;

use App\Http\Controllers\Controller;

use App\Features\Clients\Models\Fournisseur;

use App\Features\Clients\Requests\StoreFournisseurRequest;
use App\Features\Clients\Requests\UpdateFournisseurRequest;

class FournisseurController
extends Controller
{
    public function index()
    {
        return Inertia::render(
            'Clients/Fournisseurs/Index',
            [

                'suppliers' =>

                Fournisseur
                    ::latest()
                    ->get(),

            ]
        );
    }

    public function store(
        StoreFournisseurRequest $request
    ) {

        Fournisseur::create(
            $request->validated()
        );

        return back();
    }

    public function update(
        UpdateFournisseurRequest $request,
        Fournisseur $fournisseur
    ) {

        $fournisseur->update(
            $request->validated()
        );

        return back();
    }

    public function destroy(
        Fournisseur $fournisseur
    ) {

        $fournisseur->delete();

        return back();
    }
}