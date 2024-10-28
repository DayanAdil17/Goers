<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AddRestaurantController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/homes', function () {
    return view('layouts.app');
});

Route::get('/', function () {
    return view('layouts.apps');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/login', [App\Http\Controllers\AuthController::Class,'login']);

Route::get('/', [App\Http\Controllers\AuthController::Class,'dashboard']);

Route::get('/add-restaurant', [App\Http\Controllers\AddRestaurantController::Class,'add_restaurant']);

Route::post('/add-restaurant-data', [App\Http\Controllers\AddRestaurantController::Class,'store']);

Route::get('/register', [App\Http\Controllers\AuthController::Class,'register']);

Route::post('/registration', [App\Http\Controllers\AuthController::Class,'registration']);

Route::post('/login_check', [App\Http\Controllers\AuthController::Class, 'loginValidation']);

Route::get('/restaurants', [DashboardController::class, 'filterRestaurants']);