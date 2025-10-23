<?php

namespace Database\Seeders;

use App\Models\Trigger;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TriggerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trigger::create([
            'name' => 'test',
            'description' => 'no trigger',
        ]);

        Trigger::create([
            'name' => 'onAttack',
            'description' => 'no',
        ]);

        Trigger::create([
            'name' => 'onHit',
            'description' => 'no',
        ]);

        Trigger::create([
            'name' => 'onGetHit',
            'description' => 'no',
        ]);

        Trigger::create([
            'name' => 'onStartSelf',
            'description' => 'no',
        ]);

        Trigger::create([
            'name' => 'onStartEnemy',
            'description' => 'no',
        ]);
    }
}
