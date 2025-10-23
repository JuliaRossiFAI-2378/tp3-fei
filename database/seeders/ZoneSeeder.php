<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Zone;

class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Zone::create([
            'name' => 'helm',
            'description' => 'Como casquito o sombrerito'
        ]);
        Zone::create([
            'name' => 'shoulder',
            'description' => 'Cosa fancy en los hombros'
        ]);
        Zone::create([
            'name' => 'blade',
            'description' => 'Filo de la espada'
        ]);
        Zone::create([
            'name' => 'hilt',
            'description' => 'Mango de la espada'
        ]);
        Zone::create([
            'name' => 'pants',
            'description' => 'Pants si'
        ]);
        Zone::create([
            'name' => 'boots',
            'description' => 'Botitas'
        ]);
        Zone::create([
            'name' => 'outer shield',
            'description' => 'Name pending no se como se llama a esto'
        ]);
        Zone::create([
            'name' => 'inner shield',
            'description' => 'Name pending no se como se llama a esto'
        ]);
    }
}
