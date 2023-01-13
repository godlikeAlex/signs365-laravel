<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProduct extends EditRecord
{
  protected static string $resource = ProductResource::class;

  protected function beforeSave()
  {
    $data = $this->form->getState();
    if ($data['published']) {
      $product = $this->record;
      $cities = $product->cities->pluck('id');
      $variants = $product->variants()->withCount(['prices' => function ($query) use ($cities) {
        return $query->whereIn('city_id', $cities)->where('price', '>', 0);
      }])->get();


      foreach ($variants as $variant) {
        if ($cities->count() > $variant['prices_count']) {
          Notification::make()
            ->warning()
            ->title('Prices')
            ->body("Before publishing, you need to update the price of the {$variant->label}")
            ->send();
          $this->halt();
        }
      }

    }


    return $data;
  }
//    protected function getActions(): array
//    {
//        $usedCitiesIDS = $this->record->prices->pluck('city_id')->toArray();
//
//        $citiesForPrice = $this->record->cities->pluck('title', 'id')
//            ->reject(function ($_, $id) use ($usedCitiesIDS) {
//                return in_array($id, $usedCitiesIDS);
//            });
//
//        return [
//            Actions\DeleteAction::make(),
//            Actions\Action::make('addPrices')
//                ->form([
//                    TextInput::make('label')->required(),
//                    Select::make('city_id')
//                        ->options($citiesForPrice->toArray())
//                        ->required(),
//                    TextInput::make('price')->required(),
//                ])
//                ->action(function (array $data) {
//                    $this->record->prices()->create($data);
//                })
//        ];
//    }
}
