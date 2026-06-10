<?php

namespace App\Features\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TenantController extends Controller
{
    /**
     * Show create tenant page
     */
    public function create()
    {
        return Inertia::render('Tenants/Create');
    }

    /**
     * Store new tenant
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'legal_form' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'address_complement' => ['nullable', 'string'],
            'postal_code' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'country' => ['nullable', 'string'],
            'timezone' => ['nullable', 'string'],
        ]);

        // Ensure slug is unique by appending a numeric suffix if necessary
        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $counter = 1;

        while (Tenant::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }

        $tenant = Tenant::create([
            'user_id' => auth()->id(),

            'name' => $request->name,
            'slug' => $slug,

            'email' => $request->email,
            'legal_form' => $request->legal_form,
            'address' => $request->address,
            'address_complement' => $request->address_complement,
            'postal_code' => $request->postal_code,
            'city' => $request->city,
            'country' => $request->country,
            'timezone' => $request->timezone,
        ]);

        // Set current tenant
        $tenant->makeCurrent();

        return redirect('/dashboard');
    }
}