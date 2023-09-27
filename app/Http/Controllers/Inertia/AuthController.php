<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Services\AuthService;
use Auth;
use Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $request->validate([
      "name" => "required|string|max:255",
      "email" => "required|string|email|max:255|unique:" . User::class,
      "password" => ["required"],
    ]);

    $user = User::create([
      "name" => $request->input("name"),
      "email" => $request->input("email"),
      "password" => Hash::make($request->input("password")),
    ]);

    event(new Registered($user));

    Auth::login($user);

    $request->session()->regenerate();

    return redirect("/profile");
  }

  public function login(LoginRequest $request)
  {
    $data = $request->validated();

    if (!Auth::attempt($data)) {
      return back()->withErrors(["error" => "User not found."]);
    }

    /**
     * @var User $user
     */
    $user = $request->user();

    $request->session()->regenerate();

    return redirect("/profile");
  }

  public function logout(Request $request)
  {
    Auth::logout();

    // $request->session()->invalidate();
    // $request->session()->regenerateToken();

    return redirect("/login");
  }

  public function indexLogin(Request $request)
  {
    if ($request->user()) {
      return redirect("profile");
    }

    return Inertia::render("Login");
  }

  public function indexRegister(Request $request)
  {
    if ($request->user()) {
      return redirect("profile");
    }

    return Inertia::render("Register");
  }
}
