<?php

namespace App\Http\Middleware;

use App\Models\City;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Session;

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
        
        $isMainPage = env('APP_URL') === url()->current();
        $currentSubDomainIsAvaliable = in_array($subdomain, $availableDomains);
        $subdomainIsNotPartOfMainDomain = explode('.', env('APP_DOMAIN'))[0] !== $subdomain;
        
        $DOMAIN = env('APP_DOMAIN');

        if (!$geoInfo->state) {
            return $next($request);
        }

        $currentState = strtoupper($geoInfo->state);
        $subDomainToRedirect = null;

        if (in_array($currentState, $availableStates)) {
            $subDomainToRedirect = $availableDomains[array_search($currentState, $availableStates)];
        } else {
            $subDomainToRedirect = null;
        }

        if ($subdomainIsNotPartOfMainDomain) {
            if (!in_array($subdomain, $availableDomains)) {
                return abort(404);
            }
        } else {
            return redirect()->away($this->generateUrl($request, $subDomainToRedirect), 302);
        }

        Session::put('city_checked', true);
        Session::save();

        return $next($request);
    }

    private function generateUrl(Request $request, $subdomain) {
        $parameters = $request->route()->parameters();
        $name = $request->route()->getName();
            
        $url = str_replace('://', '://' . $subdomain . '.', route($name,$parameters));
        return $url;
    }
}
