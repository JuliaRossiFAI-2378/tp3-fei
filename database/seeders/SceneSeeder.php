<?php

namespace Database\Seeders;

use App\Models\Scene;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SceneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Scene::create([
            'name' => 'start',
            'description' => 'first scene',
        ]);

        Scene::create([
            'name' => 'npc',
            'description' => 'scripted enemy battle',
        ]);

        Scene::create([
            'name' => 'loot',
            'description' => 'loot selection after npc battle',
        ]);

        Scene::create([
            'name' => 'select',
            'description' => 'enemy selection',
        ]);

        Scene::create([
            'name' => 'ghost',
            'description' => 'ghost enemy battle',
        ]);
    }
}
