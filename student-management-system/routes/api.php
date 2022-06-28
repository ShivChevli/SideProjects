<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\DepartmentController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'Student'
], function ($router) {

    Route::get('', [StudentsController::class, 'index']);
    Route::post('register', [StudentsController::class, 'store']);
    Route::get('update/{id}', [StudentsController::class, 'show']);
    Route::delete('delete/{id}', [StudentsController::class, 'destroy']);
    Route::get('dasbord_data', [StudentsController::class, 'GetDisplayData']);
});

Route::apiResource("/department", DepartmentController::class);

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
    Route::post('signin', [AuthController::class,'signin']);

});