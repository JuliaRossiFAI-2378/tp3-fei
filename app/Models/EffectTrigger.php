<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EffectTrigger extends Model
{
        protected $fillable = [
            'effect_id',
            'trigger_id'
        ];

    public $timestamps = false;

    //tambien se podria usar protected $with = ['effects', 'triggers'];

    public function effect(){
        return $this->belongsTo(Effect::class);
    }

    public function trigger(){
        return $this->belongsTo(Trigger::class);
    }

    public function npcs(){
        return $this->belongsToMany(Npc::class, 'npc_effect_trigger')->withPivot('effectValue');
    }
}
