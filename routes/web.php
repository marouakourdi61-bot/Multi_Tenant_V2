<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Tenant;
use App\Features\Tenant\TenantController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



// Route::get('/tenant-test', function () {

//     $tenant = Tenant::find(auth()->user()->tenant_id);

//     if ($tenant) {
//         $tenant->makeCurrent();

//         return response()->json([
//             'tenant_id' => $tenant->id,
//             'tenant_name' => $tenant->name,
//             'tenant_slug' => $tenant->slug,
//         ]);
//     }

//     return 'No current tenant';

// })->middleware(['auth']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

   


    Route::get('/tenants/create', [TenantController::class, 'create'])
        ->name('tenants.create');






    Route::get('/tenants/create', [TenantController::class, 'create'])
        ->name('tenants.create');

    Route::post('/tenants', [TenantController::class, 'store'])
        ->name('tenants.store');




    
});

require __DIR__.'/auth.php';
