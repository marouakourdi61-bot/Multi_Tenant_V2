<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Tenant;

class InitializeTenant
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check()) {

            $user = auth()->user();
            $tenant = null;

            if ($user->tenant_id) {
                $tenant = Tenant::find($user->tenant_id);
            }

            if (!$tenant) {
                $tenant = Tenant::where('user_id', $user->id)->latest()->first();
            }

            if (!$tenant) {
                if (!$request->is('tenants/create') && !$request->is('tenants')) {
                    return redirect('/tenants/create');
                }
            } else {
                $tenant->makeCurrent();
                $user->setRelation('tenant', $tenant);
            }
        }

        return $next($request);
    }
}