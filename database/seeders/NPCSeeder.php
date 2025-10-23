<?php

namespace Database\Seeders;

use App\Models\NPC;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NPCSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bunny = NPC::create([
            'name' => 'testbunny1',
            'hp' => 10,
            'atk' => 1,
            'spd' => 1,
            'day' => 1,
            'image' => 'bunny.png',
            'armor' => 0
        ]);

        $bunny->effectTriggers()->attach(1, ['effectValue' => 1]);//aplicando test


        NPC::create([
            'name' => 'testbunny2',
            'hp' => 20,
            'atk' => 2,
            'spd' => 1,
            'day' => 1,
            'image' => 'bunny.png',
            'armor' => 0
        ]);

        NPC::create([
            'name' => 'testbunny3',
            'hp' => 30,
            'atk' => 3,
            'spd' => 1,
            'day' => 1,
            'image' => 'bunny.png',
            'armor' => 1
        ]);
    }
}
