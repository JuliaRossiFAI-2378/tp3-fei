<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Item::create([
            'name' => 'casco',
            'material_id' => 1,
            'image' => 'helm.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 1,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'shoulder',
            'material_id' => 1,
            'image' => 'shoulders.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 2,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'blade',
            'material_id' => 1,
            'image' => 'blade.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 3,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'hilt',
            'material_id' => 1,
            'image' => 'hilt.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 4,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'pants',
            'material_id' => 1,
            'image' => 'shins.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 5,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'boots',
            'material_id' => 1,
            'image' => 'feet.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 6,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'outer shield',
            'material_id' => 1,
            'image' => 'rim.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 7,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'inner shield',
            'material_id' => 1,
            'image' => 'inner.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 8,
            'trigger_id' => 1
        ]);

        /////////////////////////////////////


        Item::create([
            'name' => 'casco',
            'material_id' => 2,
            'image' => 'helmRed.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 1,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'shoulder',
            'material_id' => 2,
            'image' => 'shouldersRed.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 2,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'blade',
            'material_id' => 2,
            'image' => 'bladeRed.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 3,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'hilt',
            'material_id' => 2,
            'image' => 'hiltRed.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 4,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'pants',
            'material_id' => 2,
            'image' => 'shinsRed.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 5,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'boots',
            'material_id' => 2,
            'image' => 'feetRed.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 6,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'outer shield',
            'material_id' => 2,
            'image' => 'rimRed.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 7,
            'trigger_id' => 1
        ]);
        Item::create([
            'name' => 'inner shield',
            'material_id' => 2,
            'image' => 'innerRed.png',
            'effect_id' => 1,
            'effectValue' => 1,
            'zone_id' => 8,
            'trigger_id' => 1
        ]);

    }
}
