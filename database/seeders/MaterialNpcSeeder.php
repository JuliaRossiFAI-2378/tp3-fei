<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaterialNpcSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('material_npc')->insert([
              ['npc_id' => 1, 'material_id' => 1],
              ['npc_id' => 1, 'material_id' => 2],
              ['npc_id' => 1, 'material_id' => 3],
              ['npc_id' => 2, 'material_id' => 1],
              ['npc_id' => 2, 'material_id' => 2],
              ['npc_id' => 2, 'material_id' => 3],
              ['npc_id' => 3, 'material_id' => 1],
              ['npc_id' => 3, 'material_id' => 2],
              ['npc_id' => 3, 'material_id' => 3],
          ]);
    }
}
