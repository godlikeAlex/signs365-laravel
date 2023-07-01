<?php

namespace App\Filament\Resources\ProductOptionResource\Pages;

use App\Filament\Resources\ProductOptionResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProductOption extends EditRecord
{
    protected static string $resource = ProductOptionResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
