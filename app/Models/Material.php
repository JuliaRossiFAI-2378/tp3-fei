<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    public $timestamps = false;

    public function NPC(){
        return $this->belongsToMany(NPC::class, 'material_npc');
    }

    public function Item(){
        return $this->hasMany(Item::class);
    }
    
}
