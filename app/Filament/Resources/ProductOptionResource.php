<?php

namespace App\Filament\Resources;

use App\Enums\AddonTypeEnum;
use App\Enums\OptionTypeEnum;
use App\Enums\ShippingTypeEnum;
use App\Filament\Resources\ProductOptionResource\Pages;
use App\Filament\Resources\ProductOptionResource\RelationManagers;
use App\Models\ProductAddons;
use App\Models\ProductOption;
use App\Models\Shipping;
use App\Models\SizeList;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Component;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ProductOptionResource extends Resource
{
  protected static ?string $model = ProductOption::class;

  protected static ?string $navigationIcon = "heroicon-o-color-swatch";
  protected static ?string $navigationGroup = "SHOP";
  protected static ?int $navigationSort = 4;

  static function inputForm(): array
  {
    return [
      Forms\Components\TextInput::make("title")
        ->required()
        ->maxLength(255),
      Forms\Components\Select::make("type")
        ->required()
        ->reactive()
        ->afterStateUpdated(function ($state, Closure $set) {
          $set("shipping_id", null);
        })
        ->options(OptionTypeEnum::listOptionsWithLabel()),

      Forms\Components\Select::make("addons")
        ->multiple()
        ->relationship("addons", "title")
        ->reactive()
        ->preload()
        ->hiddenOn("create")
        ->options(function (\Closure $get, ?Model $record) {
          $currentTypeOption = $get("type");

          if (!$currentTypeOption) {
            return [];
          }

          $requiredTypes =
            OptionTypeEnum::from($currentTypeOption) === OptionTypeEnum::SQFT
              ? [
                AddonTypeEnum::FEE,
                AddonTypeEnum::SQFT,
                AddonTypeEnum::LINEAR_FOOT,
              ]
              : [AddonTypeEnum::FEE];

          return $record->product->addons
            ->whereIn("type", $requiredTypes)
            ->pluck("title", "id");
        }),

      Forms\Components\Select::make("shipping_id")
        ->searchable()
        ->relationship("shipping", "title")
        ->reactive()
        ->preload()
        ->options(function (\Closure $get, ?Model $record) {
          $currentTypeOption = $get("type");
          $customSizeIsSet = $get("show_custom_sizes");

          if (!$currentTypeOption) {
            return;
          }

          switch (OptionTypeEnum::from($currentTypeOption)) {
            case OptionTypeEnum::SQFT:
              $requiredTypes = [
                ShippingTypeEnum::SQFT,
                ShippingTypeEnum::SINGLE,
                ShippingTypeEnum::WIDTHxHEIGHT,
              ];
              break;

            case OptionTypeEnum::SINGLE:
              $requiredTypes = $customSizeIsSet
                ? [ShippingTypeEnum::WIDTHxHEIGHT]
                : [ShippingTypeEnum::SINGLE];
              break;
            case OptionTypeEnum::BY_QTY:
              $requiredTypes = $customSizeIsSet
                ? [ShippingTypeEnum::WIDTHxHEIGHT]
                : [ShippingTypeEnum::SINGLE];
              break;

            default:
              $requiredTypes = [];
              break;
          }

          return Shipping::query()
            ->whereIn("type", $requiredTypes)
            ->pluck("title", "id");
        }),
      Forms\Components\TextInput::make("price")
        ->prefix('$')
        ->numeric()
        ->hidden(fn(\Closure $get) => $get("type") == "qty")
        ->dehydrateStateUsing(fn($state) => $state * 100)
        ->afterStateHydrated(function (TextInput $component, $state) {
          $component->state($state / 100);
        })
        ->required(),

      Forms\Components\TextInput::make("min_price")
        ->prefix('$')
        ->numeric()
        ->default(0)
        ->dehydrateStateUsing(fn($state) => $state * 100)
        ->afterStateHydrated(function (TextInput $component, $state) {
          $component->state($state / 100);
        })
        ->required(),

      Toggle::make("need_file")
        ->label("Need file?")
        ->default(false)
        ->columnSpanFull()
        ->reactive(),

      Toggle::make("size_for_collect")
        ->default(false)
        ->reactive()
        ->columnSpanFull()
        ->hidden(
          fn(Closure $get) => $get("type") &&
            OptionTypeEnum::from($get("type")) === OptionTypeEnum::SQFT
        ),
      Toggle::make("show_custom_sizes")
        ->default(false)
        ->reactive()
        ->hidden(fn(Closure $get) => !$get("size_for_collect")),

      Section::make("Size Validation")
        ->schema([
          Forms\Components\TextInput::make("max_width")
            ->reactive()
            ->required()
            ->default(-1)
            ->numeric(),
          Forms\Components\TextInput::make("max_height")
            ->reactive()
            ->default(-1)
            ->required()
            ->numeric(),
        ])
        ->hidden(function (\Closure $get) {
          $type = $get("type");
          $customSizeIsSet = $get("show_custom_sizes");

          if (!$type) {
            return true;
          }

          if ($customSizeIsSet) {
            return false;
          }

          return OptionTypeEnum::from($type) !== OptionTypeEnum::SQFT;
        }),

      Select::make("size_list_id")
        ->label("Size List")
        ->columnSpanFull()
        ->options(fn() => SizeList::query()->pluck("title", "id"))
        ->hidden(fn(\Closure $get) => $get("show_custom_sizes") == false),
      Section::make("Common Data")
        ->reactive()
        ->hidden(
          fn(\Closure $get) => !$get("size_for_collect") ||
            $get("show_custom_sizes")
        )
        ->statePath("common_data")
        ->schema([
          Forms\Components\TextInput::make("static_width")->default(1),
          Forms\Components\TextInput::make("static_height")->default(1),
        ]),

      Forms\Components\Repeater::make("range_prices")
        ->columns(3)
        ->reactive()
        ->hidden(fn(\Closure $get) => $get("type") !== "qty")
        ->afterStateUpdated(function () {
          info("updated");
        })
        ->minItems(1)
        ->schema([
          Forms\Components\TextInput::make("from")
            ->numeric()
            ->required()
            ->disabled(function (\Closure $get) {
              $currentUUID = $get("uuid");
              $repeater = $get("../../range_prices");

              list($prevFrom, $prevTo) = static::getValueFromPrevRepeater(
                $repeater,
                $currentUUID
              );

              return !is_null($prevTo) && $prevTo === -1;
            })
            ->minValue(function (\Closure $get) {
              $currentUUID = $get("uuid");
              $repeater = $get("../../range_prices");

              list($prevFrom, $prevTo) = static::getValueFromPrevRepeater(
                $repeater,
                $currentUUID
              );

              if ($prevFrom === -1) {
                return false;
              }

              return $prevTo === -1 ? 99999 : $prevTo + 1;
            })
            ->reactive(),
          Forms\Components\TextInput::make("to")
            ->numeric()
            ->required(),
          Forms\Components\TextInput::make("price")
            ->numeric()
            ->required()
            ->dehydrateStateUsing(fn($state) => $state * 100)
            ->afterStateHydrated(function (TextInput $component, $state) {
              $component->state($state / 100);
            })
            ->postfix('$'),
          Forms\Components\TextInput::make("uuid")
            ->reactive()
            ->disabled()
            ->hidden()
            ->dehydrated(false)
            ->afterStateHydrated(function (TextInput $component, $state) {
              $component->state(Str::uuid());
            }),
        ])
        ->createItemButtonLabel("Add new range price")
        ->disableItemCreation(function (\Closure $get) {
          $rangePrices = $get("range_prices");
          info($rangePrices, ["rangePrice" => $rangePrices]);
          $lastRangePrice = end($rangePrices);

          if (!$lastRangePrice) {
            return false;
          }

          $lastRangePriceTo = $lastRangePrice["to"];

          return is_null($lastRangePriceTo) || $lastRangePriceTo == -1;
        })
        ->disableItemMovement()
        ->reactive()
        ->columnSpanFull(),
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
        Tables\Columns\TextColumn::make("price")->money(),
        Tables\Columns\TextColumn::make("type"),
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
      "index" => Pages\ListProductOptions::route("/"),
      "create" => Pages\CreateProductOption::route("/create"),
      "edit" => Pages\EditProductOption::route("/{record}/edit"),
    ];
  }

  public static function getEloquentQuery(): Builder
  {
    return parent::getEloquentQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }

  private static function getValueFromPrevRepeater($repeater, $currentUUID)
  {
    $currentRepeaterKey = array_search(
      $currentUUID,
      array_column($repeater, "uuid")
    );

    if ($currentRepeaterKey > 0) {
      $valuesOfRepeater = array_values($repeater);
      $prevIndex = $currentRepeaterKey - 1;
      $prevValueFrom = $valuesOfRepeater[$prevIndex]["from"];
      $prevValueTo = $valuesOfRepeater[$prevIndex]["to"];

      return [intval($prevValueFrom), intval($prevValueTo)];
    }

    return [null, null];
  }
}
