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

            if (!$user->tenant_id) {

                if (!$request->is('tenants/create') && !$request->is('tenants')) {
                    return redirect('/tenants/create');
                }
            }

            if ($user->tenant_id) {

                $tenant = Tenant::find($user->tenant_id);

                if ($tenant) {
                    $tenant->makeCurrent();
                }
            }
        }

        return $next($request);
    }
}