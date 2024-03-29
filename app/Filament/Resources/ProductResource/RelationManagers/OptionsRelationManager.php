<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use App\Filament\Resources\ProductOptionResource;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OptionsRelationManager extends RelationManager
{
  protected static string $relationship = "options";

  protected static ?string $recordTitleAttribute = "title";

  public static function form(Form $form): Form
  {
    return $form->schema(ProductOptionResource::inputForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("title"),
        Tables\Columns\TextColumn::make("price")->money(),
      ])
      ->filters([Tables\Filters\TrashedFilter::make()])
      ->headerActions([
        Tables\Actions\CreateAction::make(),
        Tables\Actions\AttachAction::make(),
      ])
      ->actions([
        Tables\Actions\EditAction::make(),
        Tables\Actions\DetachAction::make(),
        Tables\Actions\DeleteAction::make(),
        // Tables\Actions\ForceDeleteAction::make(),
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
