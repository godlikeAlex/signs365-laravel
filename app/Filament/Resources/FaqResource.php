<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages;
use App\Filament\Resources\FaqResource\RelationManagers;
use App\Filament\Resources\FaqResource\RelationManagers\ProductsRelationManager;
use App\Models\Faq;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FaqResource extends Resource
{
  protected static ?string $model = Faq::class;

  protected static ?string $navigationIcon = "heroicon-o-collection";

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\TextInput::make("title")
        ->required()
        ->columnSpanFull()
        ->maxLength(255),

      // Forms\Components\Select::make("products")
      //   ->relationship("products", "title")
      //   ->multiple()
      //   ->preload(),

      Forms\Components\Repeater::make("content")
        ->columnSpanFull()
        ->schema([
          Forms\Components\TextInput::make("question"),
          Forms\Components\RichEditor::make("answer")->toolbarButtons([
            "h2",
            "h3",
            "bulletList",
            "orderedList",
            "bold",
            "italic",
            "link",
            "strike",
            "undo",
            "redo",
          ]),
        ])
        ->createItemButtonLabel("Add new question")
        ->label("FAQ")
        ->required(),
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
    return [ProductsRelationManager::class];
  }

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListFaqs::route("/"),
      "create" => Pages\CreateFaq::route("/create"),
      "edit" => Pages\EditFaq::route("/{record}/edit"),
    ];
  }
}
