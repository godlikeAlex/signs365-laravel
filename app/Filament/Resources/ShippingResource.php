<?php

namespace App\Filament\Resources;

use App\Enums\ShippingTypeEnum;
use App\Filament\Resources\ShippingResource\Pages;
use App\Filament\Resources\ShippingResource\RelationManagers;
use App\Models\Shipping;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ShippingResource extends Resource
{
  protected static ?string $model = Shipping::class;

  protected static ?string $navigationIcon = "heroicon-o-collection";

  static function inputForm(): array
  {
    return [
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
            ->hidden(function (Closure $get) {
              $currentType = $get("../type");
              if (!$currentType) {
                return true;
              }

              return ShippingTypeEnum::from($currentType) !==
                ShippingTypeEnum::WIDTHxHEIGHT;
            })
            ->schema([
              Forms\Components\TextInput::make("from"),
              Forms\Components\TextInput::make("to"),
              Forms\Components\TextInput::make("price")
                ->required()
                ->numeric()
                ->dehydrateStateUsing(fn($state) => $state * 100)
                ->afterStateHydrated(function (TextInput $component, $state) {
                  $component->state($state / 100);
                }),
            ]),
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
        Tables\Columns\TextColumn::make("type"),
        Tables\Columns\TextColumn::make("condition"),
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

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListShippings::route("/"),
      "create" => Pages\CreateShipping::route("/create"),
      "edit" => Pages\EditShipping::route("/{record}/edit"),
    ];
  }
}
