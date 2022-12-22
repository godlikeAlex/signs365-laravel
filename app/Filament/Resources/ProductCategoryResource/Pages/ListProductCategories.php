<?php

namespace App\Filament\Resources\ProductCategoryResource\Pages;

use App\Filament\Resources\ProductCategoryResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProductCategories extends ListRecords
{
    protected static string $resource = ProductCategoryResource::class;
    protected static ?string $title = 'Categories';

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
