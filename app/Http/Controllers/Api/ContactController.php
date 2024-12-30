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
  private $recipient;

  public function __construct()
  {
    $this->recipient = env("NOTIFICATION_EMAIL");
  }

  public function sendProductRequest(Request $request, Product $product)
  {
    $validated = $request->validate([
      "name" => "required",
      "email" => "required",
    ]);

    foreach (
      [
        env("NOTIFICATION_EMAIL"),
        "viktor@easywayinstall.com",
        "david@easywayinstall.com",
      ]
      as $email
    ) {
      Mail::to($email)->later(
        now()->addMinute(),
        new ProductRequest(
          $request->input("name"),
          $request->input("email"),
          $product->title
        )
      );
    }

    return ["ok" => true];
  }

  public function requestContacts(Request $request)
  {
    Mail::to($this->recipient)->later(
      now()->addMinute(),
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
