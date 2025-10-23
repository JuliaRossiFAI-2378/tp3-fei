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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('player_id');
            $table->foreign('player_id')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('isLive')->default(true);
            $table->integer('currentDay')->default(1);
            $table->unsignedBigInteger('currentEnemy')->nullable();
            $table->foreign('currentEnemy')->references('id')->on('npcs')->onDelete('cascade');
            $table->timestamps();
            $table->integer('currentHp')->default(20);
            $table->unsignedBigInteger('ghost_id')->nullable();
            $table->foreign('ghost_id')->references('id')->on('ghosts')->onDelete('cascade');
            $table->unsignedBigInteger('currentScene')->default(1);
            $table->foreign('currentScene')->references('id')->on('scenes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
