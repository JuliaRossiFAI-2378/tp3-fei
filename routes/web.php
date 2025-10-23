<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

//aca van las rutas para usuarios logeados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [GameController::class, 'playGame'])->name('dashboard');
    Route::post('dashboard', [GameController::class, 'viewGame'])->name('dashboard/post');
    Route::patch('dashboard', [GameController::class, 'viewGame'])->name('dashboard/post');
    Route::get('profile', [UserController::class, 'getProfile'])->name('profile');
    Route::get('/getitem', [ItemController::class, 'getItemByMaterial']);

    Route::post('/roles', [GameController::class, 'store']);

});

//aca van las rutas para admins
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('admin', function () {return Inertia::render('adminboard');})->name('adminboard');
});



/*

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

*/

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
