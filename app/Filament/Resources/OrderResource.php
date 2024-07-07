<?php

namespace App\Filament\Resources;

use AlperenErsoy\FilamentExport\Actions\FilamentExportBulkAction;
use App\DTO\CalculatorDTO;
use App\Enums\OptionTypeEnum;
use App\Enums\OrderStatusEnum;
use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\City;
use App\Models\CustomSize;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductAddons;
use App\Models\ProductOption;
use App\Models\ProductPrice;
use App\Models\ProductSize;
use App\Models\ProductVariant;
use App\Models\SizeItem;
use App\Models\User;
use App\Models\Voucher;
use App\Services\CalculatorService;
use Carbon\Carbon;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Contracts\HasForms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\HtmlString;

class OrderResource extends Resource
{
  protected static ?string $model = Order::class;

  protected static ?string $navigationIcon = "heroicon-o-shopping-bag";
  protected static ?string $navigationGroup = "SHOP";

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\Section::make("")
        ->heading("Order Information")
        ->columns(2)
        ->schema([
          Forms\Components\Grid::make("")->schema([
            Forms\Components\Select::make("status")
              ->options(function () {
                return collect(OrderStatusEnum::cases())
                  ->mapWithKeys(fn($enum) => [$enum->value => $enum->name])
                  ->all();
              })
              ->searchable()
              ->required(),
            Forms\Components\Checkbox::make("skipNotification")->default(false),
          ]),

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

          Forms\Components\TextInput::make("supplier_id")
            ->label("Supplier ID")
            ->hiddenOn("create"),

          Forms\Components\TextInput::make("tracking_id")
            ->label("Tracking ID")
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
        ]),

      Forms\Components\Section::make("Voucher")
        ->hidden(fn($get) => !$get("user_id"))
        ->schema([
          Forms\Components\Select::make("voucher_id")
            ->relationship("voucher", "name")
            ->disabled(
              fn(string $context) => $context === "view" || $context === "edit"
            )
            ->options(function (Closure $get, string $context) {
              $user = User::find($get("user"));

              if ($context === "view" || $context === "edit") {
                return Voucher::all()->pluck("name", "id");
              }

              $vouchers = Voucher::usesNotReached()
                ->filter(fn($voucher) => $voucher->isAvailableNow())
                ->filter(
                  fn($voucher) => $user
                    ? !$voucher->userReachedMaximumUses($user)
                    : true
                );

              return $vouchers->pluck("name", "id");
            })
            ->reactive(),
        ]),

