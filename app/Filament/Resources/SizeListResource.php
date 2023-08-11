<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SizeListResource\Pages;
use App\Filament\Resources\SizeListResource\RelationManagers;
use App\Filament\Resources\SizeListResource\RelationManagers\SizeItemsRelationManager;
use App\Models\SizeList;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SizeListResource extends Resource
{
  protected static ?string $model = SizeList::class;

  protected static ?string $navigationIcon = "heroicon-o-collection";

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\TextInput::make("title")
        ->required()
        ->maxLength(255),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([Tables\Columns\TextColumn::make("title")])
      ->filters([
        //
      ])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
  }

  public static function getRelations(): array
  {
    return [SizeItemsRelationManager::class];
  }

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListSizeLists::route("/"),
      "create" => Pages\CreateSizeList::route("/create"),
      "edit" => Pages\EditSizeList::route("/{record}/edit"),
    ];
  }
}
