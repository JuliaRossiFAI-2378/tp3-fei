<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $game = Game::create([
            'player_id' => '3',
        ]);

        $game->equipments()->attach([1, 2, 3 ,4]);
        $game->load(['equipments.baseItem.material', 'equipments.addonItem.material']);
        $game = $game->fresh(['equipments.baseItem.material', 'equipments.addonItem.material']);
        $game->load('npc');
    }
}
