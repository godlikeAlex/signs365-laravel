<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\City;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductPrice;
use App\Models\ProductVariant;
use App\Models\User;
use Carbon\Carbon;
use Closure;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class OrderResource extends Resource
{
  protected static ?string $model = Order::class;

  protected static ?string $navigationIcon = "heroicon-o-shopping-bag";
  protected static ?string $navigationGroup = "SHOP";

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\Select::make("status")
        ->options(Order::$ORDERS_STATUSES)
        ->searchable()
        ->default(Order::$ORDERS_STATUSES["pending"])
        ->required(),
      Forms\Components\Select::make("user_id")
        ->searchable()
        ->preload()
        ->reactive()
        ->relationship("user", "name"),

      Forms\Components\TextInput::make("name")
        ->reactive()
        ->hidden(function (Closure $get) {
          return $get("user_id") ? true : false;
        }),
      Forms\Components\TextInput::make("email")
        ->reactive()
        ->hidden(function (Closure $get) {
          return $get("user_id") ? true : false;
        }),
      Forms\Components\TextInput::make("phone"),
      Forms\Components\TextInput::make("address"),
      Forms\Components\TextInput::make("uuid")
        ->label("UUID")
        ->hiddenOn("create"),

      Forms\Components\Select::make("city_id")
        ->afterStateUpdated(function (Closure $set, Closure $get, $state) {
          $repeaterProducts = $get("orderItems");

          foreach ($repeaterProducts as $key => $value) {
            $set("orderItems.${key}.product_id", null);
            $set("orderItems.${key}.product_price_id", null);
            $set("orderItems.${key}.unit_price", 0);
            $set("orderItems.${key}.total_price", 0);
          }
        })
        ->searchable()
        ->preload()
        ->reactive()
        ->helperText(
          "Warning! After choosing a city, all order items will be reset."
        )
        ->relationship("city", "title"),

      Forms\Components\Repeater::make("orderItems")
        ->relationship()
        ->schema([
          Forms\Components\Select::make("product_id")
            ->relationship("product", "title")
            ->preload()
            ->options(function (Closure $get) {
              $city_id = $get("../../city_id");

              return Product::query()
                ->whereHas("cities", function ($query) use ($city_id) {
                  return $query->where("city_id", $city_id);
                })
                ->pluck("title", "id");
            })
            ->reactive()
            ->disabled(function (Closure $get) {
              $cityIsSelected = $get("../../city_id");

              if (is_null($cityIsSelected)) {
                return true;
              } else {
                return false;
              }
            })
            //                            ->afterStateUpdated(fn ($state, callable $set) => $set('total_price', Product::find($state)?->price ?? 0))
            ->required(),
          Forms\Components\Select::make("product_variant_id")
            ->relationship("variant", "label")
            ->label("Product Variant")
            ->disabled(function (Closure $get) {
              $cityIsSelected = $get("../../city_id");

              if (is_null($cityIsSelected)) {
                return true;
              } else {
                return false;
              }
            })
            ->preload()
            ->options(function (\Closure $get) {
              $product_id = $get("product_id");
              $city_id = $get("../../city_id");

              if (!$product_id) {
                return [];
              }

              return Product::query()
                ->find($product_id)
                ->variants()
                ->pluck("label", "id");
            })
            ->afterStateUpdated(function ($state, callable $set, Closure $get) {
              $productVariant = ProductVariant::find(
                $get("product_variant_id")
              );

              if ($productVariant) {
                $productPrice = $productVariant
                  ->prices()
                  ->where("city_id", $get("../../city_id"))
                  ->first();

                $price = $productPrice->price;

                $set("product_price_id", $productPrice->id);

                $qty = $get("quantity") === "" ? 0 : $get("quantity");

                $calculatedWithQty = number_format(
                  ($price * $qty) / 100,
                  2,
                  ".",
                  ""
                );
                $set("total_price", $calculatedWithQty);
                $set("price", $price);
                $set("unit_price", number_format($price / 100, 2, ".", ""));
              }
            })
            ->reactive()
            ->required(),
          Forms\Components\Hidden::make("product_price_id")->reactive(),

          Forms\Components\TextInput::make("quantity")
            ->numeric()
            ->afterStateUpdated(function ($state, callable $set, Closure $get) {
              $productVariant = ProductVariant::find(
                $get("product_variant_id")
              );

              if ($productVariant) {
                $price = $productVariant
                  ->prices()
                  ->where("city_id", $get("../../city_id"))
                  ->first()->price;
                $qty = $get("quantity") === "" ? 0 : $get("quantity");
                $calculatedWithQty = number_format(
                  ($price * $qty) / 100,
                  2,
                  ".",
                  ""
                );

                $set("total_price", $calculatedWithQty);
                $set("price", $price);
                $set("unit_price", number_format($price / 100, 2, ".", ""));
              }
            })
            //                            ->afterStateUpdated(function ($state, callable $set, \Closure $get) {
            //                                $productPrice = ProductPrice::find($get('product_price_id'));
            //
            //                                if ($productPrice) {
            //                                    $price = $productPrice->price;
            //                                    $qty = $get('quantity') === '' ? 0 : $get('quantity');
            //                                    $calculatedWithQty = number_format(
            //                                        ($price * $qty)/ 100,
            //                                        2,
            //                                        '.',
            //                                        ''
            //                                    );
            //
            //                                    $set('total_price',  $calculatedWithQty);
            //                                    $set('price', $price);
            //                                    $set('unit_price', number_format($price / 100, 2, '.', ''));
            //                                }
            //                            })
            ->reactive()
            ->default(1),
          Forms\Components\TextInput::make("unit_price")
            ->prefix('$')
            ->reactive()
            ->dehydrated(false)
            ->label("Price")
            ->disabled()
            ->columnSpan(2)
            ->required(),
          Forms\Components\TextInput::make("total_price")
            ->prefix('$')
            ->reactive()
            ->dehydrated(false)
            ->label("Total Price")
            ->hint("Total with qty")
            ->disabled()
            ->numeric()
            ->required(),
          Forms\Components\Hidden::make("price")
            ->afterStateHydrated(function ($state, Closure $get, Closure $set) {
              $qty = $get("quantity") === "" ? 0 : $get("quantity");
              $calculatedWithQty = number_format(
                ($state * $qty) / 100,
                2,
                ".",
                ""
              );
              $set("total_price", $calculatedWithQty);
              $set("unit_price", number_format($state / 100, 2, ".", ""));
            })
            ->disabled(),
        ])
        ->columns(3)
        ->columnSpanFull(),
      //                Forms\Components\TextInput::make('total')
      //                    ->default(25)
      //                    ->prefix('$')
      //                    ->disabled(),
      //                Forms\Components\TextInput::make('total_with_tax')
      //                    ->default(25)
      //                    ->prefix('$')
      //                    ->disabled()
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("id")
          ->label("ID")
          ->searchable(),
        Tables\Columns\TextColumn::make("uuid")
          ->searchable()
          ->label("UUID"),
        Tables\Columns\TextColumn::make("user.name")
          ->searchable()
          ->label("User")
          ->url(
            fn(Order $record) => $record->user
              ? UserResource::getUrl("edit", [
                "record" => $record->user,
              ])
              : ""
          ),
        Tables\Columns\BadgeColumn::make("status")->colors([
          "danger" => "pending",
          "warning" => fn($state) => in_array($state, ["approved", "process"]),
          "success" => fn($state) => in_array($state, [
            "shipping",
            "completed",
          ]),
        ]),
        Tables\Columns\TextColumn::make("city.title"),
        Tables\Columns\TextColumn::make("total_without_tax")
          ->sortable()
          ->money("usd"),
        Tables\Columns\TextColumn::make("total")
          ->sortable()
          ->color("red")
          ->money("usd"),
        Tables\Columns\TextColumn::make("created_at")
          ->sortable()
          ->date($format = "d/m/Y H:i"),
      ])
      ->defaultSort("created_at", "desc")
      ->filters([
        Tables\Filters\Filter::make("created_at")
          ->form([
            Forms\Components\DatePicker::make("created_from")->placeholder(
              fn($state): string => "Dec 18, " .
                now()
                  ->subYear()
                  ->format("Y")
            ),
            Forms\Components\DatePicker::make("created_until")->placeholder(
              fn($state): string => now()->format("M d, Y")
            ),
          ])
          ->query(function (Builder $query, array $data): Builder {
            return $query
              ->when(
                $data["created_from"],
                fn(Builder $query, $date): Builder => $query->whereDate(
                  "created_at",
                  ">=",
                  $date
                )
              )
              ->when(
                $data["created_until"],
                fn(Builder $query, $date): Builder => $query->whereDate(
                  "created_at",
                  "<=",
                  $date
                )
              );
          })
          ->indicateUsing(function (array $data): array {
            $indicators = [];
            if ($data["created_from"] ?? null) {
              $indicators["created_from"] =
                "Order from " .
                Carbon::parse($data["created_from"])->toFormattedDateString();
            }
            if ($data["created_until"] ?? null) {
              $indicators["created_until"] =
                "Order until " .
                Carbon::parse($data["created_until"])->toFormattedDateString();
            }

            return $indicators;
          }),
        Tables\Filters\Filter::make("status")
          ->form([
            Forms\Components\Select::make("status")
              ->options(Order::$ORDERS_STATUSES)
              ->searchable(),
          ])
          ->query(function (Builder $query, array $data) {
            if (isset($data["status"])) {
              $query->where("status", $data["status"]);
            }
          }),
        Tables\Filters\Filter::make("city_id")
          ->form([
            Forms\Components\Select::make("city_id")
              ->label("City")
              ->searchable()
              ->options(City::query()->pluck("title", "id")),
          ])
          ->query(function (Builder $query, array $data) {
            if (isset($data["city_id"])) {
              $query->where("city_id", $data["city_id"]);
            }
          }),
        Tables\Filters\Filter::make("user_id")
          ->form([
            Forms\Components\Select::make("user_id")
              ->label("User")
              ->searchable()
              ->options(User::query()->pluck("name", "id")),
          ])
          ->query(function (Builder $query, array $data) {
            if (isset($data["user_id"])) {
              $query->where("user_id", $data["user_id"]);
            }
          }),
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
      "index" => Pages\ListOrders::route("/"),
      "create" => Pages\CreateOrder::route("/create"),
      "edit" => Pages\EditOrder::route("/{record}/edit"),
    ];
  }
}
