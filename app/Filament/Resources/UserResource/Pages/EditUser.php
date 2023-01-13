<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Hash;

class EditUser extends EditRecord
{
  protected static string $resource = UserResource::class;

  protected function mutateFormDataBeforeSave(array $data): array
  {
    if ($data['password']) {
      $data['password'] = Hash::make($data['password']);
    } else {
      unset($data['password']);
    }

    return $data;
  }

  protected function getActions(): array
  {
    return [
      Actions\DeleteAction::make(),
    ];
  }
}
