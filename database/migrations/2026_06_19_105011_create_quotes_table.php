<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {

            $table->id();

            // organization
            $table->foreignId('tenant_id')
                ->constrained()
                ->cascadeOnDelete();

            // quote number
            $table->string('quote_number')->unique();

            // client
            $table->string('recipient');

            // settings
            $table->string('currency')->default('MAD');

            $table->integer('validity_days')
                ->default(30);

            $table->boolean('vat')
                ->default(true);

            // items
            $table->json('items');

            // notes
            $table->text('notes')
                ->nullable();

            // amounts
            $table->decimal('subtotal', 10, 2)
                ->default(0);

            $table->decimal('tax_amount', 10, 2)
                ->default(0);

            $table->decimal('total', 10, 2)
                ->default(0);

            // status
            $table->enum('status', [
                'draft',
                'sent',
                'accepted',
                'rejected',
            ])->default('draft');

            $table->date('issue_date');

            $table->date('expiry_date');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};