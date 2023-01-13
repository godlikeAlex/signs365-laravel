<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\EditProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use ImageOptimizer;

class UserController extends Controller
{
  public function edit(EditProfileRequest $request)
  {
    $user = $request->user();

    $user->update($request->only(['name', 'email']));

    if ($request->has('avatar')) {
      $path = $request->file('avatar')->store('users', 'public');

      $user->update(['avatar' => $path]);
    }


    return $user;
  }

  public function changePassword(ChangePasswordRequest $request)
  {
    $user = $request->user();

    if (Hash::check($request->input('oldPassword'), $user->password)) {
      $user->update([
        'password' => Hash::make($request->input('newPassword'))
      ]);
      return response(['ok' => true]);
    } else {

      return response([
        'error' => 'The current password is incorrect.'
      ], 400);
    }
  }
}
