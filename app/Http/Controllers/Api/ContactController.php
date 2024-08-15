<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ProductRequest;
use App\Mail\RequestContact;
use App\Models\Product;
use Illuminate\Http\Request;
use Mail;

class ContactController extends Controller
{
  private $recipient = "info@signs7.com";

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

  public function requestContacts(Request $request)
  {
    Mail::to($this->recipient)->send(
      new RequestContact(
        $request->input("name"),
        $request->input("phone"),
        $request->input("email"),
        $request->input("message")
      )
    );

    return ["ok" => true];
  }
}
