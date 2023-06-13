<?php

namespace App\Filament\Resources\ProductCategoryResource\RelationManagers;

use App\Filament\Resources\ProductResource;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Actions\AttachAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductsRelationManager extends RelationManager
{
  protected static string $relationship = "products";

  protected static ?string $recordTitleAttribute = "title";

  public static function form(Form $form): Form
  {
    return $form->schema(ProductResource::productForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([Tables\Columns\TextColumn::make("title")])
      ->filters([
        //
      ])
      ->headerActions([
        Tables\Actions\AttachAction::make()->preloadRecordSelect(),
        Tables\Actions\CreateAction::make()->url(
          ProductResource::getUrl("create"),
          true
        ),
      ])
      ->actions([
        Tables\Actions\EditAction::make(),
        Tables\Actions\DetachAction::make(),
        Tables\Actions\DeleteAction::make(),
      ])
      ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
  }
}
