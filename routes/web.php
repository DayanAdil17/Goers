<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/dashboard', [App\Http\Controllers\AuthController::Class,'dashboard']);

Route::get('/register', [App\Http\Controllers\AuthController::Class,'register']);

Route::post('/registration', [App\Http\Controllers\AuthController::Class,'registration']);