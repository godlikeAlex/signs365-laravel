<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PricesRelationManager extends RelationManager
{
  protected static string $relationship = 'prices';

  protected static ?string $recordTitleAttribute = 'label';

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('label')->required(),
        Forms\Components\Select::make('city_id')
          ->label('City')
          ->options(function (RelationManager $livewire): array {
            return $livewire->ownerRecord->cities->pluck('title', 'id')
              ->toArray();
          })
          ->required(),
        Forms\Components\TextInput::make('price')
          ->prefix('$')
          ->numeric()
          ->required(),
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('label'),
        Tables\Columns\TextColumn::make('city.title')->label('City'),
        Tables\Columns\TextColumn::make('price')->money('usd'),
      ])
      ->filters([
        //
      ])
      ->headerActions([
        Tables\Actions\CreateAction::make()
          ->mutateFormDataUsing(function ($data) {
            $data['price'] = $data['price'] * 100;

            return $data;
          }),
      ])
      ->actions([
        Tables\Actions\EditAction::make()
          ->mutateFormDataUsing(function (array $data): array {
            $data['price'] = $data['price'] * 100;

            return $data;
          })
          ->mutateRecordDataUsing(function (array $data): array {
            $data['price'] = $data['price'] / 100;

            return $data;
          }),
        Tables\Actions\DeleteAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
      ]);
  }

  public static function canViewForRecord(Model $ownerRecord): bool
  {
    return $ownerRecord->with_checkout;
  }
}
