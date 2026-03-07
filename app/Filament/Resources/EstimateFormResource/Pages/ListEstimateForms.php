<?php

namespace App\Filament\Resources\EstimateFormResource\Pages;

use App\Filament\Resources\EstimateFormResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEstimateForms extends ListRecords
{
  protected static string $resource = EstimateFormResource::class;

  protected function getActions(): array
  {
    return [Actions\CreateAction::make()];
  }
}
