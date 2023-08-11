<?php

namespace App\Filament\Resources\SizeListResource\Pages;

use App\Filament\Resources\SizeListResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSizeList extends EditRecord
{
    protected static string $resource = SizeListResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
