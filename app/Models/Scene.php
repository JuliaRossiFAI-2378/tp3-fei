<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scene extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    //
    public function games(){
        return $this->hasMany(Game::class);
    }
}
