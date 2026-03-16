<?php

namespace App\Filament\Resources;

use App\Enums\AddonTypeEnum;
use App\Filament\Resources\EstimateFieldOptionResource\Pages;
use App\Models\EstimateField;
use App\Models\EstimateFieldOption;
use App\Models\EstimateForm;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EstimateFieldOptionResource extends Resource
{
  protected static ?string $model = EstimateFieldOption::class;

  protected static ?string $navigationIcon = "heroicon-o-adjustments";
  protected static ?string $navigationGroup = "SHOP";
  protected static ?string $navigationLabel = "Estimate Option Bulk";
  protected static ?int $navigationSort = 7;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\Select::make("estimate_field_id")
        ->label("Field")
        ->relationship("field", "title")
        ->searchable()
        ->preload()
        ->required(),
      Forms\Components\TextInput::make("title")
        ->required()
        ->maxLength(255),
      Forms\Components\Select::make("type")
        ->required()
        ->options(
          collect([
            AddonTypeEnum::FEE,
            AddonTypeEnum::SQFT,
            AddonTypeEnum::LINEAR_FOOT,
          ])
            ->mapWithKeys(fn($enum) => [$enum->value => $enum->value])
            ->all()
        ),
      Forms\Components\TextInput::make("condition")
        ->required()
        ->maxLength(255),
      Forms\Components\Textarea::make("disclaimer")->rows(2),
      Forms\Components\Toggle::make("is_active")->default(true),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("title")
          ->label("Option")
          ->searchable(),
        Tables\Columns\TextColumn::make("field.title")
          ->label("Field")
          ->searchable(),
        Tables\Columns\TextColumn::make("field.form.title")
          ->label("Form")
          ->searchable(),
        Tables\Columns\TextColumn::make("type"),
        Tables\Columns\TextColumn::make("condition"),
        Tables\Columns\TextColumn::make("disclaimer")
          ->limit(40)
          ->toggleable(),
        Tables\Columns\IconColumn::make("is_active")->boolean(),
      ])
      ->filters([
        Tables\Filters\SelectFilter::make("estimate_form_id")
          ->label("Form")
          ->multiple()
          ->options(
            EstimateForm::query()
              ->orderBy("title")
              ->pluck("title", "id")
              ->all()
          )
          ->query(function (Builder $query, array $data) {
            $values = $data["values"] ?? [];

            if (count($values) === 0) {
              return;
            }

            $query->whereHas("field", function (Builder $q) use ($values) {
              $q->whereIn("estimate_form_id", $values);
            });
          }),
        Tables\Filters\SelectFilter::make("estimate_field_id")
          ->label("Field")
          ->multiple()
          ->options(
            EstimateField::query()
              ->orderBy("title")
              ->pluck("title", "id")
              ->all()
          )
          ->query(function (Builder $query, array $data) {
            $values = $data["values"] ?? [];

            if (count($values) === 0) {
              return;
            }

            $query->whereIn("estimate_field_id", $values);
          }),
        Tables\Filters\TernaryFilter::make("is_active")->label("Active"),
        Tables\Filters\TrashedFilter::make(),
      ])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([
        Tables\Actions\BulkAction::make("setCondition")
          ->label("Set condition")
          ->icon("heroicon-o-calculator")
          ->requiresConfirmation()
          ->form([
            TextInput::make("condition")
              ->required()
              ->helperText("Examples: +200%, +100, 3 (for sqft/linear_foot)"),
          ])
          ->action(function (Collection $records, array $data) {
            $updated = 0;

            foreach ($records as $record) {
              $record->update(["condition" => $data["condition"]]);
              $updated++;
            }

            Notification::make()
              ->title("Condition updated")
              ->body("Updated {$updated} option(s).")
              ->success()
              ->send();
          }),
        Tables\Actions\BulkAction::make("setDisclaimer")
          ->label("Set disclaimer")
          ->icon("heroicon-o-document-text")
          ->requiresConfirmation()
          ->form([
            Forms\Components\Textarea::make("disclaimer")
              ->rows(3)
              ->required(),
          ])
          ->action(function (Collection $records, array $data) {
            $updated = 0;

            foreach ($records as $record) {
              $record->update(["disclaimer" => $data["disclaimer"]]);
              $updated++;
            }

            Notification::make()
              ->title("Disclaimer updated")
              ->body("Updated {$updated} option(s).")
              ->success()
              ->send();
          }),
        Tables\Actions\BulkAction::make("activate")
          ->label("Activate")
          ->color("success")
          ->requiresConfirmation()
          ->action(function (Collection $records) {
            $count = 0;

            foreach ($records as $record) {
              $record->update(["is_active" => true]);
              $count++;
            }

            Notification::make()
              ->title("Options activated")
              ->body("Activated {$count} option(s).")
              ->success()
              ->send();
          }),
        Tables\Actions\BulkAction::make("deactivate")
          ->label("Deactivate")
          ->color("danger")
          ->requiresConfirmation()
          ->action(function (Collection $records) {
            $count = 0;

            foreach ($records as $record) {
              $record->update(["is_active" => false]);
              $count++;
            }

            Notification::make()
              ->title("Options deactivated")
              ->body("Deactivated {$count} option(s).")
              ->success()
              ->send();
          }),
        Tables\Actions\BulkAction::make("addMissingOptionToSelectedForms")
          ->label("Add missing option to selected forms")
          ->icon("heroicon-o-plus-circle")
          ->requiresConfirmation()
          ->form([
            Select::make("field_id")
              ->label("Target field")
              ->required()
              ->searchable()
              ->options(
                EstimateField::query()
                  ->orderBy("title")
                  ->pluck("title", "id")
                  ->all()
              ),
            TextInput::make("title")->required(),
            Select::make("type")
              ->required()
              ->options(
                collect([
                  AddonTypeEnum::FEE,
                  AddonTypeEnum::SQFT,
                  AddonTypeEnum::LINEAR_FOOT,
                ])
                  ->mapWithKeys(fn($enum) => [$enum->value => $enum->value])
                  ->all()
              ),
            TextInput::make("condition")->required(),
            Forms\Components\Textarea::make("disclaimer")->rows(2),
          ])
          ->action(function (Collection $records, array $data) {
            $sourceField = EstimateField::query()->find($data["field_id"]);

            if (!$sourceField) {
              Notification::make()
                ->title("Field not found")
                ->danger()
                ->send();
              return;
            }

            $targetFormIDs = $records
              ->map(
                fn(EstimateFieldOption $option) => $option->field
                  ?->estimate_form_id
              )
              ->filter()
              ->unique()
              ->values()
              ->all();

            $added = 0;
            $skipped = 0;
            $noField = 0;

            foreach ($targetFormIDs as $formID) {
              $targetField = EstimateField::query()
                ->where("estimate_form_id", $formID)
                ->where("title", $sourceField->title)
                ->first();

              if (!$targetField) {
                $noField++;
                continue;
              }

              $exists = EstimateFieldOption::query()
                ->where("estimate_field_id", $targetField->id)
                ->where("title", $data["title"])
                ->exists();

              if ($exists) {
                $skipped++;
                continue;
              }

              EstimateFieldOption::query()->create([
                "estimate_field_id" => $targetField->id,
                "title" => $data["title"],
                "type" => $data["type"],
                "condition" => $data["condition"],
                "disclaimer" => $data["disclaimer"] ?? null,
                "is_active" => true,
              ]);

              $added++;
            }

            Notification::make()
              ->title("Add missing option finished")
              ->body(
                "Added: {$added}, skipped(existing): {$skipped}, skipped(no field): {$noField}."
              )
              ->success()
              ->send();
          }),
        Tables\Actions\DeleteBulkAction::make(),
      ]);
  }

  public static function getRelations(): array
  {
    return [];
  }

  public static function getPages(): array
  {
    return [
      "index" => Pages\ListEstimateFieldOptions::route("/"),
      "create" => Pages\CreateEstimateFieldOption::route("/create"),
      "edit" => Pages\EditEstimateFieldOption::route("/{record}/edit"),
    ];
  }

  public static function getEloquentQuery(): Builder
  {
    return parent::getEloquentQuery()
      ->with(["field:id,estimate_form_id,title", "field.form:id,title"])
      ->withoutGlobalScopes([SoftDeletingScope::class]);
  }
}
