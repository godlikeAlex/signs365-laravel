<?php

namespace App\Filament\Resources\ProductAddonsResource\Pages;

use App\Filament\Resources\ProductAddonsResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProductAddons extends EditRecord
{
    protected static string $resource = ProductAddonsResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
