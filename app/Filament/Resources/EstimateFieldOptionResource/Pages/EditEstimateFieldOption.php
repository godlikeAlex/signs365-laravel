<?php

namespace App\Filament\Resources\EstimateFieldOptionResource\Pages;

use App\Filament\Resources\EstimateFieldOptionResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEstimateFieldOption extends EditRecord
{
  protected static string $resource = EstimateFieldOptionResource::class;

  protected function getActions(): array
  {
    return [
      Actions\DeleteAction::make(),
      Actions\ForceDeleteAction::make(),
      Actions\RestoreAction::make(),
    ];
  }
}
