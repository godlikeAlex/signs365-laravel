<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Filament\Resources\ProductResource\RelationManagers\AddonsRelationManager;
use App\Filament\Resources\ProductResource\RelationManagers\EstimateFormsRelationManager;
use App\Filament\Resources\ProductResource\RelationManagers\OptionsRelationManager;
use App\Models\Product;
use App\Models\ProductCategory;
use Awcodes\Curator\Components\Forms\CuratorPicker;
use Awcodes\Curator\Components\Tables\CuratorColumn;
use Awcodes\Curator\CurationPreset;
use Awcodes\Curator\Curator;
use Awcodes\Curator\Facades\Curator as FacadesCurator;
// use Awcodes\Curator\Facades\Curator as FacadesCurator;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Awcodes\Curator\GliderFallback;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Filters\Layout;
use Illuminate\Support\HtmlString;
use Livewire;

class ProductResource extends Resource
{
  protected static ?string $model = Product::class;

  protected static ?string $navigationIcon = "heroicon-o-lightning-bolt";
  protected static ?string $navigationGroup = "SHOP";
  protected static ?string $navigationLabel = "Products";

  public static function productForm(): array
  {
    return [
      Forms\Components\Tabs::make("Heading")
        ->columnSpanFull()
        ->tabs([
          Forms\Components\Tabs\Tab::make("Product Information")
            ->icon("heroicon-s-information-circle")
            ->schema([
              Forms\Components\TextInput::make("title")
                ->required()
                ->reactive()
                ->afterStateUpdated(function (Closure $set, $state) {
                  $set("slug", Str::slug($state));
                  $set("seo_title", $state);
                })
                ->maxLength(50),
              Forms\Components\TextInput::make("slug")
                ->required()
                ->unique(table: Product::class, ignoreRecord: true)
                ->maxLength(75),
              Forms\Components\TextInput::make("short_description"),
              Forms\Components\RichEditor::make("description")
                ->columnSpan("full")
                ->reactive(),
              // Forms\Components\TextInput::make("order")
              //   ->label("Order in list")
              //   ->minValue(1)
              //   ->columnSpan("full"),

              Forms\Components\Select::make("faq_id")->relationship(
                "faq",
                "title"
              ),

              Forms\Components\Select::make("categories")
                ->multiple()
                ->maxItems(1)
                ->required()
                ->relationship("categories", "title")
                ->preload(),

              // Forms\Components\Placeholder::make("faq")->content(
              // "<h1>Hello world  </h1>"
              // ),

              Toggle::make("with_checkout")
                ->reactive()
                ->hint(
                  fn($state) => $state
                    ? ""
                    : "Prices will appear at the bottom after saving the product"
                )
                ->default(true),
              Toggle::make("is_estimate")
                ->label("Estimate product")
                ->helperText("Enable estimate forms and estimate cart flow")
                ->default(false),

              Toggle::make("published")
                ->columnSpanFull()
                ->reactive()
                ->visibleOn("edit")
                ->default(false),
            ]),

          Forms\Components\Tabs\Tab::make("Product Assets")
            ->icon("heroicon-s-photograph")
            ->schema([
              CuratorPicker::make("product_picture_ids")
                ->label("Product assets")
                ->multiple()
                ->relationship("images", "id")
                ->orderColumn("order"),

              Section::make("Video")->schema([
                Forms\Components\FileUpload::make("video")
                  ->label("Video")
                  ->acceptedFileTypes(["video/mp4"])
                  ->nullable(),
                Forms\Components\FileUpload::make("video_cover")
                  ->label("Video Cover")
                  ->nullable(),
              ]),
              // Forms\Components\FileUpload::make("images")
              //   ->columnSpanFull()
              //   ->enableDownload()
              //   ->multiple()
              //   ->enableReordering()
              //   ->directory("products"),
            ]),

          Forms\Components\Tabs\Tab::make("SEO")
            ->icon("heroicon-s-search")
            ->schema([
              Forms\Components\TextInput::make("seo_title")->label("Title"),

              Forms\Components\Textarea::make("seo_description")->label(
                "Description"
              ),
              // ->maxLength(249),

              Forms\Components\TextArea::make("seo_keywords")->label(
                "Keywords"
              ),
              Forms\Components\TextArea::make("seo_schema")
                ->columnSpan("full")
                ->reactive(),
            ]),
        ]),
    ];
  }

  public static function form(Form $form): Form
  {
    return $form->schema(static::productForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("order")->searchable(),
        Tables\Columns\TextColumn::make("title")->searchable(),
        Tables\Columns\IconColumn::make("is_estimate")->boolean(),
        // Tables\Columns\TextColumn::make("prices_min_price")
        //   ->label("Start Price")
        //   ->min("prices", "price")
        //   ->sortable()
        //   ->money("usd"),
        Tables\Columns\IconColumn::make("published")->boolean(),
        // ->sortable(),
        Tables\Columns\TagsColumn::make("categories.title")->separator(","),
      ])
      ->filters(
        [
          Tables\Filters\TrashedFilter::make()->columnSpan(10),
          Tables\Filters\Filter::make("product_category")
            ->columnSpan(10)
            ->form([
              Forms\Components\Radio::make("product_category")
                ->label("Category")
                ->inline()
                ->default(
                  ProductCategory::query()
                    ->orderBy("menu_order")
                    ->first()->id
                )
                ->options(
                  ProductCategory::query()
                    ->orderBy("menu_order")
                    ->pluck("title", "id")
                ),
              // Forms\Components\Select::make("product_category")
              //   ->options(ProductCategory::all()->pluck("title", "id"))
              //   ->searchable(),
            ])
            ->query(function (Builder $query, array $data) {
              if (isset($data["product_category"])) {
                // ->productCategories()
                // ->find($data["product_category"]);
                return $query->whereHas("productCategories", function (
                  Builder $qCategories
                ) use ($data) {
                  $qCategories->where(
                    "product_categories.id",
                    $data["product_category"]
                  );
                });
              }
            }),
        ],
        layout: Layout::AboveContent
      )
      ->defaultSort("order")
      ->actions([
        Tables\Actions\Action::make("up")
          ->icon("heroicon-o-arrow-up")
          ->action(function (Product $record, HasTable $livewire) {
            $productCategoryID = $livewire->getTableFilterState(
              "product_category"
            )["product_category"];
            $record->targetCategoryForOrder = $productCategoryID;

            $record->moveOrderUp();
          }),
        Tables\Actions\Action::make("down")
          ->icon("heroicon-o-arrow-down")
          ->action(function (Product $record, HasTable $livewire) {
            $productCategoryID = $livewire->getTableFilterState(
              "product_category"
            )["product_category"];
            $record->targetCategoryForOrder = $productCategoryID;

            $record->moveOrderDown();
          }),
        Tables\Actions\EditAction::make(),
        Tables\Actions\DeleteAction::make(),
        // Tables\Actions\ForceDeleteAction::make(),
        Tables\Actions\RestoreAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        // Tables\Actions\ForceDeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
      ]);
  }

  public static function getEloquentQuery(): Builder
  {
    return parent::getEloquentQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }

  public static function getRelations(): array
  {
    return [OptionsRelationManager::class, EstimateFormsRelationManager::class];
  }

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListProducts::route("/"),
      "create" => Pages\CreateProduct::route("/create"),
      "edit" => Pages\EditProduct::route("/{record}/edit"),
    ];
  }
}
