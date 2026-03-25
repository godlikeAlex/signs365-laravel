<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EstimateRequestReceived extends Mailable implements ShouldQueue
{
  use Queueable, SerializesModels;

  public function __construct(
    public string $name,
    public string $requestID,
    public array $cart
  ) {
  }

  public function envelope(): Envelope
  {
    return new Envelope(
      subject: "Your Estimate Request Received #{$this->requestID}"
    );
  }

  public function content(): Content
  {
    return new Content(
      markdown: "mail.estimateRequestReceived",
      with: [
        "name" => $this->name,
        "requestID" => $this->requestID,
        "cart" => $this->cart,
      ]
    );
  }

  public function attachments(): array
  {
    return [];
  }
}
