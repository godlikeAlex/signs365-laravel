<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use App\Filament\Resources\EstimateFormResource;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EstimateFormsRelationManager extends RelationManager
{
  protected static string $relationship = "estimateForms";

  protected static ?string $recordTitleAttribute = "title";

  protected static ?string $title = "Estimate Forms";

  public static function form(Form $form): Form
  {
    return $form->schema(EstimateFormResource::inputForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("title")->searchable(),
        Tables\Columns\TextColumn::make("type"),
        Tables\Columns\IconColumn::make("is_active")->boolean(),
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
      ]);
  }

  protected function getTableQuery(): Builder
  {
    return parent::getTableQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }
}
