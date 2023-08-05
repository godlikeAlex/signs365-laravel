<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use App\Models\User;
use Filament\Pages\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateOrder extends CreateRecord
{
  protected static string $resource = OrderResource::class;

  protected function mutateFormDataBeforeSave(array $data): array
  {
    if ($data["user_id"]) {
      $user = User::find($data["user_id"]);

      $data["name"] = $user->name;
      $data["email"] = $user->email;
    }

    return $data;
  }

  protected function afterCreate()
  {
    $total = 0;

    foreach ($this->record->orderItems as $orderItem) {
      $total += $orderItem->price;
    }

    $this->record->total = $total * (1 + $this->record->city->tax);
    $this->record->total_without_tax = $total;
    $this->record->save();
  }
}
