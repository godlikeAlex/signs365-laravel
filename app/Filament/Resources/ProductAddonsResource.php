<?php

namespace App\Filament\Resources;

use App\Enums\AddonExtraDataTypeEnum;
use App\Enums\AddonTypeEnum;
use App\Enums\OptionTypeEnum;
use App\Filament\Resources\ProductAddonsResource\Pages;
use App\Filament\Resources\ProductAddonsResource\RelationManagers;
use App\Models\ProductAddons;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Arr;

class ProductAddonsResource extends Resource
{
  protected static ?string $model = ProductAddons::class;

  protected static ?string $navigationIcon = "heroicon-o-clipboard-list";
  protected static ?string $navigationGroup = "SHOP";
  protected static ?int $navigationSort = 5;

  static function inputForm(): array
  {
    return [
      Forms\Components\TextInput::make("title")
        ->required()
        ->maxLength(255),
      Forms\Components\Select::make("type")
        ->reactive()
        ->options(function () {
          return collect(AddonTypeEnum::cases())
            ->mapWithKeys(fn($enum) => [$enum->value => $enum->value])
            ->all();
        })
        ->required(),

      // Forms\Components\Select::make("options")
      //   ->multiple()
      //   ->relationship("options", "title")
      //   ->reactive()
      //   ->preload()
      //   ->hiddenOn("create")
      //   ->options(function (\Closure $get, ?Model $record) {
      //     $currentTypeAddon = $get("type");
      //     $requiredTypes =
      //       AddonTypeEnum::from($currentTypeAddon) === AddonTypeEnum::SQFT
      //         ? [OptionTypeEnum::SQFT]
      //         : [OptionTypeEnum::BY_QTY, OptionTypeEnum::SINGLE];

      //     return $record->product->options
      //       ->whereIn("type", $requiredTypes)
      //       ->pluck("title", "id");
      //   }),

      Forms\Components\TextInput::make("condition")
        ->required()
        ->reactive()
        ->numeric(
          fn(\Closure $get) => in_array($get("type"), [
            AddonTypeEnum::SQFT->value,
            AddonTypeEnum::LINEAR_FOOT->value,
          ])
        )
        ->regex(function (\Closure $get) {
          if (
            in_array($get("type"), [
              AddonTypeEnum::SQFT->value,
              AddonTypeEnum::LINEAR_FOOT->value,
            ])
          ) {
            return "/\d/m";
          } else {
            // return "/[+-]\d*[%]?$/m";
            return '/^[+-][0-9]+(\.[0-9]{1,2})?[%]?$/';
          }
        })
        // ()

        ->maxLength(255),
      Forms\Components\Select::make("extra_data_type")
        ->reactive()
        ->options(function () {
          return collect(AddonExtraDataTypeEnum::cases())
            ->mapWithKeys(fn($enum) => [$enum->value => $enum->value])
            ->all();
        }),
      Forms\Components\TextInput::make("per_item_price")
        ->required()
        ->numeric()
        ->label("Per item price")
        ->dehydrateStateUsing(fn($state) => $state * 100)
        ->afterStateHydrated(function (TextInput $component, $state) {
          $component->state($state / 100);
        })
        ->required(fn(\Closure $get) => $get("with_qty"))
        ->hidden(fn(\Closure $get) => $get("with_qty") == false),

      Forms\Components\Toggle::make("with_qty")
        ->required()
        ->columnSpanFull()
        ->reactive()
        ->label("This addon will be with Quantity?"),

      Forms\Components\TextInput::make("min-qty")
        ->required()
        ->numeric()
        ->label("Minimum Quantity")
        ->required(fn(\Closure $get) => $get("with_qty"))
        ->hidden(fn(\Closure $get) => $get("with_qty") == false)
        ->maxLength(255),

      Forms\Components\TextInput::make("max-qty")
        ->required()
        ->numeric()
        ->label("Maximum Quantity")
        ->required(fn(\Closure $get) => $get("with_qty"))
        ->hidden(fn(\Closure $get) => $get("with_qty") == false)
        ->maxLength(255),
    ];
  }

  public static function form(Form $form): Form
  {
    return $form->schema(self::inputForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("title"),
        Tables\Columns\TextColumn::make("type"),
        Tables\Columns\TextColumn::make("condition"),
        Tables\Columns\IconColumn::make("with_qty")
          ->label("With Quantity?")
          ->boolean(),
      ])
      ->filters([Tables\Filters\TrashedFilter::make()])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        // Tables\Actions\ForceDeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
      ]);
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
      "index" => Pages\ListProductAddons::route("/"),
      "create" => Pages\CreateProductAddons::route("/create"),
      "edit" => Pages\EditProductAddons::route("/{record}/edit"),
    ];
  }

  public static function getEloquentQuery(): Builder
  {
    return parent::getEloquentQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }
}
