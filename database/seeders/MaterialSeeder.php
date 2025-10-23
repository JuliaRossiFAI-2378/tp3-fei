<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Material;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Material::create([
            'name' => 'Iron',
            'image' => 'Iron.webp',
            'defaultDmg' => 2,
            'defaultHealth' => 20,
            'defaultArmor' => 1,
            'defaultSpeed' => 2,
        ]);
        Material::create([
            'name' => 'Cebollin',
            'image' => 'Cebollin.webp',
            'defaultDmg' => 20,
            'defaultHealth' => 2,
            'defaultArmor' => 1,
            'defaultSpeed' => 2,
        ]);
        Material::create([
            'name' => 'Rose',
            'image' => 'Rose.png',
            'defaultDmg' => 15,
            'defaultHealth' => 2,
            'defaultArmor' => 1,
            'defaultSpeed' => 2,
        ]);
    }
}
