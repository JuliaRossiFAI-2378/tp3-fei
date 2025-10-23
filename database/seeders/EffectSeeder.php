<?php

namespace Database\Seeders;

use App\Models\Effect;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EffectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Effect::create([
            'name' => 'test',
            'description' => 'no effect',
        ]);

        Effect::create([
            'name' => 'thorns',
            'description' => 'damage when attacked',
        ]);

        Effect::create([
            'name' => 'bleeding',
            'description' => 'aaa',
        ]);
    }
}
