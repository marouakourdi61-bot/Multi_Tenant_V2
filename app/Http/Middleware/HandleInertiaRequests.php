<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        $tenant = null;
        $tenants = [];

        if ($user) {
            $tenantId = session('tenant_id');
            if ($tenantId) {
                $tenant = $user->tenants()->find($tenantId);
            }

            if (!$tenant) {
                $tenant = $user->tenants()->latest()->first();
                if ($tenant) {
                    session(['tenant_id' => $tenant->id]);
                }
            }

            $tenants = $user->tenants()->get();
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'tenant' => $tenant,
                'tenants' => $tenants,
            ],
        ];
    }
}
