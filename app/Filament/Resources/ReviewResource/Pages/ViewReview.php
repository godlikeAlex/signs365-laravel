<?php

namespace App\Filament\Resources\ReviewResource\Pages;

use App\Filament\Resources\ReviewResource;
use Filament\Pages\Actions;
use Filament\Pages\Actions\Action;
use Filament\Resources\Pages\ViewRecord;

class ViewReview extends ViewRecord
{
  protected static string $resource = ReviewResource::class;

  protected function getActions(): array
  {
    return [
      Action::make("toggle_publish")
        ->action(
          fn() => $this->record->update([
            "published" => !$this->record->published,
          ])
        )
        ->color(fn() => $this->record->published ? "danger" : "success")
        ->label(
          fn() => $this->record->published
            ? "Unpublish Review"
            : "Publish Review"
        ),
    ];
  }
}
