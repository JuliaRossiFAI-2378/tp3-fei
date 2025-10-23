<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Game;
class UserController extends Controller
{
    public function getProfile(){
        $userId = Auth::user()->id;
        $games = Game::where('player_id', $userId)->get();
        $user = User::findOrFail($userId);
        $games->load('npc');
        return Inertia::render('profile', ['user'=>$user, 'games'=>$games]);
    }
}
