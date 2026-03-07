<?php

namespace App\Filament\Resources\EstimateFormResource\Pages;

use App\Filament\Resources\EstimateFormResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEstimateForm extends EditRecord
{
  protected static string $resource = EstimateFormResource::class;

  protected function getActions(): array
  {
    return [
      Actions\DeleteAction::make(),
      Actions\ForceDeleteAction::make(),
      Actions\RestoreAction::make(),
    ];
  }
}
