<?php
namespace App\Services;

use App\Enums\AuthProviderEnum;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SocialLoginService
{
  public function getUserFromProvider(
    array $dataFromProvider,
    AuthProviderEnum $provider
  ) {
    $user = User::where("email", $dataFromProvider["email"])->first();

    if ($user && $user->provider_name !== $provider) {
      $message = is_null($user->provider_name)
        ? "This account is not linked to a {$provider->getLabel()} login. Please use the regular sign-in method."
        : "This account was created using {$user->provider_name->getLabel()}. Please sign in with your {$user->provider_name->getLabel()} account.";

      return ["ok" => false, "error" => $message];
    }

    if (!$user) {
      $user = User::create([
        "name" => $dataFromProvider["name"],
        "email" => $dataFromProvider["email"],
        "password" => Hash::make(Str::random(16)),
      ]);

      event(new Registered($user));
    }

    $user->update([
      "provider_id" => $dataFromProvider["id"],
      "provider_name" => $provider,
      "provider_token" => $dataFromProvider["token"] ?? null,
      "provider_refresh_token" => $dataFromProvider["refresh_token"] ?? null,
    ]);

    return ["ok" => true, "user" => $user];
  }
}
