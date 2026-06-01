<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Spatie\Multitenancy\Models\Tenant;

class InitializeTenant
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->tenant_id) {
            $tenant = Tenant::find(auth()->user()->tenant_id);

            if ($tenant) {
                $tenant->makeCurrent();
            }
        }
        

        return $next($request);
    }
}
