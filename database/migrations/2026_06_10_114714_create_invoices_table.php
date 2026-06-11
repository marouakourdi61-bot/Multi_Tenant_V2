<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {

            $table->id();

            // tenant
            $table->foreignId('tenant_id')
                ->constrained()
                ->cascadeOnDelete();

            // invoice
            $table->string('invoice_number')->unique();

            $table->string('recipient');

            $table->string('currency')->default('MAD');

            $table->boolean('vat')->default(false);

            $table->json('items');

            $table->text('notes')->nullable();

            $table->text('concluding_text')->nullable();

            $table->decimal('total', 10, 2)->default(0);

            $table->enum('status', [
                'draft',
                'sent',
                'paid',
                'cancelled',
            ])->default('draft');

            $table->date('issue_date');

            $table->date('due_date')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};