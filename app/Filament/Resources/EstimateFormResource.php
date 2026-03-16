<?php

namespace App\Filament\Resources;

use App\Enums\AddonTypeEnum;
use App\Enums\OptionTypeEnum;
use App\Filament\Resources\EstimateFormResource\Pages;
use App\Models\EstimateForm;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class EstimateFormResource extends Resource
{
  protected static ?string $model = EstimateForm::class;

  protected static ?string $navigationIcon = "heroicon-o-collection";
  protected static ?string $navigationGroup = "SHOP";
  protected static ?int $navigationSort = 6;
  protected static bool $shouldRegisterNavigation = false;

  public static function inputForm(): array
  {
    return [
      Forms\Components\Tabs::make("data")
        ->schema([
          Forms\Components\Tabs\Tab::make("Estimate Form")
            ->schema([
              Forms\Components\TextInput::make("title")
                ->required()
                ->maxLength(255),
              Forms\Components\Select::make("type")
                ->required()
                ->reactive()
                ->options(OptionTypeEnum::listOptionsWithLabel()),

              Forms\Components\TextInput::make("price")
                ->prefix('$')
                ->numeric()
                ->hidden(fn(Closure $get) => $get("type") == "qty")
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

              Toggle::make("is_active")->default(true),

              Forms\Components\Repeater::make("range_prices")
                ->columns(3)
                ->reactive()
                ->hidden(fn(Closure $get) => $get("type") !== "qty")
                ->minItems(1)
                ->schema([
                  Forms\Components\TextInput::make("from")
                    ->numeric()
                    ->required()
                    ->disabled(function (Closure $get) {
                      $currentUUID = $get("uuid");
                      $repeater = $get("../../range_prices");

                      [$prevFrom, $prevTo] = static::getValueFromPrevRepeater(
                        $repeater,
                        $currentUUID
                      );

                      return !is_null($prevTo) && $prevTo === -1;
                    })
                    ->minValue(function (Closure $get) {
                      $currentUUID = $get("uuid");
                      $repeater = $get("../../range_prices");

                      [$prevFrom, $prevTo] = static::getValueFromPrevRepeater(
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
                        $ranges = $get("../../range_prices");
                        $lastRange = end($ranges);
                        $currentRangeUUID = $get("uuid");

                        if (
                          $lastRange &&
                          $lastRange["uuid"] === $currentRangeUUID
                        ) {
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
                      $component->state($state ?: Str::uuid());
                    }),
                ])
                ->columnSpanFull(),

              Forms\Components\Repeater::make("per_quantity_prices")
                ->columns(3)
                ->reactive()
                ->hidden(fn(Closure $get) => $get("type") !== "per_qty")
                ->minItems(1)
                ->schema([
                  Forms\Components\TextInput::make("from")
                    ->numeric()
                    ->required()
                    ->disabled(function (Closure $get) {
                      $currentUUID = $get("uuid");
                      $repeater = $get("../../per_quantity_prices");

                      [$prevFrom, $prevTo] = static::getValueFromPrevRepeater(
                        $repeater,
                        $currentUUID
                      );

                      return !is_null($prevTo) && $prevTo === -1;
                    })
                    ->minValue(function (Closure $get) {
                      $currentUUID = $get("uuid");
                      $repeater = $get("../../per_quantity_prices");

                      [$prevFrom, $prevTo] = static::getValueFromPrevRepeater(
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
                        $ranges = $get("../../per_quantity_prices");
                        $lastRange = end($ranges);
                        $currentRangeUUID = $get("uuid");

                        if (
                          $lastRange &&
                          $lastRange["uuid"] === $currentRangeUUID
                        ) {
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
                      $component->state($state ?: Str::uuid());
                    }),
                ])
                ->columnSpanFull(),
            ])
            ->columns(2),
          Forms\Components\Tabs\Tab::make("Fields")->schema([
            Forms\Components\Repeater::make("fields")
              ->relationship()
              ->disableLabel()
              ->columns(2)
              ->orderable("order_column")
              ->schema([
                Forms\Components\TextInput::make("title")
                  ->required()
                  ->maxLength(255),
                Forms\Components\Select::make("field_type")
                  ->options([
                    "radio" => "Radio (single option)",
                    "checkbox" => "Checkbox (multi options)",
                    "select" => "Select (single option)",
                    "text" => "Text Input",
                    "textarea" => "Textarea",
                    "number" => "Number",
                    "file" => "File Upload",
                  ])
                  ->default("radio")
                  ->required(),
                Forms\Components\Textarea::make("disclaimer")
                  ->rows(2)
                  ->columnSpanFull(),
                Forms\Components\TextInput::make("cart_label")
                  ->label("Label in estimate card")
                  ->maxLength(255)
                  ->columnSpanFull(),
                Forms\Components\Toggle::make("is_required")
                  ->default(false)
                  ->columnSpanFull(),

                Forms\Components\Toggle::make("is_active")
                  ->default(true)
                  ->columnSpanFull(),

                Forms\Components\Repeater::make("options")
                  ->relationship()
                  ->disableLabel()
                  ->minItems(1)
                  ->columns(2)
                  ->orderable("order_column")
                  ->columnSpanFull()
                  ->hidden(
                    fn(Closure $get) => !in_array($get("field_type"), [
                      "radio",
                      "checkbox",
                      "select",
                    ])
                  )
                  ->schema([
                    Forms\Components\TextInput::make("title")
                      ->required()
                      ->maxLength(255),
                    Forms\Components\Select::make("type")
                      ->reactive()
                      ->options(function () {
                        return collect([
                          AddonTypeEnum::FEE,
                          AddonTypeEnum::SQFT,
                          AddonTypeEnum::LINEAR_FOOT,
                        ])
                          ->mapWithKeys(
                            fn($enum) => [$enum->value => $enum->value]
                          )
                          ->all();
                      })
                      ->required(),
                    Forms\Components\TextInput::make("condition")
                      ->required()
                      ->reactive()
                      ->numeric(
                        fn(Closure $get) => in_array($get("type"), [
                          AddonTypeEnum::SQFT->value,
                          AddonTypeEnum::LINEAR_FOOT->value,
                        ])
                      )
                      ->regex(function (Closure $get) {
                        if (
                          in_array($get("type"), [
                            AddonTypeEnum::SQFT->value,
                            AddonTypeEnum::LINEAR_FOOT->value,
                          ])
                        ) {
                          return "/\d/m";
                        }

                        return '/^[+-][0-9]+(\.[0-9]{1,2})?[%]?$/';
                      })
                      ->maxLength(255),
                    Forms\Components\Textarea::make("disclaimer")->rows(2),
                    Forms\Components\Toggle::make("is_active")
                      ->default(true)
                      ->columnSpanFull(),
                  ]),
              ]),
          ]),
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
        Tables\Columns\TextColumn::make("title")->searchable(),
        Tables\Columns\TextColumn::make("type"),
        Tables\Columns\IconColumn::make("is_active")->boolean(),
      ])
      ->filters([Tables\Filters\TrashedFilter::make()])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
      ]);
  }

  public static function getRelations(): array
  {
    return [];
  }

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListEstimateForms::route("/"),
      "create" => Pages\CreateEstimateForm::route("/create"),
      "edit" => Pages\EditEstimateForm::route("/{record}/edit"),
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
    if (!$repeater || !$currentUUID) {
      return [null, null];
    }

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
