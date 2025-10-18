<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    // Lấy danh sách user
    public function index()
    {
        $users = User::select('id', 'name', 'email')->get();
        return response()->json($users);
    }

    // Lấy chi tiết 1 user
    public function show($id)
    {
        $user = User::select('id', 'name', 'email')->find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $user->update($request->only(['name', 'email']));

        return response()->json($user);
    }

}
