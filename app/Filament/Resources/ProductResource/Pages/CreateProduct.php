<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;

class CreateProduct extends CreateRecord
{
  protected static string $resource = ProductResource::class;

  public function afterCreate()
  {
    if ($this->record->categories->count() > 0) {
      $this->record->targetCategoryForOrder = $this->record->categories->first()->id;
      $this->record->setHighestOrderNumber();

      $this->record->save();
    }
  }
}
