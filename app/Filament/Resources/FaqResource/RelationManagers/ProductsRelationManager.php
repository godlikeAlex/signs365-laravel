<?php

namespace App\Filament\Resources\FaqResource\RelationManagers;

use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductsRelationManager extends RelationManager
{
  protected static string $relationship = "products";

  protected static ?string $recordTitleAttribute = "title";

  protected static ?string $inverseRelationship = "faq"; // Since the inverse related model is `Category`, this is normally `category`, not `section`.

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
      ->headerActions([Tables\Actions\AssociateAction::make()])
      ->actions([Tables\Actions\DissociateAction::make()])
      ->bulkActions([Tables\Actions\DissociateBulkAction::make()]);
  }
}
