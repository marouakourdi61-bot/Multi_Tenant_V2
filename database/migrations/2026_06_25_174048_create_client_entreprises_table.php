<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients_entreprises', function (Blueprint $table) {

            $table->id();

            $table->foreignId('tenant_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');

            $table->string('email')->nullable();

            $table->string('phone')->nullable();

            $table->text('address')->nullable();

            $table->string('city')->nullable();

            $table->string('postal_code')->nullable();

            $table->string('country')
                ->default('MA');

            $table->string('ice')
                ->nullable();

            $table->string('rc')
                ->nullable();

            $table->string('if_number')
                ->nullable();

            $table->string('cnss')
                ->nullable();

            $table->text('notes')
                ->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'clients_entreprises'
        );
    }
};