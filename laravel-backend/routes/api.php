<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth routes (không cần đăng nhập)
Route::prefix('user')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

// Password routes
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);

// Routes cần đăng nhập
// apiResource: tự động tạo đủ 5 route (index, show, store, update, destroy)
Route::middleware('auth:sanctum')->group(function () {
    // Task routes
    Route::apiResource('tasks', TaskController::class);

    // User routes
    Route::apiResource('users', UsersController::class);

    // Upload avatar
    Route::post('user/avatar', [AuthController::class, 'uploadAvatar']);
});