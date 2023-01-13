<?php

namespace App\Http\Middleware;

use Closure;
use Cookie;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetSanctumTokenFromCookies
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
    $response = $next($request);

    $response->header('X-App-Message', 'Hello world');


    if (Cookie::has('token')) {
      $token = Cookie::get('token');

      $response->headers->set('Authorization', "Bearer 59|Y6Z9PFl5Lkxm0bDH6t9mu6I5i1Hk30uRbdlHFhNM");
    }

    // return $request->headers;

    return $response;
  }
}
