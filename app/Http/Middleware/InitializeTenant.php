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
            $tenantId = $request->session()->get('tenant_id');

            if ($tenantId) {
                $tenant = $user->tenants()->find($tenantId);
            }

            if (!$tenant) {
                $tenant = $user->tenants()->latest()->first();
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