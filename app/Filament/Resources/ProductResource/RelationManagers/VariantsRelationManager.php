<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class VariantsRelationManager extends RelationManager
{
  protected static string $relationship = 'variants';

  protected static ?string $recordTitleAttribute = 'label';

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('label')
          ->required()
          ->columnSpanFull()
          ->maxLength(255),
        Forms\Components\Repeater::make('prices')
          ->relationship()
          ->schema([
            Forms\Components\Select::make('city_id')
              ->label('City')
              ->disabled()
              ->options(function (RelationManager $livewire): array {
                return $livewire->ownerRecord->cities->pluck('title', 'id')
                  ->toArray();
              })
              ->required(),
            Forms\Components\TextInput::make('price')
              ->prefix('$')
              ->numeric()
              ->required(),
          ])
          ->hiddenOn('create')
          ->columnSpanFull()
          ->disableItemCreation()
          ->disableItemDeletion()
          ->disableItemMovement()
          ->mutateRelationshipDataBeforeFillUsing(function ($data) {
            $data['price'] = $data['price'] / 100;

            return $data;
          })
          ->mutateRelationshipDataBeforeSaveUsing(function ($data) {
            $data['price'] = $data['price'] * 100;

            return $data;
          })
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('label'),
        Tables\Columns\TextColumn::make('prices_min_price')
          ->label('Start Price')
          ->min('prices', 'price')
          ->sortable()
          ->money('usd'),
      ])
      ->filters([
        //
      ])
      ->headerActions([
        Tables\Actions\CreateAction::make()
      ])
      ->actions([
        Tables\Actions\EditAction::make(),
        Tables\Actions\DeleteAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
      ]);
  }
}
