<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use App\Filament\Resources\EstimateFormResource;
use App\Models\EstimateForm;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EstimateFormsRelationManager extends RelationManager
{
  protected static string $relationship = "estimateForms";

  protected static ?string $recordTitleAttribute = "title";

  protected static ?string $title = "Estimate Forms";

  public static function form(Form $form): Form
  {
    return $form->schema(EstimateFormResource::inputForm());
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
      ->headerActions([
        Tables\Actions\CreateAction::make()->mutateFormDataUsing(function (
          array $data,
          RelationManager $livewire
        ): array {
          $data["owner_product_id"] = $livewire->ownerRecord->id;

          return $data;
        }),
        Tables\Actions\AttachAction::make()->preloadRecordSelect(),
      ])
      ->actions([
        Tables\Actions\EditAction::make()->using(function (
          Model $record,
          RelationManager $livewire,
          array $data
        ): Model {
          if (
            (int) ($record->owner_product_id ?? 0) ===
            (int) $livewire->ownerRecord->id
          ) {
            $record->update($data);
            return $record;
          }

          /** @var EstimateForm $replicatedModel */
          $replicatedModel = self::cloneEstimateForm(
            $record,
            (int) $livewire->ownerRecord->id
          );

          $replicatedModel->update($data);

          $livewire->ownerRecord->estimateForms()->detach($record->id);
          $livewire->ownerRecord->estimateForms()->attach($replicatedModel->id);

          return $replicatedModel;
        }),
        Tables\Actions\DetachAction::make(),
        Tables\Actions\DeleteAction::make(),
        Tables\Actions\RestoreAction::make(),
      ])
      ->reorderable("order_column")
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
      ]);
  }

  protected function getTableQuery(): Builder
  {
    return parent::getTableQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }

  private static function cloneEstimateForm(
    Model $record,
    int $ownerProductID
  ): EstimateForm {
    /** @var EstimateForm $record */
    $record->loadMissing(["fields.options"]);

    $replicatedForm = new EstimateForm();
    $replicatedForm->fill([
      "title" => $record->title,
      "icon" => $record->icon,
      "color" => $record->color,
      "price" => $record->price,
      "type" => $record->type,
      "min_price" => $record->min_price,
      "range_prices" => $record->range_prices,
      "per_quantity_prices" => $record->per_quantity_prices,
      "sort" => $record->sort,
      "is_active" => $record->is_active,
    ]);
    $replicatedForm->owner_product_id = $ownerProductID;
    $replicatedForm->save();

    foreach ($record->fields as $field) {
      $replicatedField = $field->newModelInstance();
      $replicatedField->fill([
        "title" => $field->title,
        "field_type" => $field->field_type,
        "condition" => $field->condition,
        "type" => $field->type,
        "order_column" => $field->order_column,
        "is_required" => $field->is_required,
        "cart_label" => $field->cart_label,
        "is_active" => $field->is_active,
        "disclaimer" => $field->disclaimer,
      ]);
      $replicatedField->estimate_form_id = $replicatedForm->id;
      $replicatedField->save();

      foreach ($field->options as $option) {
        $replicatedOption = $option->newModelInstance();
        $replicatedOption->fill([
          "title" => $option->title,
          "condition" => $option->condition,
          "min_price" => $option->min_price,
          "type" => $option->type,
          "disclaimer" => $option->disclaimer,
          "extra_inputs" => $option->extra_inputs,
          "order_column" => $option->order_column,
          "is_active" => $option->is_active,
        ]);
        $replicatedOption->estimate_field_id = $replicatedField->id;
        $replicatedOption->save();
      }
    }

    return $replicatedForm;
  }
}
