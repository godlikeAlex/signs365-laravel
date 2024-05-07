<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
class ProductRequest extends Mailable
{
  use Queueable, SerializesModels;
  public $name;
  public $email;
  public $product_name;
  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct($name, $email, $product_name)
  {
    $this->name = $name;
    $this->email = $email;
    $this->product_name = $product_name;
  }

  /**
   * Get the message envelope.
   *
   * @return \Illuminate\Mail\Mailables\Envelope
   */
  public function envelope()
  {
    return new Envelope(subject: "New Product Request from WebSite");
  }

  /**
   * Get the message content definition.
   *
   * @return \Illuminate\Mail\Mailables\Content
   */
  public function content()
  {
    return new Content(
      markdown: "emails.productRequest",
      with: [
        "product_name" => $this->product_name,
        "name" => $this->name,
        "email" => $this->email,
      ]
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array
   */
  public function attachments()
  {
    return [];
  }
}
