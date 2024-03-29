<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use App\Filament\Resources\ProductAddonsResource;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AddonsRelationManager extends RelationManager
{
  protected static string $relationship = "addons";

  protected static ?string $recordTitleAttribute = "title";

  public static function form(Form $form): Form
  {
    return $form->schema(ProductAddonsResource::inputForm());
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make("title"),
        Tables\Columns\TextColumn::make("condition"),
      ])
      ->filters([Tables\Filters\TrashedFilter::make()])
      ->headerActions([
        Tables\Actions\CreateAction::make(),
        Tables\Actions\AttachAction::make()->preloadRecordSelect(),
      ])
      ->actions([
        Tables\Actions\EditAction::make()->using(function (
          Model $record,
          RelationManager $livewire,
          array $data
        ): Model {
          if ($record->products()->count() === 1) {
            $record->update($data);
            return $record;
          }

          $replicatedModel = $record->replicate([
            "pivot_product_id",
            "pivot_product_addon_id",
            "product_id",
            "product_addon_id",
          ]);
          $replicatedModel->push();
          $replicatedModel->update($data);

          $livewire->ownerRecord->addons()->detach($record->id);
          $livewire->ownerRecord->addons()->attach($replicatedModel->id);

          return $replicatedModel;
        }),
        Tables\Actions\DetachAction::make(),
        Tables\Actions\DeleteAction::make(),
        // Tables\Actions\ForceDeleteAction::make(),
        Tables\Actions\RestoreAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\DeleteBulkAction::make(),
        Tables\Actions\RestoreBulkAction::make(),
        Tables\Actions\ForceDeleteBulkAction::make(),
      ]);
  }

  protected function getTableQuery(): Builder
  {
    return parent::getTableQuery()->withoutGlobalScopes([
      SoftDeletingScope::class,
    ]);
  }
}
