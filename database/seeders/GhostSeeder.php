<?php

namespace Database\Seeders;

use App\Models\Ghost;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GhostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ghost = Ghost::create([
            'player_id' => '3',
            'currentDay' => '1',
        ]);

        $ghost->equipments()->attach([1, 2, 3 ,4]);
        //$ghost->load(['equipments.baseItem.material', 'equipments.addonItem.material']);
        //$ghost = $ghost->fresh(['equipments.baseItem.material', 'equipments.addonItem.material']);

    }
}
