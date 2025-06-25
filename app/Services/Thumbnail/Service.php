<?php
namespace App\Services\Thumbnail;

use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManagerStatic as Image;
use Storage;

class Service
{
  public $image;

  public function __construct($path)
  {
    $pathToImage = Storage::path("public/" . $path);

    if (!Storage::disk("public")->exists("media/thumbnails")) {
      Storage::disk("public")->makeDirectory("media/thumbnails");
    }

    $this->image = Image::make($pathToImage);
  }

  public function generate($width, $height, $quality)
  {
    $this->image->fit($width, $height);

    $this->image->save(
      Storage::path("public/media/thumbnails/{$this->image->filename}.webp"),
      $quality,
      "webp"
    );

    return "media/thumbnails/{$this->image->filename}.webp";
  }
}
