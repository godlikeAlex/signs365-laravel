<?php

namespace App\Filament\Resources\EstimateFieldOptionResource\Pages;

use App\Filament\Resources\EstimateFieldOptionResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEstimateFieldOptions extends ListRecords
{
  protected static string $resource = EstimateFieldOptionResource::class;

  protected function getActions(): array
  {
    return [Actions\CreateAction::make()];
  }
}
