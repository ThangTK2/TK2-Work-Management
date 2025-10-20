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

Route::prefix('user')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);

// apiResource: tự động tạo đủ 5 route (index, show, store, update, destroy)
// User & Admin đều có thể xem user, xem task (chỉ GET)
Route::middleware('auth:sanctum')->group(function () {
    // Xem danh sách User / xem chi tiết User
    Route::get('/users', [UsersController::class, 'index']);
    Route::get('/users/{id}', [UsersController::class, 'show']);

    // Chỉ xem danh sách Task, xem chi tiết Task
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::get('/tasks/{id}', [TaskController::class, 'show']);

    // Upload avatar
    Route::post('user/avatar', [AuthController::class, 'uploadAvatar']);
});


// Chỉ Admin mới được tạo / sửa / xóa User & Task
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // User
    Route::post('/users', [UsersController::class, 'store']);
    Route::put('/users/{id}', [UsersController::class, 'update']);
    Route::delete('/users/{id}', [UsersController::class, 'destroy']);

    // Task
    Route::post('/tasks', [TaskController::class, 'store']);   // tạo task
    Route::put('/tasks/{id}', [TaskController::class, 'update']); // sửa task
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); // xóa task
});

