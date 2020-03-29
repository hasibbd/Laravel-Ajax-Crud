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

Route::get('/', 'ContactController@getIndex');
Route::get('read/', 'ContactController@getData');
Route::post('/add', 'ContactController@Store');
Route::post('delete/{contact_id}', 'ContactController@Delete');
Route::post('get4update/{contact_id}', 'ContactController@Get4Update');
Route::put('update/{contact_id}', 'ContactController@Update');

