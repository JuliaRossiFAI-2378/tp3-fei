<?php

namespace Database\Seeders;

use App\Models\Equipment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equipment::create([
            'name' => 'basic sword',
            'type_id' => 1,
            'base' => 3, //foranea
            'addon' => 4, //foranea
        ]);

        Equipment::create([
            'name' => 'basic shield',
            'type_id' => 2,
            'base' => 8, //foranea
            'addon' => 7, //foranea
        ]);

        Equipment::create([
            'name' => 'basic helm',
            'type_id' => 3,
            'base' => 1, //foranea
            'addon' => 2, //foranea
        ]);

        Equipment::create([
            'name' => 'basic boots',
            'type_id' => 4,
            'base' => 5, //foranea
            'addon' => 6, //foranea
        ]);

        /////////////////////////////////////////////

        Equipment::create([
            'name' => 'basic sword',
            'type_id' => 1,
            'base' => 11, //foranea
            'addon' => 4, //foranea
        ]);

        Equipment::create([
            'name' => 'basic shield',
            'type_id' => 2,
            'base' => 16, //foranea
            'addon' => 7, //foranea
        ]);

        Equipment::create([
            'name' => 'basic helm',
            'type_id' => 3,
            'base' => 9, //foranea
            'addon' => 2, //foranea
        ]);

        Equipment::create([
            'name' => 'basic boots',
            'type_id' => 4,
            'base' => 13, //foranea
            'addon' => 6, //foranea
        ]);

        Equipment::create([
            'name' => 'basic sword',
            'type_id' => 1,
            'base' => 3, //foranea
            'addon' => 12, //foranea
        ]);

        Equipment::create([
            'name' => 'basic shield',
            'type_id' => 2,
            'base' => 8, //foranea
            'addon' => 15, //foranea
        ]);

        Equipment::create([
            'name' => 'basic helm',
            'type_id' => 3,
            'base' => 1, //foranea
            'addon' => 10, //foranea
        ]);

        Equipment::create([
            'name' => 'basic boots',
            'type_id' => 4,
            'base' => 5, //foranea
            'addon' => 14, //foranea
        ]);

    }
}
