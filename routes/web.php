<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Tenant;
use App\Features\Tenant\TenantController;
use App\Features\invoices\Controllers\InvoiceController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');



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

    Route::post('/tenants/{tenant}/switch', [TenantController::class, 'switch'])
        ->name('tenants.switch');

    Route::post('/tenants', [TenantController::class, 'store'])
        ->name('tenants.store');



    Route::get('/invoices', [InvoiceController::class, 'index'])
        ->name('invoices.index');

    Route::get('/invoices/create', [InvoiceController::class, 'create']);
    Route::post('/invoices', [InvoiceController::class, 'store'])
        ->name('invoices.store');

    Route::get('/invoices/{invoice}', [InvoiceController::class, 'show'])
        ->name('invoices.show');

    Route::get('/invoices/{invoice}/edit', [InvoiceController::class, 'edit'])
        ->name('invoices.edit');

    Route::match(['put', 'patch'], '/invoices/{invoice}', [InvoiceController::class, 'update'])
        ->name('invoices.update');

    Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy'])
        ->name('invoices.destroy');

    Route::get('/invoices/{invoice}/download', [InvoiceController::class, 'downloadPdf'])
        ->name('invoices.download');





});

require __DIR__ . '/auth.php';
