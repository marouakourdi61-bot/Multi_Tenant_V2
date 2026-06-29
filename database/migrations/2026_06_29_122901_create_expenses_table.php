<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(
            'expenses',

            function (
                Blueprint $table
            ) {

                $table->id();

                $table
                    ->foreignId(
                        'tenant_id'
                    )
                    ->nullable()
                    ->constrained(
                        'tenants'
                    )
                    ->cascadeOnDelete();

                $table
                    ->string(
                        'name'
                    );

                $table
                    ->enum(
                        'recurrence',
                        [
                            'fixed',
                            'variable'
                        ]
                    )
                    ->default(
                        'fixed'
                    );

                $table
                    ->decimal(
                        'amount',
                        12,
                        2
                    )
                    ->default(
                        0
                    );

                $table
                    ->timestamps();
            }
        );
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'expenses'
        );
    }
};