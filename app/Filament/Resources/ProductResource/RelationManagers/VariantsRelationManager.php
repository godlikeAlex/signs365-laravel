<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class VariantsRelationManager extends RelationManager
{
  protected static string $relationship = "variants";

  protected static ?string $recordTitleAttribute = "label";

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\TextInput::make("label")
        ->required()
        ->columnSpanFull()
        ->maxLength(255),
      Forms\Components\Repeater::make("prices")
        ->relationship()
        ->schema([
          Forms\Components\Select::make("city_id")
            ->label("City")
            ->options(function (
              RelationManager $livewire,
              \Closure $get
            ): array {
              $currentRepeaterItemCityID = $get("city_id");
              $selectedVariants = collect($get("../../prices"))
                ->pluck("city_id")
                ->filter(fn($id) => $id !== $currentRepeaterItemCityID);

              return $livewire->ownerRecord->cities
                ->whereNotIn("id", $selectedVariants)
                ->pluck("title", "id")
                ->toArray();
            })
            ->required(),
          Forms\Components\TextInput::make("price")
            ->prefix('$')
            ->numeric()
            ->dehydrateStateUsing(fn($state) => $state * 100)
            ->afterStateHydrated(function (TextInput $component, $state) {
              $component->state($state / 100);
            })
            ->required(),
        ])
        ->hiddenOn("create")
        ->columnSpanFull()
        // ->disableItemCreation()
        // ->disableItemDeletion()
        ->disableItemMovement(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("label"),
        Tables\Columns\TextColumn::make("prices_min_price")
          ->label("Start Price")
          ->min("prices", "price")
          ->sortable()
          ->money("usd"),
      ])
      ->filters([Tables\Filters\TrashedFilter::make()])
      ->headerActions([Tables\Actions\CreateAction::make()])
      ->actions([
        Tables\Actions\EditAction::make(),
        Tables\Actions\DeleteAction::make(),
        Tables\Actions\RestoreAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
        // ...
      ]);
  }

  protected function getTableQuery(): Builder
  {
    return parent::getTableQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }
}
