<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Game;
use App\Models\Ghost;
use App\Models\Npc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class GameController extends Controller
{
    public function viewGame(Request $request)
    {
        //request->only my beloved <3
        $data = $request->only(["isLive","currentDay", "currentHp", "ghost", "currentScene", "currentEnemy", "gameOver"]);

        
        if(!empty($data)){
            if(($data["currentScene"] ?? null) === 5){//super cochino y hardcodeado hay que cambiarlo lo se
                //buscamos un ghost
                $ghost = $this->getGhost($data["currentDay"]);
                unset($data["ghost"]);
                $data["ghost_id"] = $ghost->id;
            }else if(($data["currentScene"] ?? null) === 4){
                //???
            }
            if(($data["gameOver"] ?? false) == true){
                Log::info("entramos en gameOver", $data);
                $data = ['isLive' => 0];
                Log::info("reescribimos data:", $data);
                $this->updateGame($data);
                Log::info("actualizamos", $data);
                return redirect()->route('dashboard');
                //por alguna razon aca esta haciendo update, pero solo si se recargo la pagina durante el combate
            }
            $this->updateGame($data);
        }
        return $this->playGame();
    }

    public function getLiveGame($idUser){
        $game = Game::where('player_id', $idUser)->where('isLive', true)->first();
        return $game; //objeto game o null
    }

    public function setEnemy($enemyId){
        $idUser = Auth::user()->id;
        $game = $this->getLiveGame($idUser);
        $game->currentEnemy = $enemyId;
        $game->save();
        return $game;
    }
    
    public function updateGame($data){//re poderosa esta funcion holy shit
        $idUser = Auth::user()->id;
        $game = $this->getLiveGame($idUser);
        $game->update($data);//aca faltan un monton de condicionales en caso de q algo salga mal
    }

    public function getGhost($currentDay){
        $ghost = Ghost::where('currentDay', $currentDay)->where('player_id', '!=', Auth::user()->id)->inRandomOrder()->first();
        return $ghost;
    }

    public function getNpcs($currentDay){
        $enemyList = Npc::where('day', $currentDay)->inRandomOrder()->take(3)->get();
        return $enemyList;
    }

    public function loadGame($game){
        ///eeeeee falta un monton aca suerte
        $id = $game->id;
        $game = Game::with( //esto se llama eager loading, no usa nombres de tablas, usa nombres de relaciones
        ['equipments.type', 'equipments.baseItem.material',
        'equipments.addonItem.material']
        )->find($id);//el with aca, es como la funcion load, tendria que ver si se pueden usar multiples, o si es mas claro separarlo en varias lineas
        $game->load('equipments.type');
        $game->load('npc');
        $game->load('ghost.equipments.baseItem.material', 'ghost.equipments.addonItem.material', 'ghost.user' );
        //if enemy null, 
        return $game;
    }

    public function newGame($idUser){//por convencion se llama STORE
        $game = Game::create([
            'player_id' => $idUser,
            'islive' => true,
            'currentDay' => 1,
            'currentHp' => 20,
            'currentScene' => 4,
        ]);

        $game->equipments()->attach([1, 2, 3 ,4]);//encajamos los equipment con esos id adentro del obj game en un array
        $game->load(['equipments.type', 'equipments.baseItem.material', 'equipments.addonItem.material', 'equipments.type']);
        $game->load('npc');//esto es super importante, esto es lo que le da la funcionalidad al obj game, es comoo meter la tabla npc adentro del objeto game
        $game->load('ghost.equipments.baseItem.material', 'ghost.equipments.addonItem.material', 'ghost.user' );
        $game->load('equipments.type');
        return $game;
    }


    //carga o crea una partida
    public function playGame(): Response{
        $idUser = Auth::user()->id;
        $game = $this->getLiveGame($idUser);
        $enemyList = null;
        if($game){
            $gameData = $this->loadGame($game);
            if(!$gameData){$gameData = null;}//porsiacaso
            if($gameData->currentScene == 4){
                $enemyList = $this->getNpcs($gameData->currentDay);
            }
        }else{
            $gameData = $this->newGame($idUser);
            if(!$gameData){$gameData = null;}//porsiacaso
            $enemyList = $this->getNpcs(1);
        }
        return Inertia::render('dashboard', ['game' => $gameData->toArray(), 'enemyList' => $enemyList]);
    }
}
