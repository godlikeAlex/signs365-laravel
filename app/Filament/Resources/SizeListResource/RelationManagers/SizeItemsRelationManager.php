<?php

namespace App\Filament\Resources\SizeListResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SizeItemsRelationManager extends RelationManager
{
  protected static string $relationship = "sizeItems";

  protected static ?string $recordTitleAttribute = "label";

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\TextInput::make("width")
        ->numeric()
        ->reactive()
        ->afterStateUpdated(function (\Closure $set, \Closure $get, $state) {
          $height = $get("height") ?? 0;

          $set("label", $state . '" x "' . $height . '"');
        })
        ->required()
        ->mask(
          fn(TextInput\Mask $mask) => $mask->numeric()->minValue(1) // Set the minimum value that the number can be.
        ),
      Forms\Components\TextInput::make("height")
        ->numeric()
        ->required()
        ->reactive()
        ->afterStateUpdated(function (\Closure $set, \Closure $get, $state) {
          $width = $get("width") ?? 0;

          $set("label", $width . '" x ' . $state . '"');
        })
        ->mask(
          fn(TextInput\Mask $mask) => $mask->numeric()->minValue(1) // Set the minimum value that the number can be.
        ),
      Forms\Components\TextInput::make("label")
        ->reactive()
        ->required(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("label"),
        Tables\Columns\TextColumn::make("width"),
        Tables\Columns\TextColumn::make("height"),
      ])
      ->filters([Tables\Filters\TrashedFilter::make()])
      ->headerActions([Tables\Actions\CreateAction::make()])
      ->actions([
        Tables\Actions\EditAction::make(),
        Tables\Actions\DeleteAction::make(),
        Tables\Actions\ForceDeleteAction::make(),
        Tables\Actions\RestoreAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
        Tables\Actions\ForceDeleteBulkAction::make(),
      ]);
  }

  protected function getTableQuery(): Builder
  {
    return parent::getTableQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }
}
