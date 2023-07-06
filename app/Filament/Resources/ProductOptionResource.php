<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductOptionResource\Pages;
use App\Filament\Resources\ProductOptionResource\RelationManagers;
use App\Models\ProductOption;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductOptionResource extends Resource
{
  protected static ?string $model = ProductOption::class;

  protected static ?string $navigationIcon = "heroicon-o-color-swatch";
  protected static ?string $navigationGroup = "SHOP";
  protected static ?int $navigationSort = 4;

  static function inputForm(): array
  {
    return [
      Forms\Components\TextInput::make("title")
        ->required()
        ->maxLength(255),
      Forms\Components\TextInput::make("price")
        ->prefix('$')
        ->numeric()
        ->dehydrateStateUsing(fn($state) => $state * 100)
        ->afterStateHydrated(function (TextInput $component, $state) {
          $component->state($state / 100);
        })
        ->required(),
      Forms\Components\Select::make("type")
        ->required()
        ->reactive()
        ->options(ProductOption::$TYPES_FOR_OPTIONS),
    ];
  }

  public static function form(Form $form): Form
  {
    return $form->schema(self::inputForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("title"),
        Tables\Columns\TextColumn::make("price")->money(),
        Tables\Columns\TextColumn::make("type"),
      ])
      ->filters([Tables\Filters\TrashedFilter::make()])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        Tables\Actions\ForceDeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
      ]);
  }

  public static function getRelations(): array
  {
    return [
        //
      ];
  }

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListProductOptions::route("/"),
      "create" => Pages\CreateProductOption::route("/create"),
      "edit" => Pages\EditProductOption::route("/{record}/edit"),
    ];
  }

  public static function getEloquentQuery(): Builder
  {
    return parent::getEloquentQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }
}
