<?php

namespace App\Features\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TenantController extends Controller
{
    // Show / create organization 
     
    public function create()
    {
        return Inertia::render('Tenants/Create');
    }

    // Store new tenant
     
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $tenant = Tenant::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        $user = auth()->user();

        $user->tenant_id = $tenant->id;

        $user->save();

        //  tenant current
        $tenant->makeCurrent();

        return redirect('/dashboard');
    }
}
