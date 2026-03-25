<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EstimateRequestAdmin extends Mailable implements ShouldQueue
{
  use Queueable, SerializesModels;

  public function __construct(
    public string $requestID,
    public string $customerName,
    public string $customerEmail,
    public string $customerPhone,
    public string $customerAddress,
    public array $cart,
    public string $submittedAt
  ) {
  }

  public function envelope(): Envelope
  {
    return new Envelope(subject: "New Estimate Request #{$this->requestID}");
  }

  public function content(): Content
  {
    return new Content(
      markdown: "mail.estimateRequestAdmin",
      with: [
        "customerName" => $this->customerName,
        "customerEmail" => $this->customerEmail,
        "customerPhone" => $this->customerPhone,
        "customerAddress" => $this->customerAddress,
        "requestID" => $this->requestID,
        "cart" => $this->cart,
        "submittedAt" => $this->submittedAt,
      ]
    );
  }

  public function attachments(): array
  {
    return [];
  }
}
