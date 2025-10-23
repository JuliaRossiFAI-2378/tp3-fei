<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Npc extends Model
{
    /** @use HasFactory<\Database\Factories\NPCFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $with = ['effectTriggers', 'materials'];

    public function materials(){
        return $this->belongsToMany(Material::class, 'material_npc');
    }

    public function games(){
        return $this->hasMany(Game::class);
    }

    public function effectTriggers(){
        return $this->belongsToMany(EffectTrigger::class, 'npc_effect_trigger')->withPivot('effectValue')->with('effect', 'trigger');
    }
}
