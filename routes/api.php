<?php

use App\Http\Controllers\API\LevelController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('level/index', [LevelController::class, 'index']);
Route::post('level/store', [LevelController::class, 'store']);
Route::put('level/{id}/update', [LevelController::class, 'update']);
Route::delete('level/{id}/destroy', [LevelController::class, 'destroy']);

Route::apiResources(['apiUsers' => UserController::class]);
