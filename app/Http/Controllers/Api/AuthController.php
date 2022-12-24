<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     */
    public function register(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required'],
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->json([
            'token' => $user->createToken('api')->plainTextToken,
            'user' => $user
        ]);
    }

    /**
     * Display the password reset view.
    */
    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
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

        return response()->json([
            'token' => $user->createToken('api')->plainTextToken,
            'user' => $user
        ]);
    }
}
