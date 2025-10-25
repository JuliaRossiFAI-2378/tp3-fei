<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SoapController;
use App\Http\Controllers\RestWrapperController;

Route::middleware('api')->group(function () {

    Route::get('/soap/wsdl', [SoapController::class, 'wsdl']);
    Route::match(['GET','POST'], '/soap/service', [SoapController::class, 'service']);
    //Route::get('/soap/test', [SoapController::class, 'test']);
    //Route::get('/{entity}/{id}', [RestWrapperController::class, 'getById']);
    Route::get('/ghosts/{id}', function ($id) {
        $controller = app(RestWrapperController::class);
        return $controller->getById('ghosts', $id);
    });
    Route::get('/materials/{id}', function ($id) {
        $controller = app(RestWrapperController::class);
        return $controller->getById('materials', $id);
    });
        Route::get('/items/{id}', function ($id) {
        $controller = app(RestWrapperController::class);
        return $controller->getById('items', $id);
    });
        Route::get('/npcs/{id}', function ($id) {
        $controller = app(RestWrapperController::class);
        return $controller->getById('npcs', $id);
    });

    
});


