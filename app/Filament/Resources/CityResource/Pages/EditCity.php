<?php

namespace App\Filament\Resources\CityResource\Pages;

use App\Filament\Resources\CityResource;
use App\Models\City;
use Filament\Forms\Components\Select;
use Filament\Notifications\Notification;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;

class EditCity extends EditRecord
{
  protected static string $resource = CityResource::class;

  protected function getActions(): array
  {
    return [
      Actions\DeleteAction::make(),
      Actions\ForceDeleteAction::make(),
      Actions\RestoreAction::make(),
      Actions\Action::make("syncCity")
        ->action(function (array $data): void {
          $city = City::find($data["city_id"]);
          $currentCity = $this->record;

          if (!$city) {
            Notification::make()
              ->title("Whoops, something went wrong [city.notfound]")
              ->status("danger")
              ->send();
            return;
          }

          foreach ($city->productCategories as $category) {
            $currentCity
              ->productCategories()
              ->syncWithoutDetaching([$category->id]);
          }

          foreach ($city->products as $product) {
            $currentCity->products()->syncWithoutDetaching([$product->id]);

            foreach ($product->variants as $variant) {
              $priceForVaraint = $variant
                ->prices()
                ->where("city_id", $city->id)
                ->first();

              $priceExists = $variant
                ->prices()
                ->where("city_id", $currentCity->id)
                ->first();

              if ($priceForVaraint && !$priceExists) {
                $variant->prices()->create([
                  "city_id" => $currentCity->id,
                  "product_id" => $product->id,
                  "price" => $priceForVaraint->price,
                ]);
              }
            }
          }

          Notification::make()
            ->status("success")
            ->title("Success")
            ->send();
        })
        ->form([
          Select::make("city_id")
            ->label("Sync with:")
            ->options(
              fn(?Model $record) => City::query()
                ->where("id", "!=", $record->id)
                ->pluck("title", "id")
            )
            ->required(),
        ]),
    ];
  }
}
