<?php

namespace App\Filament\Resources;

use App\Enums\OptionTypeEnum;
use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\City;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductAddons;
use App\Models\ProductPrice;
use App\Models\ProductSize;
use App\Models\ProductVariant;
use App\Models\User;
use App\Services\Calculator\Service as Calculator;
use Carbon\Carbon;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Notification;

use function PHPUnit\Framework\isNull;

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
        ->unique(ignoreRecord: true)
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
            ->options(Product::all()->pluck("title", "id"))
            ->reactive()
            ->required(),
          Forms\Components\Select::make("product_option_id")
            ->relationship("option", "title")
            ->label("Option")
            ->disabled(function (Closure $get) {
              $productIsSelected = $get("product_id");

              if (is_null($productIsSelected)) {
                return true;
              } else {
                return false;
              }
            })
            ->preload()
            ->options(function (\Closure $get) {
              $product_id = $get("product_id");

              if (!$product_id) {
                return [];
              }

              return Product::query()
                ->find($product_id)
                ->options()
                ->get()
                ->pluck("title", "id");
            })
            ->reactive()
            ->required(),
          Forms\Components\TextInput::make("quantity")
            ->numeric()
            ->mask(
              fn(TextInput\Mask $mask) => $mask
                ->numeric()
                ->integer() // Disallow decimal numbers.
                ->minValue(1) // Set the minimum value that the number can be.
            )
            ->default(1)
            ->reactive()
            ->minValue(1)
            ->required(),
          Forms\Components\Repeater::make("addons")
            ->relationship("addons")
            ->columnSpanFull()
            ->hidden(function (Closure $get) {
              $productIsSelected = $get("product_id");

              if ($productIsSelected) {
                return false;
              } else {
                return true;
              }
            })
            ->schema([
              Forms\Components\Select::make("product_addon_id")
                ->required()
                ->options(function (\Closure $get) {
                  $product_id = $get("../../product_id");
                  $product_option_id = $get("../../product_option_id");

                  if (!$product_id || !$product_option_id) {
                    return [];
                  }

                  $productOption = Product::query()
                    ->find($product_id)
                    ->options()
                    ->find($product_option_id);

                  if (!$productOption) {
                    return [];
                  }

                  return $productOption->addons->pluck("title", "id");
                })
                ->reactive()
                ->required(),

              Forms\Components\TextInput::make("quantity")
                ->numeric()
                ->default(1)
                ->reactive()
                ->hidden(function (\Closure $get) {
                  $product_addon_id = $get("product_addon_id");

                  info($product_addon_id);

                  if (!$product_addon_id) {
                    return true;
                  }

                  $product_addon = ProductAddons::find($product_addon_id);

                  if (!$product_addon) {
                    return true;
                  }

                  return $product_addon->with_qty ? false : true;
                }),
            ]),

          Grid::make()
            ->schema([
              Forms\Components\Select::make("unit")
                ->options(["inches" => "Inches", "feet" => "Feet"])
                ->default("inches")
                ->searchable()
                ->hidden(function (\Closure $get) {
                  $product_id = $get("product_id");
                  $product_option_id = $get("product_option_id");
                  $size = $get("size");

                  if ($size) {
                    return true;
                  }

                  return static::showOnlyForSqftOrSizes(
                    $product_id,
                    $product_option_id
                  );
                })
                ->reactive()
                ->required(),
              Forms\Components\TextInput::make("width")
                ->numeric()
                ->mask(
                  fn(TextInput\Mask $mask) => $mask->numeric()->decimalPlaces(3)
                )
                ->hidden(function (\Closure $get) {
                  $product_id = $get("product_id");
                  $product_option_id = $get("product_option_id");
                  $size = $get("size");

                  if ($size) {
                    return true;
                  }

                  return static::showOnlyForSqftOrSizes(
                    $product_id,
                    $product_option_id
                  );
                })
                ->default(1)
                ->reactive()
                ->required(),
              Forms\Components\TextInput::make("height")
                ->numeric()
                ->mask(
                  fn(TextInput\Mask $mask) => $mask->numeric()->decimalPlaces(3)
                )
                ->disabled(fn(\Closure $get) => $get("size"))
                ->default(1)
                ->hidden(function (\Closure $get) {
                  $product_id = $get("product_id");
                  $product_option_id = $get("product_option_id");

                  $size = $get("size");

                  if ($size) {
                    return true;
                  }

                  return static::showOnlyForSqftOrSizes(
                    $product_id,
                    $product_option_id
                  );
                })
                ->reactive()
                ->required(),
              Forms\Components\Placeholder::make("sqft")
                ->hidden(function (\Closure $get) {
                  $product_id = $get("product_id");
                  $product_option_id = $get("product_option_id");

                  $size = $get("size");

                  if ($size) {
                    return true;
                  }

                  return static::showOnlyForSqftOrSizes(
                    $product_id,
                    $product_option_id
                  );
                })
                ->label("SQFT")
                ->reactive()
                ->content(function (\Closure $get) {
                  $unit = $get("unit");
                  $width = $get("width");
                  $height = $get("height");

                  $sqft = $width * $height;

                  return round($unit === "feet" ? $sqft : $sqft / 144, 2);
                }),
              Forms\Components\Select::make("size")
                ->reactive()
                ->hidden(function (\Closure $get) {
                  $product = Product::find($get("product_id"));

                  if (!$product) {
                    return true;
                  }

                  if ($product->sizes()->count() >= 1) {
                    return false;
                  } else {
                    return true;
                  }
                })
                ->afterStateUpdated(function (
                  \Closure $set,
                  \Closure $get,
                  $state
                ) {
                  $size = ProductSize::find($state);

                  if (!$size) {
                    return;
                  }

                  $set("width", (string) $size->width);
                  $set("height", (string) $size->height);
                })
                ->options(function (Closure $get) {
                  $product = Product::find($get("product_id"));

                  if (!$product) {
                    return [];
                  }

                  return $product->sizes()->pluck("label", "id");
                }),
            ])
            ->columns(4),

          Forms\Components\Placeholder::make("price")
            ->label("Price:")
            ->columnSpanFull()
            ->content(function (\Closure $get) {
              $product_id = $get("product_id");
              $option_id = $get("product_option_id");
              $quantity = $get("quantity");
              $unit = $get("unit");
              $width = $get("width");
              $height = $get("height");

              $addons = collect($get("addons"))
                ->values()
                ->filter(fn($addon) => $addon["product_addon_id"])
                ->map(fn($addon) => ["id" => $addon["product_addon_id"]]);

              if (!$product_id || !$option_id) {
                return;
              }

              $calculator = new Calculator(
                $product_id,
                $width,
                $height,
                $addons,
                $option_id,
                unit: $unit,
                quantity: $quantity
              );

              list($priceInCents, $priceInDollars) = $calculator->calculate();

              return $priceInDollars . '$';
            }),
        ])
        ->columns(3)
        ->columnSpanFull(),
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

  public static function showOnlyForSqftOrSizes($product_id, $product_option_id)
  {
    if (!$product_id || !$product_option_id) {
      return true;
    }
    $product = Product::query()->find($product_id);

    if ($product->sizes()->count()) {
      return false;
    }

    $productOption = $product->options()->find($product_option_id);

    if ($productOption) {
      return $productOption->type !== OptionTypeEnum::SQFT;
    } else {
      return true;
    }
  }
}
