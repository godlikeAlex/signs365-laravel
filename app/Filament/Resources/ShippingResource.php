<?php

namespace App\Filament\Resources;

use App\Enums\ShippingTypeEnum;
use App\Filament\Resources\ShippingResource\Pages;
use App\Filament\Resources\ShippingResource\RelationManagers;
use App\Models\Shipping;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ShippingResource extends Resource
{
  protected static ?string $model = Shipping::class;

  protected static ?string $navigationIcon = "heroicon-o-collection";

  static function inputForm(): array
  {
    return [
      Forms\Components\TextInput::make("title"),
      Forms\Components\Select::make("type")
        ->required()
        ->reactive()
        ->options(function () {
          return collect(ShippingTypeEnum::cases())
            ->mapWithKeys(fn($enum) => [$enum->value => $enum->name])
            ->all();
        }),
      Section::make("Condition")
        ->statePath("condition")
        ->schema([
          Forms\Components\Repeater::make("range_sqft")
            ->hidden(function (Closure $get) {
              $currentType = $get("../type");
              if (!$currentType) {
                return true;
              }

              return ShippingTypeEnum::from($currentType) !==
                ShippingTypeEnum::SQFT;
            })
            ->schema([
              Forms\Components\TextInput::make("from")
                ->required()
                ->numeric(),
              Forms\Components\TextInput::make("to")
                ->required()
                ->numeric(),
              Forms\Components\TextInput::make("price")
                ->required()
                ->numeric()
                ->dehydrateStateUsing(fn($state) => $state * 100)
                ->afterStateHydrated(function (TextInput $component, $state) {
                  $component->state($state / 100);
                }),
            ]),
          Forms\Components\Repeater::make("range_wh")
            ->reactive()
            ->hidden(function (Closure $get) {
              $currentType = $get("../type");
              if (!$currentType) {
                return true;
              }

              return ShippingTypeEnum::from($currentType) !==
                ShippingTypeEnum::WIDTHxHEIGHT;
            })
            ->schema([
              Grid::make(2)->schema([
                Forms\Components\TextInput::make("from_width")
                  ->label("From WIDTH")
                  ->reactive()
                  ->numeric()
                  ->required(),
                Forms\Components\TextInput::make("to_width")
                  ->label("To WIDTH")
                  ->reactive()
                  ->numeric()
                  ->minValue(function (\Closure $get, $state) {
                    if ($state != -1) {
                      return intval($get("from_width")) + 0.01;
                    }
                  })
                  ->required(),
              ]),
              Grid::make(2)->schema([
                Forms\Components\TextInput::make("from_height")
                  ->label("From HEIGHT")
                  ->reactive()
                  ->required(),
                Forms\Components\TextInput::make("to_height")
                  ->numeric()
                  ->minValue(function (\Closure $get, $state) {
                    if ($state != -1) {
                      return intval($get("from_height")) + 0.01;
                    }
                  })
                  ->label("To HEIGHT")
                  ->required(),
              ]),
              Forms\Components\TextInput::make("price")
                ->required()
                ->numeric()
                ->dehydrateStateUsing(fn($state) => $state * 100)
                ->afterStateHydrated(function (TextInput $component, $state) {
                  $component->state($state / 100);
                }),
              Forms\Components\TextInput::make("uuid")
                ->reactive()
                ->disabled()
                ->hidden()
                ->dehydrated(false)
                ->afterStateHydrated(function (TextInput $component, $state) {
                  $component->state(Str::uuid());
                }),
            ])
            ->disableItemCreation(function (\Closure $get) {
              $rangePrices = $get("range_wh");

              $lastRangePrice = end($rangePrices);

              if (!$lastRangePrice) {
                return false;
              }

              $lastRangePriceWidthTo = $lastRangePrice["to_width"];
              $lastRangePriceWidthFrom = $lastRangePrice["from_width"];

              $lastRangePriceHeightTo = $lastRangePrice["to_height"];
              $lastRangePriceHeightFrom = $lastRangePrice["from_height"];

              $alloAnyHeight =
                (is_null($lastRangePriceHeightTo) &&
                  is_null($lastRangePriceHeightFrom)) ||
                ($lastRangePriceHeightTo == -1 &&
                  $lastRangePriceHeightFrom == -1);

              $alloAnyWidth =
                (is_null($lastRangePriceWidthTo) &&
                  is_null($lastRangePriceWidthFrom)) ||
                ($lastRangePriceWidthTo == -1 &&
                  $lastRangePriceWidthFrom == -1);

              $isEmpty =
                is_null($lastRangePriceWidthTo) ||
                is_null($lastRangePriceWidthFrom) ||
                is_null($lastRangePriceHeightFrom) ||
                is_null($lastRangePriceHeightTo);

              return $alloAnyHeight || $alloAnyWidth || $isEmpty;
            }),
          Forms\Components\TextInput::make("price")
            ->hidden(function (Closure $get) {
              $currentType = $get("../type");
              if (!$currentType) {
                return true;
              }

              return ShippingTypeEnum::from($currentType) !==
                ShippingTypeEnum::SINGLE;
            })
            ->required()
            ->dehydrateStateUsing(fn($state) => $state * 100)
            ->afterStateHydrated(function (TextInput $component, $state) {
              $component->state($state / 100);
            })
            ->numeric()
            ->prefix("$"),
          //   Forms\Components\TextInput::make("less"),
          //   Forms\Components\TextInput::make("more"),
          //   Forms\Components\TextInput::make("symbol"),
        ]),
    ];
  }

  public static function form(Form $form): Form
  {
    return $form->schema(static::inputForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("title"),
        Tables\Columns\TextColumn::make("type"),
        Tables\Columns\TextColumn::make("created_at")->dateTime(),
        Tables\Columns\TextColumn::make("updated_at")->dateTime(),
      ])
      ->filters([
        //
      ])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
  }

  public static function getRelations(): array
  {
    return [
        //
      ];
  }

  private static function getValuesFromPrevRepeater($repeater, $currentUUID)
  {
    $currentRepeaterKey = array_search(
      $currentUUID,
      array_column($repeater, "uuid")
    );

    if ($currentRepeaterKey > 0) {
      $valuesOfRepeater = array_values($repeater);
      $prevIndex = $currentRepeaterKey - 1;

      $prevFromWidth = $valuesOfRepeater[$prevIndex]["from_width"];
      $prevToWidth = $valuesOfRepeater[$prevIndex]["to_width"];

      $prevFromHeight = $valuesOfRepeater[$prevIndex]["from_height"];
      $prevToHeight = $valuesOfRepeater[$prevIndex]["to_height"];

      return [
        intval($prevFromWidth),
        intval($prevToWidth),
        intval($prevFromHeight),
        intval($prevToHeight),
      ];
    }

    return [null, null, null, null];
  }

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListShippings::route("/"),
      "create" => Pages\CreateShipping::route("/create"),
      "edit" => Pages\EditShipping::route("/{record}/edit"),
    ];
  }
}
