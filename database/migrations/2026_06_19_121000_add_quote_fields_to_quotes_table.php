<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            $table->text('concluding_text')->nullable()->after('notes');
            $table->text('terms_conditions')->nullable()->after('concluding_text');
            $table->text('footer_text')->nullable()->after('terms_conditions');
            $table->decimal('general_discount', 10, 2)->default(0)->after('footer_text');
            $table->string('general_discount_type', 10)->default('%')->after('general_discount');
        });
    }

    public function down(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn([
                'concluding_text',
                'terms_conditions',
                'footer_text',
                'general_discount',
                'general_discount_type',
            ]);
        });
    }
};