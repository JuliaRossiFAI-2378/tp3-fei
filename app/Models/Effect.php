<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Effect extends Model
{
    public $timestamps = false;

    public function Items(){
        return $this->hasMany(Item::class);
    }

    public function effectTriggers(){
        return $this->hasMany(EffectTrigger::class);
    }
}
