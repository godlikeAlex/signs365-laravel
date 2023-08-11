<?php

namespace App\Filament\Resources\SizeListResource\Pages;

use App\Filament\Resources\SizeListResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSizeLists extends ListRecords
{
    protected static string $resource = SizeListResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
