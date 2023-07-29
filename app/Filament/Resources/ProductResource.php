<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Filament\Resources\ProductResource\RelationManagers\AddonsRelationManager;
use App\Filament\Resources\ProductResource\RelationManagers\OptionsRelationManager;
use App\Models\Product;
use App\Models\ProductCategory;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
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

  protected static ?string $navigationIcon = "heroicon-o-lightning-bolt";
  protected static ?string $navigationGroup = "SHOP";
  protected static ?string $navigationLabel = "Products";

  public static function productForm(): array
  {
    return [
      Forms\Components\Tabs::make("Heading")
        ->columnSpanFull()
        ->tabs([
          Forms\Components\Tabs\Tab::make("Product Information")
            ->icon("heroicon-s-information-circle")
            ->schema([
              Forms\Components\TextInput::make("title")
                ->required()
                ->reactive()
                ->afterStateUpdated(function (Closure $set, $state) {
                  $set("slug", Str::slug($state));
                })
                ->maxLength(50),
              Forms\Components\TextInput::make("slug")
                ->required()
                ->maxLength(75),
              Forms\Components\RichEditor::make("description")->columnSpan(
                "full"
              ),

              Forms\Components\Select::make("categories")
                ->multiple()
                ->required()
                ->relationship("categories", "title")
                ->preload(),

              Toggle::make("with_checkout")
                ->reactive()
                ->hint(
                  fn($state) => $state
                    ? ""
                    : "Prices will appear at the bottom after saving the product"
                )
                ->default(true),

              Toggle::make("custom_size")
                ->reactive()
                ->dehydrated(false)
                ->afterStateHydrated(function (
                  Toggle $component,
                  Model $record,
                  $state,
                  \Closure $get
                ) {
                  if ($record->sizes()->count() > 0) {
                    $component->state(true);
                  }
                })
                ->hidden(fn(\Closure $get) => $get("with_checkout") == false)
                ->default(false),

              Section::make("Size Validation")
                ->schema([
                  Forms\Components\TextInput::make("max_width")
                    ->reactive()
                    ->numeric(),
                  Forms\Components\TextInput::make("max_height")
                    ->reactive()
                    ->numeric(),
                ])
                ->hidden(fn(\Closure $get) => $get("with_checkout") == false),

              Section::make("Custom Sizes")
                ->schema([
                  Repeater::make("sizes")
                    ->relationship("sizes")
                    ->schema([
                      Forms\Components\TextInput::make("width")
                        ->numeric()
                        ->reactive()
                        ->afterStateUpdated(function (
                          Closure $set,
                          Closure $get,
                          $state
                        ) {
                          $height = $get("height") ?? 0;

                          $set("label", $state . '" x "' . $height . '"');
                        })
                        ->mask(
                          fn(TextInput\Mask $mask) => $mask
                            ->numeric()
                            ->minValue(1) // Set the minimum value that the number can be.
                        ),
                      Forms\Components\TextInput::make("height")
                        ->numeric()
                        ->reactive()
                        ->afterStateUpdated(function (
                          Closure $set,
                          Closure $get,
                          $state
                        ) {
                          $width = $get("width") ?? 0;

                          $set("label", $width . '" x ' . $state . '"');
                        })
                        ->mask(
                          fn(TextInput\Mask $mask) => $mask
                            ->numeric()
                            ->minValue(1) // Set the minimum value that the number can be.
                        ),
                      Forms\Components\TextInput::make("label")->reactive(),
                    ])
                    ->columns(3)
                    ->defaultItems(1),
                ])
                ->collapsed()
                ->hidden(fn(\Closure $get) => $get("custom_size") == false),

              Toggle::make("published")
                ->columnSpanFull()
                ->reactive()
                ->visibleOn("edit")
                ->default(false),
            ]),

          Forms\Components\Tabs\Tab::make("Product Images")
            ->icon("heroicon-s-camera")
            ->schema([
              Forms\Components\FileUpload::make("images")
                ->columnSpanFull()
                ->multiple()
                ->enableReordering()
                ->directory("products"),
            ]),
        ]),
    ];
  }

  public static function form(Form $form): Form
  {
    return $form->schema(static::productForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("title")->searchable(),
        Tables\Columns\TextColumn::make("slug")->searchable(),
        // Tables\Columns\TextColumn::make("prices_min_price")
        //   ->label("Start Price")
        //   ->min("prices", "price")
        //   ->sortable()
        //   ->money("usd"),
        Tables\Columns\IconColumn::make("published")
          ->boolean()
          ->sortable(),
        Tables\Columns\TagsColumn::make("categories.title")->separator(","),
        Tables\Columns\TextColumn::make("created_at")->date($format = "F j, Y"),
      ])
      ->filters([
        Tables\Filters\TrashedFilter::make(),
        Tables\Filters\Filter::make("product_category")
          ->form([
            Forms\Components\Select::make("product_category")
              ->options(ProductCategory::all()->pluck("title", "id"))
              ->searchable(),
          ])
          ->query(function (Builder $query, array $data) {
            if (isset($data["product_category"])) {
              // ->productCategories()
              // ->find($data["product_category"]);
              return $query->whereHas("productCategories", function (
                Builder $qCategories
              ) use ($data) {
                $qCategories->where(
                  "product_categories.id",
                  $data["product_category"]
                );
              });
            }
          }),
      ])
      ->actions([
        Tables\Actions\EditAction::make(),
        Tables\Actions\DeleteAction::make(),
        Tables\Actions\ForceDeleteAction::make(),
        Tables\Actions\RestoreAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        Tables\Actions\ForceDeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
      ]);
  }

  public static function getEloquentQuery(): Builder
  {
    return parent::getEloquentQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }

  public static function getRelations(): array
  {
    return [OptionsRelationManager::class, AddonsRelationManager::class];
  }

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListProducts::route("/"),
      "create" => Pages\CreateProduct::route("/create"),
      "edit" => Pages\EditProduct::route("/{record}/edit"),
    ];
  }
}
