<?php

namespace App\Filament\Resources\ProductCategoryResource\Pages;

use App\Filament\Resources\ProductCategoryResource;
use Filament\Forms\Components\TextInput;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProductCategory extends EditRecord
{
  protected static string $resource = ProductCategoryResource::class;
  protected static ?string $title = 'Edit Category';

  protected function getRedirectUrl(): string
  {
    return $this->getResource()::getUrl('index');
  }

  protected function getActions(): array
  {
    return [
      Actions\DeleteAction::make(),
    ];
  }
}
