<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = [
        'player_id',
        'isLive',
        'currentDay',
        'currentEnemy',
        'currentHp',
        'currentScene',
        'ghost_id'
    ];

    protected $guarded = [];

    public function equipments(){
        return $this->belongsToMany(Equipment::class, 'equipment_game');
    }

    public function npc(){
        return $this->belongsTo(NPC::class, 'currentEnemy');
    }

    public function player(){
        return $this->belongsTo(User::class, 'player_id');
    }

    public function rivals(){
        return $this->belongsToMany(User::class, 'game_user')->withPivot('rivalDay');
    }

    public function ghost(){
        return $this->belongsTo(Ghost::class, 'ghost_id');
    }

    public function scene(){
        return $this->belongsTo(Scene::class);
    }

}
