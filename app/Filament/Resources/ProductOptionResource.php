<?php

namespace App\Filament\Resources;

use App\Enums\AddonExtraDataTypeEnum;
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
      Forms\Components\Tabs::make("data")
        ->schema([
          Forms\Components\Tabs\Tab::make("Product Option")
            ->schema([
              Forms\Components\TextInput::make("title")
                ->required()
                ->maxLength(255),
              Forms\Components\Select::make("type")
                ->required()
                ->reactive()
                ->afterStateUpdated(function (
                  $state,
                  Closure $set,
                  Closure $get
                ) {
                  $set("shipping_id", null);

                  foreach ($get("addons") as $key => $value) {
                    $set("addons.$key.type", null);
                  }
                })
                ->options(OptionTypeEnum::listOptionsWithLabel()),

              // Forms\Components\Select::make("addons")
              //   ->multiple()
              //   ->relationship("addons", "title")
              //   ->reactive()
              //   ->preload()
              //   ->hiddenOn("create")
              //   ->options(function (\Closure $get, ?Model $record) {
              // $currentTypeOption = $get("type");

              // if (!$currentTypeOption) {
              //   return [];
              // }

              // $requiredTypes =
              //   OptionTypeEnum::from($currentTypeOption) ===
              //   OptionTypeEnum::SQFT
              //     ? [
              //       AddonTypeEnum::FEE,
              //       AddonTypeEnum::SQFT,
              //       AddonTypeEnum::LINEAR_FOOT,
              //     ]
              //     : [AddonTypeEnum::FEE];

              // return $record->product->addons
              //   ->whereIn("type", $requiredTypes)
              //   ->pluck("title", "id");
              //   }),

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
                    case OptionTypeEnum::PER_QTY:
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

              Section::make("Quantity")
                ->description(
                  "Here you can specify a given size that will be dropdown"
                )
                ->schema([
                  Forms\Components\Repeater::make("quantity_list")
                    ->hidden(fn(\Closure $get) => $get("disable_prepared"))
                    ->reactive()
                    ->schema([
                      Forms\Components\TextInput::make("label")->helperText(
                        "Here you can specify the label of the quantity that will be shown in the menu"
                      ),
                      Forms\Components\TextInput::make("quantity")->helperText(
                        "Here you need to indicate the specific quantity that will be assigned"
                      ),
                    ]),
                ]),

              Section::make("Sizes")
                ->hidden(
                  fn(\Closure $get) => $get("show_custom_sizes") == false
                )
                ->schema([
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

                      return OptionTypeEnum::from($type) !==
                        OptionTypeEnum::SQFT;
                    }),
                  Select::make("size_list_id")
                    ->label("Size List")
                    ->columnSpanFull()
                    ->reactive()
                    ->options(fn() => SizeList::query()->pluck("title", "id")),
                  Toggle::make("prevent_user_input_size")
                    ->hidden(fn(Closure $get) => !$get("size_list_id"))
                    ->default(false)
                    ->label("Prevent the user from entering their size?"),
                ]),

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
                ->minItems(1)
                ->schema([
                  Forms\Components\TextInput::make("from")
                    ->numeric()
                    ->required()
                    ->disabled(function (\Closure $get) {
                      $currentUUID = $get("uuid");
                      $repeater = $get("../../range_prices");

                      list(
                        $prevFrom,
                        $prevTo,
                      ) = static::getValueFromPrevRepeater(
                        $repeater,
                        $currentUUID
                      );

                      return !is_null($prevTo) && $prevTo === -1;
                    })
                    ->minValue(function (\Closure $get) {
                      $currentUUID = $get("uuid");
                      $repeater = $get("../../range_prices");

                      list(
                        $prevFrom,
                        $prevTo,
                      ) = static::getValueFromPrevRepeater(
                        $repeater,
                        $currentUUID
                      );

                      if ($prevFrom === -1) {
                        return false;
                      }

                      return $prevTo === -1 ? 99999 : $prevTo + 1;
                    })
                    ->reactive(),
                  Forms\Components\Group::make([
                    Forms\Components\TextInput::make("to")
                      ->numeric()
                      ->required(),
                    Forms\Components\Toggle::make("infinity")
                      ->hidden(function (Closure $get) {
                        $rangePrices = $get("../../range_prices");
                        $lastRangePrice = end($rangePrices);
                        $currentRangeUUID = $get("uuid");

                        if ($lastRangePrice["uuid"] === $currentRangeUUID) {
                          return false;
                        }

                        return true;
                      })
                      ->dehydrated(false)
                      ->reactive()
                      ->label("To Infinity")
                      ->afterStateHydrated(function (
                        Toggle $component,
                        Closure $get
                      ) {
                        $component->state($get("to") == -1);
                      })
                      ->afterStateUpdated(
                        fn(Closure $set, $state) => $set("to", $state ? -1 : "")
                      ),
                  ]),
                  Forms\Components\TextInput::make("price")
                    ->numeric()
                    ->required()
                    ->dehydrateStateUsing(
                      fn($state) => intval(round($state * 100))
                    )
                    ->afterStateHydrated(function (
                      TextInput $component,
                      $state
                    ) {
                      $component->state($state / 100);
                    })
                    ->postfix('$'),
                  Forms\Components\TextInput::make("uuid")
                    ->reactive()
                    ->disabled()
                    ->hidden()
                    ->dehydrated(false)
                    ->afterStateHydrated(function (
                      TextInput $component,
                      $state
                    ) {
                      $component->state(Str::uuid());
                    }),
                ])
                ->createItemButtonLabel("Add new range price")
                ->disableItemCreation(function (\Closure $get) {
                  $rangePrices = $get("range_prices");
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

              Forms\Components\Repeater::make("per_quantity_prices")
                ->columns(3)
                ->reactive()
                ->hidden(fn(\Closure $get) => $get("type") !== "per_qty")
                ->minItems(1)
                ->schema([
                  Forms\Components\TextInput::make("from")
                    ->numeric()
                    ->required()
                    ->disabled(function (\Closure $get) {
                      $currentUUID = $get("uuid");
                      $repeater = $get("../../per_quantity_prices");

                      list(
                        $prevFrom,
                        $prevTo,
                      ) = static::getValueFromPrevRepeater(
                        $repeater,
                        $currentUUID
                      );

                      return !is_null($prevTo) && $prevTo === -1;
                    })
                    ->minValue(function (\Closure $get) {
                      $currentUUID = $get("uuid");
                      $repeater = $get("../../per_quantity_prices");

                      list(
                        $prevFrom,
                        $prevTo,
                      ) = static::getValueFromPrevRepeater(
                        $repeater,
                        $currentUUID
                      );

                      if ($prevFrom === -1) {
                        return false;
                      }

                      return $prevTo === -1 ? 99999 : $prevTo + 1;
                    })
                    ->reactive(),
                  Forms\Components\Group::make([
                    Forms\Components\TextInput::make("to")
                      ->numeric()
                      ->required(),
                    Forms\Components\Toggle::make("infinity")
                      ->hidden(function (Closure $get) {
                        $rangePrices = $get("../../per_quantity_prices");
                        $lastRangePrice = end($rangePrices);
                        $currentRangeUUID = $get("uuid");

                        if ($lastRangePrice["uuid"] === $currentRangeUUID) {
                          return false;
                        }

                        return true;
                      })
                      ->dehydrated(false)
                      ->reactive()
                      ->label("To Infinity")
                      ->afterStateHydrated(function (
                        Toggle $component,
                        Closure $get
                      ) {
                        $component->state($get("to") == -1);
                      })
                      ->afterStateUpdated(
                        fn(Closure $set, $state) => $set("to", $state ? -1 : "")
                      ),
                  ]),
                  Forms\Components\TextInput::make("price")
                    ->numeric()
                    ->required()
                    ->dehydrateStateUsing(fn($state) => round($state * 100))
                    ->afterStateHydrated(function (
                      TextInput $component,
                      $state
                    ) {
                      $component->state($state / 100);
                    })
                    ->postfix('$'),
                  Forms\Components\TextInput::make("uuid")
                    ->reactive()
                    ->disabled()
                    ->hidden()
                    ->dehydrated(false)
                    ->afterStateHydrated(function (
                      TextInput $component,
                      $state
                    ) {
                      $component->state(Str::uuid());
                    }),
                ])
                ->createItemButtonLabel("Add new range price")
                ->disableItemCreation(function (\Closure $get) {
                  $rangePrices = $get("per_quantity_prices");
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
            ])
            ->columns(2),
          Forms\Components\Tabs\Tab::make("Addons")->schema([
            Forms\Components\Repeater::make("addons")
              ->relationship()
              ->disableLabel()
              ->columns(2)
              ->orderable("order_column")
              ->schema([
                Forms\Components\TextInput::make("title")
                  ->required()
                  ->maxLength(255),
                Forms\Components\Select::make("type")
                  ->reactive()
                  ->options(function (\Closure $get) {
                    $productOptionType = $get("../../type");

                    if (!$productOptionType) {
                      return [];
                    }

                    $requiredTypes =
                      OptionTypeEnum::from($productOptionType) ===
                      OptionTypeEnum::SQFT
                        ? [
                          AddonTypeEnum::FEE,
                          AddonTypeEnum::SQFT,
                          AddonTypeEnum::LINEAR_FOOT,
                        ]
                        : [AddonTypeEnum::FEE];

                    return collect($requiredTypes)
                      ->mapWithKeys(fn($enum) => [$enum->value => $enum->value])
                      ->all();
                  })
                  ->required(),

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
                Forms\Components\TextInput::make("group_addon")->helperText(
                  "Can select one addon from the selected group"
                ),
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
              ]),
          ]),
          Forms\Components\Tabs\Tab::make("Shipping")->schema([]),
        ])
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
