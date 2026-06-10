<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();

            // Organization / Tenant
            $table->foreignId('tenant_id')
                ->constrained()
                ->cascadeOnDelete();

            // Invoice info
            $table->string('number')->unique();

            $table->date('issue_date');
            $table->date('due_date')->nullable();

            // Client
            $table->string('client_name');

            // Amounts
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2)->default(0);

            // Status
            $table->enum('status', [
                'draft',
                'sent',
                'paid',
                'unpaid',
                'cancelled',
            ])->default('draft');

            // Notes
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};