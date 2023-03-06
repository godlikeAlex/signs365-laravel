<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Mail;

class ContactController extends Controller
{
  private $recipient = "godlikedesigner@gmail.com";

  public function sendProductRequest(Request $request, Product $product)
  {
    $validated = $request->validate([
      "name" => "required",
      "email" => "required",
    ]);

    Mail::to($this->recipient)->send(
      new ProductRequest(
        $request->input("name"),
        $request->input("email"),
        $product->title
      )
    );

    return ["ok" => true];
  }
}
