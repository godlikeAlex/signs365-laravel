<?php

namespace App\Filament\Resources\ProductAddonsResource\Pages;

use App\Filament\Resources\ProductAddonsResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProductAddons extends ListRecords
{
    protected static string $resource = ProductAddonsResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
