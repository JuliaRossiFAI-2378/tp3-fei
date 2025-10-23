<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(RoleSeeder::class);
        $this->call(TypeSeeder::class);
        $this->call(EffectSeeder::class);
        $this->call(MaterialSeeder::class);
        $this->call(ZoneSeeder::class);
        $this->call(TriggerSeeder::class);
        $this->call(ItemSeeder::class);
        $this->call(EquipmentSeeder::class);
        $this->call(EffectTriggerSeeder::class);
        $this->call(NPCSeeder::class);
        $this->call(MaterialNpcSeeder::class);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'b@b.b',
            'password' => 'bbbbbbbb',
        ]);

        User::create([
            'name' => 'aaaa',
            'email' => 'a@a.a',
            'password' => 'aaaaaaaa',
            'role_id' => '1'
        ]);

        User::create([
            'name' => 'jorgito the ghost',
            'email' => '3@3.3',
            'password' => 'aaaaaaaa',
        ]);

        $this->call(SceneSeeder::class);
        $this->call(GhostSeeder::class);
        $this->call(GameSeeder::class);
    }
}
