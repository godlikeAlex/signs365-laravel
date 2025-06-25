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

    $user->update($request->only(["name", "email"]));

    if ($request->has("avatar")) {
      $path = $request->file("avatar")->store("users", "public");

      $user->update(["avatar" => $path]);
    }

    if (!$request->inertia() && $request->expectsJson()) {
      return $user;
    } else {
      return back();
    }
  }

  public function changePassword(ChangePasswordRequest $request)
  {
    $user = $request->user();

    if (Hash::check($request->input("oldPassword"), $user->password)) {
      $user->update([
        "password" => Hash::make($request->input("newPassword")),
      ]);

      if (!$request->inertia() && $request->expectsJson()) {
        return response(["ok" => true]);
      } else {
        return back();
      }
    } else {
      if (!$request->inertia() && $request->expectsJson()) {
        return response(
          [
            "error" => "The current password is incorrect.",
          ],
          400
        );
      }

      return back()->withErrors(["error" => "Something Went Wrong"]);
    }
  }
}
