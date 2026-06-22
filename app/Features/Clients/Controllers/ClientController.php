<?php

namespace App\Features\Clients\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

use App\Features\Clients\Models\Client;
use App\Features\Clients\Requests\StoreClientRequest;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render(
            'Clients/Particuliers/Index',
            [
                'clients' => Client::withCount('invoices')
                    ->latest()
                    ->get()
            ]
        );
    }
    public function create()
    {
        return Inertia::render(
            'Clients/Particuliers/Create'
        );
    }

    public function store(StoreClientRequest $request)
    {
        Client::create(
            $request->validated()
        );

        return redirect()
            ->route('clients.index')
            ->with(
                'success',
                'Client créé avec succès'
            );
    }
}
