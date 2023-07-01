<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductAddonsResource\Pages;
use App\Filament\Resources\ProductAddonsResource\RelationManagers;
use App\Models\ProductAddons;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductAddonsResource extends Resource
{
  protected static ?string $model = ProductAddons::class;

  protected static ?string $navigationIcon = "heroicon-o-clipboard-list";
  protected static ?string $navigationGroup = "SHOP";
  protected static ?int $navigationSort = 5;

  static function inputForm(): array
  {
    return [
      Forms\Components\TextInput::make("title")
        ->required()
        ->maxLength(255),
      Forms\Components\TextInput::make("condition")
        ->required()
        ->maxLength(255),
      Forms\Components\Toggle::make("with_qty")
        ->required()
        ->label("This addon will be with Quantity?"),
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
        Tables\Columns\TextColumn::make("condition"),
        Tables\Columns\IconColumn::make("with_qty")
          ->label("With Quantity?")
          ->boolean(),
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
      "index" => Pages\ListProductAddons::route("/"),
      "create" => Pages\CreateProductAddons::route("/create"),
      "edit" => Pages\EditProductAddons::route("/{record}/edit"),
    ];
  }

  public static function getEloquentQuery(): Builder
  {
    return parent::getEloquentQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }
}
