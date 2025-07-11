<?php

namespace App\Http\Middleware;

use App\Models\City;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class HandleCityFromRequest
{
  /**
   * Handle an incoming request.
   *
   * @param Request $request
   * @param Closure(Request): (Response|RedirectResponse) $next
   * @return Response|RedirectResponse
   */
  public function handle(Request $request, Closure $next)
  {
    $referer = $request->headers->get("Referer");

    $referer = Str::replaceFirst("https://", "", $referer);
    $referer = Str::replaceFirst("http://", "", $referer);

    if ($request->has("city")) {
      $request->attributes->add([
        "city" => $request->input("city"),
      ]);
      return $next($request);
    } elseif ($referer) {
      $server = explode(".", $referer);
      $subdomain = $server[0];

      $city = City::where("domain", $subdomain)->first();

      if ($city) {
        $request->attributes->add([
          "city" => $city->id,
        ]);
      } else {
        $request->attributes->add([
          "city" => City::first()->id,
        ]);
      }
    } else {
      abort(422, "City is required!");
    }

    return $next($request);
  }
}
