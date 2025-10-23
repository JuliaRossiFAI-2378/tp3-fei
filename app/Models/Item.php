<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $with = ['effect', 'trigger'];

    public function equipments(){
        return $this->hasMany(Equipment::class);
    }

    public function effect(){
        return $this->belongsTo(Effect::class);
    }

    public function zone(){
        return $this->belongsTo(Zone::class);
    }

    public function material(){
        return $this->belongsTo(Material::class);
    }

    public function trigger(){
        return $this->belongsTo(Trigger::class);
    }
}
