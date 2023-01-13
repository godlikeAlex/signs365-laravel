<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditOrder extends EditRecord
{
  protected static string $resource = OrderResource::class;

  protected function getActions(): array
  {
    return [
      Actions\DeleteAction::make(),
    ];
  }

  protected function afterSave()
  {
    $total = 0;

    foreach ($this->record->orderItems as $orderItem) {
      $total += $orderItem->productPrice->price * $orderItem->quantity;
    }

    $this->record->total = $total * (1 + $this->record->city->tax);
    $this->record->total_without_tax = $total;
    $this->record->save();
  }
}
