<?php

namespace App\Http\Middleware;

use App\Models\City;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

class UserCityRedirect
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $server = explode('.', $request->server('HTTP_HOST'));
        $subdomain = $server[0];
        $cities = City::all();
        $availableDomains = $cities->pluck('domain', 'id')->toArray();
        $availableStates = $cities->pluck('state', 'id')->toArray();
        $geoInfo = geoip($request->ip());
        if (count($request->segments()) > 0) {
            return $next($request);
        }

        if (in_array($subdomain, $availableDomains)) { // if has domain continue
            return $next($request);
        }

        if ($geoInfo->country !== 'United States') { // if user not from us continue
            return $next($request);
        }

        $currentState = strtoupper($geoInfo->state);

        if (in_array($currentState, $availableStates)) {
            $indexState = array_search($currentState, $availableStates);
            $subdomain = $availableDomains[$indexState];
            $DOMAIN = env('APP_DOMAIN');

            return redirect()->away("https://{$subdomain}.${DOMAIN}", 302);
        }


        return $next($request);
    }
}
