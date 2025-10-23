<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    /** @use HasFactory<\Database\Factories\EquipmentFactory> */
    use HasFactory;

    protected $with = ['baseItem.material', 'addonItem.material', 'type'];//esto es 10000000 veces mejor q llamarlo en el controlador

    public $timestamps = false;

    public function type(){
        return $this->belongsTo(Type::class);
    }

    public function baseItem(){
        return $this->belongsTo(Item::class, 'base');
    }

    public function addonItem(){
        return $this->belongsTo(Item::class, 'addon');
    }

    public function games(){
        return $this->belongsToMany(Game::class, 'equipment_game');
    }

    public function ghosts(){
        return $this->belongsToMany(Ghost::class);
    }

}
