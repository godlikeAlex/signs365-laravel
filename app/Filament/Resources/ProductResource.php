<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
  protected static ?string $model = Product::class;

  protected static ?string $navigationIcon = 'heroicon-o-lightning-bolt';
  protected static ?string $navigationGroup = 'SHOP';
  protected static ?string $navigationLabel = 'Products';

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Forms\Components\Tabs::make('Heading')
          ->columnSpanFull()
          ->tabs([
            Forms\Components\Tabs\Tab::make('Product Information')
              ->icon('heroicon-s-information-circle')
              ->schema([
                Forms\Components\TextInput::make('title')
                  ->required()
                  ->reactive()
                  ->afterStateUpdated(function (Closure $set, $state) {
                    $set('slug', Str::slug($state));
                  })
                  ->maxLength(50),
                Forms\Components\TextInput::make('slug')
                  ->required()
                  ->maxLength(75),
                Forms\Components\RichEditor::make('description')->columnSpan('full'),
                Forms\Components\Select::make('cities')
                  ->multiple()
                  ->required()
                  ->reactive()
                  ->afterStateUpdated(function (Closure $set) {
                    $set('published', false);
                  })
                  ->relationship('cities', 'title')
                  ->preload(),
                Forms\Components\Select::make('categories')
                  ->multiple()
                  ->required()
                  ->relationship('categories', 'title')
                  ->preload(),
                Toggle::make('with_checkout')
                  ->reactive()
                  ->hint(fn($state) => $state ? '' : 'Prices will appear at the bottom after saving the product')
                  ->default(true),
                Toggle::make('published')
                  ->columnSpanFull()
                  ->reactive()
                  ->visibleOn('edit')
                  ->default(false),
              ]),

            Forms\Components\Tabs\Tab::make('Product Images')
              ->icon('heroicon-s-camera')
              ->schema([
                Forms\Components\FileUpload::make('images')
                  ->columnSpanFull()
                  ->multiple()
                  ->enableReordering()
                  ->directory('products'),
              ])
          ])
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('title')
          ->searchable(),
        Tables\Columns\TextColumn::make('slug'),
        Tables\Columns\TextColumn::make('prices_min_price')
          ->label('Start Price')
          ->min('prices', 'price')
          ->sortable()
          ->money('usd'),
        Tables\Columns\TextColumn::make('created_at')
          ->date($format = 'F j, Y'),
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

  public static function getRelations(): array
  {
    return [
      RelationManagers\VariantsRelationManager::class
    ];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListProducts::route('/'),
      'create' => Pages\CreateProduct::route('/create'),
      'edit' => Pages\EditProduct::route('/{record}/edit'),
    ];
  }
}
