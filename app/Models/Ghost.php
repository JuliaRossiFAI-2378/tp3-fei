<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ghost extends Model
{
    //
    protected $with = ['equipments.baseItem.material', 'equipments.addonItem.material' , 'user'];

    protected $guarded = [];

    public $timestamps = false;

    public function games(){
        return $this->hasMany(Game::class);
    }

    public function equipments(){
        return $this->belongsToMany(Equipment::class);
    }

    public function user(){
        return $this->belongsTo(User::class, "player_id");
    }
}
