<?php

namespace App\Http\Controllers;

use App\Enums\AuthProviderEnum;
use Google_Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Services\SocialLoginService;

class AuthSocialiteController extends Controller
{
  public function redirect(AuthProviderEnum $provider)
  {
    return Socialite::driver($provider->value)->redirect();
  }

  public function callback(
    Request $request,
    SocialLoginService $socialLoginService,
    AuthProviderEnum $provider
  ) {
    $socialiteUser = Socialite::driver($provider->value)->user();

    $result = $socialLoginService->getUserFromProvider(
      [
        "id" => $socialiteUser->getId(),
        "name" => $socialiteUser->getName(),
        "email" => $socialiteUser->getEmail(),
        "token" => $socialiteUser->token,
        "refresh_token" => $socialiteUser->refreshToken,
      ],
      $provider
    );

    if ($result["ok"] === false) {
      return redirect("login")->withErrors(["authRoot" => $result["error"]]);
    }

    Auth::login($result["user"]);

    $request->session()->regenerate();

    return redirect("/profile");
  }

  public function oneTapLogin(
    Request $request,
    SocialLoginService $socialLoginService
  ) {
    $credential = $request->input("credential");

    $client = new Google_Client(["client_id" => env("GOOGLE_AUTH_CLIENT_ID")]);

    $payload = $client->verifyIdToken($credential);

    if (!$payload) {
      return back();
    }

    $result = $socialLoginService->getUserFromProvider(
      [
        "id" => $payload["sub"],
        "name" => $payload["name"],
        "email" => $payload["email"],
      ],
      AuthProviderEnum::GOOGLE
    );

    if ($result["ok"] === false) {
      return redirect("login")->withErrors(["authRoot" => $result["error"]]);
    }

    Auth::login($result["user"]);

    $request->session()->regenerate();

    return redirect()->back();
  }
}
