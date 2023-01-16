<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\DomainsResource;
use App\Models\City;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Cookie;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  /**
   * Register a new user.
   *
   */
  public function register(Request $request): JsonResponse
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:' . User::class,
      'password' => ['required'],
    ]);

    $user = User::create([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
    ]);

    event(new Registered($user));

    Auth::login($user);

    $token = $user->createToken('api')->plainTextToken;

    $request->session()->regenerate();

    return response()->json([
      'token' => $token,
      'user' => $user
    ]);
  }

  /**
   * Login user into.
   */
  public function login(LoginRequest $request): JsonResponse
  {
    $data = $request->validated();

    if (!Auth::attempt($data)) {
      return response()
        ->json([
          'status' => 'error',
          'error' => 'Email or password incorrect'
        ], 400);
    }

    /**
     * @var User $user
     */
    $user = $request->user();
    $token = $user->createToken('api')->plainTextToken;

    $request->session()->regenerate();

    return response()->json([
      'token' => $token,
      'user' => $user
    ]);
  }

  public function logout(Request $request)
  {
    Auth::logout();

    // $request->session()->invalidate();
    // $request->session()->regenerateToken();

    return;
  }
}
