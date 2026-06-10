<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tenants', function (Blueprint $table) {

            

            $table->string('email')->nullable();

            $table->string('legal_form')->nullable();

            $table->string('address')->nullable();

            $table->string('address_complement')->nullable();

            $table->string('postal_code')->nullable();

            $table->string('city')->nullable();

            $table->string('country')->default('MA');

            $table->string('timezone')->default('Europe/Paris');
        });
    }

    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {

            $table->dropConstrainedForeignId('user_id');

            $table->dropColumn([
                'email',
                'legal_form',
                'address',
                'address_complement',
                'postal_code',
                'city',
                'country',
                'timezone',
            ]);
        });
    }
};