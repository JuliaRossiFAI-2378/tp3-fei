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
        Schema::create('effect_triggers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('effect_id');
            $table->foreign('effect_id')->references('id')->on('effects')->onDelete('cascade');
            $table->unsignedBigInteger('trigger_id');
            $table->foreign('trigger_id')->references('id')->on('triggers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('effect_triggers');
    }
};
