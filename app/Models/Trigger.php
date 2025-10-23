<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trigger extends Model
{
    public $timestamps = false;

    public function items(){
        return $this->hasMany(Item::class);
    }

    public function effectTriggers(){
        return $this->hasMany(EffectTrigger::class);
    }
}