      Forms\Components\Section::make("Order Items")->schema([
        // Forms\Components\Toggle::make("update_order")
        //   ->dehydrated(false)
        //   ->default(false)
        //   ->reactive()
        //   ->hidden(fn(string $context) => $context != "edit")
        //   ->hint(
        //     "Updating the order will affect the price at the client if they have changed"
        //   ),
        Forms\Components\Repeater::make("orderItems")
          ->label(false)
          ->disabled(function (\Closure $get, string $context) {
            // if ($context === "edit") {
            // return !$get("update_order");
            // }

            // return true;
          })
          ->relationship()
          ->schema([
            Forms\Components\Select::make("product_id")
              ->relationship("product", "title")
              ->searchable()
              ->preload()
              ->options(Product::all()->pluck("title", "id"))
              ->afterStateUpdated(
                fn(\Closure $set) => $set("product_option_id", null)
              )
              ->reactive()
              ->required(),
            Forms\Components\Select::make("product_option_id")
              ->relationship("productOption", "title")
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
              ->afterStateUpdated(function (\Closure $set, $state) {
                if (!$state) {
                  return;
                }

                $productOption = ProductOption::find($state);

                if (!$productOption) {
                  return;
                }

                if (
                  $productOption->size_for_collect &&
                  !$productOption->sizeList
                ) {
                  $set("width", $productOption->common_data["static_width"]);
                  $set("height", $productOption->common_data["static_height"]);
                }
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
              ->saveRelationshipsUsing(function (
                $component,
                $state,
                $record,
                HasForms $livewire
              ) {
                if (!is_array($state)) {
                  $state = [];
                }

                $relationship = $component->getRelationship();

                $existingRecords = $component->getCachedExistingRecords();

                $recordsToDelete = [];

                foreach (
                  $existingRecords->pluck(
                    $relationship->getRelated()->getKeyName()
                  )
                  as $keyToCheckForDeletion
                ) {
                  if (
                    array_key_exists("record-{$keyToCheckForDeletion}", $state)
                  ) {
                    continue;
                  }

                  $recordsToDelete[] = $keyToCheckForDeletion;
                }

                $relationship
                  ->whereIn(
                    $relationship->getRelated()->getQualifiedKeyName(),
                    $recordsToDelete
                  )
                  ->get()
                  ->each(
                    static fn(Model $relatedRecord) => $record
                      ->productAddons()
                      ->detach($relatedRecord)
                  );

                $childComponentContainers = $component->getChildComponentContainers();

                $dataForSyncRelation = [];

                foreach ($childComponentContainers as $itemKey => $item) {
                  $itemData = $item->getState(shouldCallHooksBefore: true);

                  $dataForSyncRelation[$itemData["product_addons_id"]] = [
                    "quantity" => $itemData["quantity"] ?? 0,
                  ];
                }

                $record->addons()->sync($dataForSyncRelation);
              })
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
                Forms\Components\Select::make("product_addons_id")
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
                  ->searchable()
                  ->reactive()
                  ->required(),

                Forms\Components\TextInput::make("quantity")
                  ->numeric()
                  ->default(1)
                  ->reactive()
                  ->hidden(function (\Closure $get) {
                    $product_addons_id = $get("product_addons_id");

                    if (!$product_addons_id) {
                      return true;
                    }

                    $product_addon = ProductAddons::find($product_addons_id);

                    if (!$product_addon) {
                      return true;
                    }

                    return $product_addon->with_qty ? false : true;
                  }),

                Forms\Components\Placeholder::make("extra_data")
                  ->hiddenOn("create")
                  ->content(function ($record) {
                    if (!$record) {
                      return;
                    }

                    if (
                      !$record->extra_data ||
                      is_null($record->extra_data) ||
                      count($record->extra_data) == 0
                    ) {
                      return;
                    }

                    list($extra_data) = $record->extra_data;

                    $mappedData = array_map(
                      fn($item) => $item["title"],
                      $extra_data["data"]
                    );

                    $selectedString = implode(", ", $mappedData);

                    return new HtmlString(
                      "<h3>Type: {$extra_data["title"]}:</h3> <p>Selected: {$selectedString}</p>"
                    );
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
                    $size = $get("size_item_id");

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
                    fn(TextInput\Mask $mask) => $mask
                      ->numeric()
                      ->decimalPlaces(3)
                  )
                  ->disabled(fn(\Closure $get) => $get("size_item_id"))
                  ->hidden(function (\Closure $get) {
                    $product_id = $get("product_id");
                    $product_option_id = $get("product_option_id");

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
                    fn(TextInput\Mask $mask) => $mask
                      ->numeric()
                      ->decimalPlaces(3)
                  )
                  ->disabled(fn(\Closure $get) => $get("size_item_id"))
                  ->default(1)
                  ->hidden(function (\Closure $get) {
                    $product_id = $get("product_id");
                    $product_option_id = $get("product_option_id");

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

                    $size = $get("size_item_id");

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
                Forms\Components\Select::make("size_item_id")
                  ->relationship("sizeItem", "title")
                  ->reactive()
                  ->hidden(function (\Closure $get) {
                    $productOption = ProductOption::find(
                      $get("product_option_id")
                    );

                    if (!$productOption) {
                      return true;
                    }

                    if ($productOption->sizeList) {
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
                    $size = SizeItem::find($state);

                    if (!$size) {
                      return;
                    }

                    $set("width", (string) $size->width);
                    $set("height", (string) $size->height);
                  })
                  ->options(function (Closure $get) {
                    $productOption = ProductOption::find(
                      $get("product_option_id")
                    );

                    if (!$productOption) {
                      return [];
                    }

                    return $productOption->sizeList->sizeItems->pluck(
                      "label",
                      "id"
                    );
                  }),
              ])
              ->columns(4),

            Forms\Components\Placeholder::make("price_view")
              ->label("Price:")
              ->columnSpanFull()
              ->dehydrated(false)
              ->content(function (
                \Closure $get,
                \Closure $set,
                string $context
              ) {
                // return;
                // dd($context === "edit", $get("../../update_order") === false);

                // $set(
                //   "shipping_price_view",
                //   number_format($get("shipping_price") / 100, 2)
                // );

                // return number_format($get("price") / 100, 2);

                // maybe later
                if (
                  $context === "edit" &&
                  $get("../../update_order") === false
                ) {
                  $set(
                    "shipping_price_view",
                    number_format($get("shipping_price") / 100, 2)
                  );

                  return number_format($get("price") / 100, 2);
                }

                $product_id = $get("product_id");
                $option_id = $get("product_option_id");
                $quantity = $get("quantity");
                $unit = $get("unit") ?? "inches";
                $width = $get("width");
                $height = $get("height");

                $addons = collect($get("addons"))
                  ->values()
                  ->filter(fn($addon) => $addon["product_addons_id"])
                  ->map(
                    fn($addon) => [
                      "id" => $addon["product_addons_id"],
                      "quantity" => $addon["quantity"] ?? 0,
                    ]
                  );

                if (!$product_id || !$option_id) {
                  return;
                }

                $calculatorServiceDTO = new CalculatorDTO(
                  $product_id,
                  $option_id,
                  $width,
                  $height,
                  $quantity,
                  $addons->toArray(),
                  $unit
                );

                $calculator = new CalculatorService();

                list(
                  $priceInCents,
                  $priceInDollars,
                  $shippingPrice,
                ) = $calculator->calculate($calculatorServiceDTO);

                $set("price", $priceInCents);
                $set("shipping_price", $shippingPrice);
                $set(
                  "shipping_price_view",
                  number_format($shippingPrice / 100, 2)
                );

                return $priceInDollars . '$';
              }),

            Forms\Components\TextInput::make("shipping_price_view")
              ->disabled()
              ->dehydrated(false)
              ->columnSpanFull()
              ->hint("Already included in the price")
              ->label("Shipping Price"),
            Forms\Components\Hidden::make("price")
              ->disabled()
              // ->hidden()
              // ->hidden()
              ->reactive(),
            Forms\Components\Hidden::make("shipping_price")
              ->disabled()
              // ->hidden()
              // ->hidden()
              ->reactive(),
            Forms\Components\FileUpload::make("images")
              ->multiple()
              ->columnSpanFull()
              ->hiddenOn("create")
              ->hidden(
                fn($record) => $record &&
                  $record->images &&
                  count($record->images ?? []) === 0
              )
              ->directory("cart")
              ->enableDownload(true)
              ->enableOpen(true)
              ->disablePreview(false),
          ])
          ->columns(3)
          ->columnSpanFull(),
      ]),

      Forms\Components\Section::make("")
        ->heading("Total")
        ->disabled()
        ->columns(3)
        ->schema([
          Forms\Components\Placeholder::make("total_view")
            ->label("Total")
            ->content(function (Closure $get, Closure $set) {
              $totalItems = 0;
              $city_id = $get("city_id");
              $city = City::find($city_id);
              $voucher = Voucher::find($get("voucher_id"));

              if (!$city) {
                return;
              }

              foreach ($get("orderItems") as $orderItem) {
                if ($orderItem["price"]) {
                  $totalItems += $orderItem["price"];
                }
              }

              $tax = $city->tax * $totalItems;
              $total = $tax + $totalItems;
              $discount = 0;

              if ($voucher) {
                $discount = $voucher->getDiscount($total);

                $total -= $discount;
              }

              $taxFormat = number_format($tax / 100, 2) . "$";
              $discountFormat = number_format($discount / 100, 2) . "$";
              $totalFormat = number_format($total / 100, 2) . "$";

              $set("amount", $total);
              $set("tax", $tax);
              $set("voucher_discount", $discount);

              return new HtmlString(
                "
                  <b>Tax</b>: $taxFormat; <br />
                  <b>Discount</b>: $discountFormat; <br/>
                  <b>Amount</b>: $totalFormat;
                "
              );
            }),

          Forms\Components\Hidden::make("amount"),
          Forms\Components\Hidden::make("tax"),
          Forms\Components\Hidden::make("voucher_discount"),
        ]),
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
      // ->defaultSort("created_at", "desc")
      // ->filters([
      //   Tables\Filters\Filter::make("created_at")
      //     ->form([
      //       Forms\Components\DatePicker::make("created_from")->placeholder(
      //         fn($state): string => "Dec 18, " .
      //           now()
      //             ->subYear()
      //             ->format("Y")
      //       ),
      //       Forms\Components\DatePicker::make("created_until")->placeholder(
      //         fn($state): string => now()->format("M d, Y")
      //       ),
      //     ])
      //     ->query(function (Builder $query, array $data): Builder {
      //       return $query
      //         ->when(
      //           $data["created_from"],
      //           fn(Builder $query, $date): Builder => $query->whereDate(
      //             "created_at",
      //             ">=",
      //             $date
      //           )
      //         )
      //         ->when(
      //           $data["created_until"],
      //           fn(Builder $query, $date): Builder => $query->whereDate(
      //             "created_at",
      //             "<=",
      //             $date
      //           )
      //         );
      //     })
      //     ->indicateUsing(function (array $data): array {
      //       $indicators = [];
      //       if ($data["created_from"] ?? null) {
      //         $indicators["created_from"] =
      //           "Order from " .
      //           Carbon::parse($data["created_from"])->toFormattedDateString();
      //       }
      //       if ($data["created_until"] ?? null) {
      //         $indicators["created_until"] =
      //           "Order until " .
      //           Carbon::parse($data["created_until"])->toFormattedDateString();
      //       }

      //       return $indicators;
      //     }),
      //   Tables\Filters\Filter::make("status")
      //     ->form([
      //       Forms\Components\Select::make("status")
      //         ->options(function () {
      //           return collect(OrderStatusEnum::cases())
      //             ->mapWithKeys(fn($enum) => [$enum->value => $enum->name])
      //             ->all();
      //         })
      //         ->searchable(),
      //     ])
      //     ->query(function (Builder $query, array $data) {
      //       if (isset($data["status"])) {
      //         $query->where("status", $data["status"]);
      //       }
      //     }),
      //   Tables\Filters\Filter::make("city_id")
      //     ->form([
      //       Forms\Components\Select::make("city_id")
      //         ->label("City")
      //         ->searchable()
      //         ->options(City::query()->pluck("title", "id")),
      //     ])
      //     ->query(function (Builder $query, array $data) {
      //       if (isset($data["city_id"])) {
      //         $query->where("city_id", $data["city_id"]);
      //       }
      //     }),
      //   Tables\Filters\Filter::make("user_id")
      //     ->form([
      //       Forms\Components\Select::make("user_id")
      //         ->label("User")
      //         ->searchable()
      //         ->options(User::query()->pluck("name", "id")),
      //     ])
      //     ->query(function (Builder $query, array $data) {
      //       if (isset($data["user_id"])) {
      //         $query->where("user_id", $data["user_id"]);
      //       }
      //     }),
      // ])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        FilamentExportBulkAction::make("export"),
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

    $productOption = $product->options()->find($product_option_id);

    if ($productOption->sizeList) {
      return false;
    }

    if ($productOption->size_for_collect) {
      return false;
    }

    if ($productOption) {
      return $productOption->type !== OptionTypeEnum::SQFT;
    } else {
      return true;
    }
  }
}
