<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductCategoryResource\Pages;
use App\Filament\Resources\ProductCategoryResource\RelationManagers;
use App\Filament\Resources\ProductCategoryResource\RelationManagers\CitiesRelationManager;
use App\Models\ProductCategory;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductCategoryResource extends Resource
{
  protected static ?string $model = ProductCategory::class;

  protected static ?string $navigationIcon = 'heroicon-o-tag';
  protected static ?string $navigationGroup = 'SHOP';
  protected static ?string $navigationLabel = 'Categories';


  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\TextInput::make('title')
          ->required()
          ->maxLength(255),
        Forms\Components\TextInput::make('slug')
          ->required()
          ->maxLength(255),
        Select::make('cities')
          ->label('Cities available this category')
          ->multiple()
          ->relationship('cities', 'title')
          ->preload()
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('id'),
        Tables\Columns\TextColumn::make('title'),
        Tables\Columns\TextColumn::make('slug'),
      ])
      ->filters([
        //
      ])
      ->actions([
        Tables\Actions\EditAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
      ]);
  }


  public static function getPages(): array
  {
    return [
      'index' => Pages\ListProductCategories::route('/'),
      'create' => Pages\CreateProductCategory::route('/create'),
      'edit' => Pages\EditProductCategory::route('/{record}/edit'),
    ];
  }
}
