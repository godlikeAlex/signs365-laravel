<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ProductRequest;
use App\Mail\RequestContact;
use App\Mail\RequestVendor;
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
      "phone" => "required",
    ]);

    foreach (
      [
        env("NOTIFICATION_EMAIL"),
        "viktor@easywayinstall.com",
        "david@easywayinstall.com",
        "godlikedesigner@gmail.com",
      ]
      as $email
    ) {
      Mail::to($email)->later(
        now()->addMinute(),
        new ProductRequest(
          $request->input("name"),
          $request->input("email"),
          $request->input("phone"),
          $product->title
        )
      );
    }

    return ["ok" => true];
  }

  public function requestContacts(Request $request)
  {
    foreach (
      [
        env("NOTIFICATION_EMAIL"),
        "viktor@easywayinstall.com",
        "david@easywayinstall.com",
        "godlikedesigner@gmail.com",
      ]
      as $email
    ) {
      Mail::to($email)->later(
        now()->addMinute(),
        new RequestContact(
          $request->input("name"),
          $request->input("phone"),
          $request->input("email"),
          $request->input("message")
        )
      );
    }

    return ["ok" => true];
  }

  public function requestVendor(Request $request)
  {
    $validated = $request->validate([
      "name" => "required",
      "email" => "required",
      "phone" => "required",
      "state" => "required",
      "workType" => "required",
    ]);

    $submittedAt = now()
      ->setTimezone("America/New_York")
      ->format("Y-m-d H:i T");

    foreach (
      [env("NOTIFICATION_EMAIL"), "godlikedesigner@gmail.com"]
      as $email
    ) {
      Mail::to($email)->later(
        now()->addMinute(),
        new RequestVendor(
          $request->input("name"),
          $request->input("email"),
          $request->input("phone"),
          $request->input("state"),
          $request->input("workType"),
          $submittedAt
        )
      );
    }

    return ["ok" => true];
  }
}
