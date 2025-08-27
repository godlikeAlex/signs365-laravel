<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReviewResource\Pages;
use App\Filament\Resources\ReviewResource\RelationManagers;
use App\Forms\Components\Rating;
use App\Models\Review;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Repeater;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\HtmlString;

class ReviewResource extends Resource
{
  protected static ?string $model = Review::class;

  protected static ?string $navigationIcon = "heroicon-o-star";
  protected static ?string $navigationGroup = "SHOP";

  public static function form(Form $form): Form
  {
    return $form->schema([
      Rating::make("rating"),
      Forms\Components\Placeholder::make("User")->content(function ($record) {
        if ($record->user) {
          return $record->user;
        } elseif ($record->reviewer_name) {
          return $record->reviewer_name;
        } else {
          return "No User";
        }
      }),
      Forms\Components\Placeholder::make("Product")->content(
        fn($record) => $record->product ? $record->product->title : "No Product"
      ),
      Forms\Components\Textarea::make("review")->columnSpanFull(),

      Repeater::make("media")
        ->columnSpanFull()
        ->relationship()
        ->grid(2)
        ->schema([
          Forms\Components\FileUpload::make("file_path")
            ->enableOpen()
            ->enableDownload(),
        ]),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("id")
          ->label("ID")
          ->searchable(),
        Tables\Columns\TextColumn::make("product.title")
          ->searchable()
          ->label("Product")
          ->url(
            fn(Review $record) => $record->product
              ? ProductResource::getUrl("edit", [
                "record" => $record->product,
              ])
              : ""
          ),
        Tables\Columns\TextColumn::make("user.name")
          ->searchable()
          ->label("User")
          ->default("Not registered user")
          ->url(
            fn(Review $record) => $record->user
              ? UserResource::getUrl("edit", [
                "record" => $record->user,
              ])
              : ""
          ),
        Tables\Columns\TextColumn::make("rating")
          ->icon("heroicon-s-star")
          ->color("warning"),
        Tables\Columns\ToggleColumn::make("published"),
      ])
      ->filters([
        //
      ])
      ->actions([
        // Tables\Actions\Action::make("toggle_publish"),
        Tables\Actions\ViewAction::make(),
      ])
      ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
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
      "index" => Pages\ListReviews::route("/"),
      "view" => Pages\ViewReview::route("/{record}"),
    ];
  }
}
