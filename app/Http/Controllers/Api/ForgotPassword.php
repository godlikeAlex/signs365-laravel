<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetRequest;
use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ForgotPassword extends Controller
{
    public function forgot(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $email = $request->input('email');

        if (User::where('email', $email)->doesntExist()) {
            return response([
                'message' => 'User doen\'t exists!'
            ], 404);
        }

        try {
            $token = Str::random(10);

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            $appUrl = env('APP_URL');

            Mail::to($email)
                ->later(
                    now(),
                    new ResetPassword("{$appUrl}/auth/reset-password/{$token}")
                );

            return response([
                'message' => 'success'
            ]);
        } catch (\Exception $error) {
            return response(['message' => $error->getMessage()], 400);
        }
    }

    public function reset(ResetRequest $request)
    {
        $token = $request->input('token');

        if (!$passwordResets = DB::table('password_resets')->where('token', $token)->first()) {
            return response([
                'message' => 'Invalid token!'
            ], 400);
        }

        if (!$user = User::where('email', $passwordResets->email)->first()) {
            return response()->json([
                'message' => 'User doesn\'t exists'
            ], 404);
        }

        $user->password = Hash::make($request->input('password'));
        $user->save();
        DB::table('password_resets')->where('token', $token)->delete();

        return response()
            ->json(['message' => 'success']);
    }
}
