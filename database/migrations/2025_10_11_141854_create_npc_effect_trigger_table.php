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
        Schema::create('npc_effect_trigger', function (Blueprint $table) {
            $table->id();
            $table->integer('effectValue');
            $table->unsignedBigInteger('npc_id');
            $table->foreign('npc_id')->references('id')->on('npcs')->onDelete('cascade');
            $table->unsignedBigInteger('effect_trigger_id');
            $table->foreign('effect_trigger_id')->references('id')->on('effect_triggers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('npc_effect_trigger');
    }
};
