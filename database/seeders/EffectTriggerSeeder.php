<?php

namespace Database\Seeders;

use App\Models\EffectTrigger;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EffectTriggerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EffectTrigger::create([ //default/test
            'effect_id' => 1,   //foranea
            'trigger_id' => 1,  //foranea
        ]);

    }
}
