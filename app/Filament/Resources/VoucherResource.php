<?php

namespace App\Filament\Resources;

use Akaunting\Money\Currency;
use Akaunting\Money\Money;
use App\Enums\VoucherTypeEnum;
use App\Filament\Resources\VoucherResource\Pages;
use App\Filament\Resources\VoucherResource\RelationManagers;
use App\Models\Voucher;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;
use Tapp\FilamentTimezoneField\Forms\Components\TimezoneSelect;

class VoucherResource extends Resource
{
  protected static ?string $model = Voucher::class;

  protected static ?string $navigationIcon = "heroicon-o-gift";

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\TextInput::make("name")
        ->required()
        ->unique(ignoreRecord: true)
        ->maxLength(255),
      Forms\Components\TextInput::make("code")
        ->default(fn() => Str::upper(Str::random(6)))
        ->hint(function () {
          return new HtmlString(
            '
            <div class="flex flex-wrap space-x-2">
                <span wire:click="$set(\'data.code\', \'' .
              Str::upper(Str::random(6)) .
              '\')" class="font-medium h- px-2 py-0.5 rounded-xl bg-primary-500 text-white text-xs tracking-tight mt-[10px] cursor-pointer">
                    Random
                </span>
            </div>
        '
          );
        })
        ->unique(ignoreRecord: true),
      //   Forms\Components\Textarea::make("description")->maxLength(65535),

      Forms\Components\Select::make("type")
        ->options(fn() => VoucherTypeEnum::toArray())
        ->required(),

      Forms\Components\Card::make()->schema([
        Forms\Components\Toggle::make("is_fixed")
          ->required()
          ->label("Is Fixed")
          ->columnSpanFull()
          ->reactive(),
        Forms\Components\TextInput::make("discount_amount")
          ->hidden(function (\Closure $get) {
            return !$get("is_fixed");
          })
          ->dehydrateStateUsing(fn($state) => $state * 100)
          ->afterStateHydrated(function (TextInput $component, $state) {
            $component->state($state / 100);
          })
          ->numeric()
          ->minValue(0)
          ->postfix("$")
          ->required(),
        Forms\Components\TextInput::make("discount_percent")
          ->hidden(fn(\Closure $get) => $get("is_fixed"))
          ->postfix("%")
          ->numeric()
          ->minValue(0)
          ->required(),
      ]),

      Forms\Components\Section::make("Limits")
        ->schema([
          Forms\Components\TextInput::make("max_uses")->numeric(),
          Forms\Components\TextInput::make("max_uses_user")->numeric(),
          Forms\Components\TextInput::make("min_price")
            ->postfix('$')
            ->dehydrateStateUsing(fn($state) => $state * 100)
            ->afterStateHydrated(function (TextInput $component, $state) {
              $component->state($state / 100);
            })
            ->helperText("At what price can the promo code be used?")
            ->numeric(),
        ])
        ->columns(2),

      Forms\Components\Section::make("Dates")
        ->schema([
          TimezoneSelect::make("timezone")
            ->searchable()
            ->required()
            ->columnSpanFull()
            ->reactive(),
          Forms\Components\DateTimePicker::make("starts_at")
            ->timezone(fn(\Closure $get) => $get("timezone"))
            ->required(),
          Forms\Components\DateTimePicker::make("expires_at")
            ->timezone(fn(\Closure $get) => $get("timezone"))
            ->reactive(),
        ])
        ->columns(2),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("code"),
        Tables\Columns\TextColumn::make("name"),
        // Tables\Columns\TextColumn::make("type"),
        Tables\Columns\TextColumn::make("uses"),
        // Tables\Columns\TextColumn::make("max_uses"),
        // Tables\Columns\TextColumn::make("max_uses_user"),
        Tables\Columns\IconColumn::make("is_fixed")->boolean(),

        Tables\Columns\TextColumn::make("discount")->formatStateUsing(function (
          Voucher $record
        ) {
          if ($record->is_fixed) {
            return (new Money(
              $record->discount_amount,
              new Currency("USD")
            ))->format();
          } else {
            return "-$record->discount_percent%";
          }
        }),
        // Tables\Columns\TextColumn::make("starts_at")->dateTime(),
        // Tables\Columns\TextColumn::make("expires_at")->dateTime(),
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
      "index" => Pages\ListVouchers::route("/"),
      "create" => Pages\CreateVoucher::route("/create"),
      "edit" => Pages\EditVoucher::route("/{record}/edit"),
    ];
  }
}
