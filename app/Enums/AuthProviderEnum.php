<?php

namespace App\Enums;

enum AuthProviderEnum: string
{
  case GOOGLE = "google";

  public function getLabel(): string
  {
    return ucfirst($this->value);
  }
}
