<?php

namespace App\Providers;

use Filament\Facades\Filament;
use Filament\Forms\Components\DateTimePicker;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\ServiceProvider;
use Stevebauman\Location\Facades\Location;

use Request;

class FilamentServiceProvider extends ServiceProvider
{
  /**
   * Register services.
   *
   * @return void
   */
  public function register()
  {
    //
  }

  /**
   * Bootstrap services.
   *
   * @return void
   */
  public function boot()
  {
    // $tz = "America/New_York";
    // $tz = "Asia/Tashkent";

    // if (Request::is("admin-dashboard/*")) {
    //   if ($position = Location::get()) {
    //     $tz = $position->timezone;
    //   }
    // }

    // DateTimePicker::configureUsing(
    //   fn(DateTimePicker $component) => $component->timezone($tz)
    // );
    // TextColumn::configureUsing(
    //   fn(TextColumn $column) => $column->timezone($tz)
    // );

    // Filament::serving(function () {
    //   Filament::registerTheme(mix("css/filament.css"));
    // });
    // Filament::registerViteTheme("resources/css/filament.css");

    Filament::registerStyles([asset("css/my-styles-filament.css")]);
  }
}
