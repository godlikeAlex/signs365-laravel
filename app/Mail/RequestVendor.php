<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RequestVendor extends Mailable implements ShouldQueue
{
  use Queueable, SerializesModels;

  public $name;
  public $email;
  public $phone;
  public $state;
  public $workType;
  public $submittedAt;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct(
    $name,
    $email,
    $phone,
    $state,
    $workType,
    $submittedAt
  ) {
    $this->name = $name;
    $this->email = $email;
    $this->phone = $phone;
    $this->state = $state;
    $this->workType = $workType;
    $this->submittedAt = $submittedAt;
  }

  /**
   * Get the message envelope.
   *
   * @return \Illuminate\Mail\Mailables\Envelope
   */
  public function envelope()
  {
    return new Envelope(subject: "Request for Cooperation");
  }

  /**
   * Get the message content definition.
   *
   * @return \Illuminate\Mail\Mailables\Content
   */
  public function content()
  {
    return new Content(
      markdown: "mail.requestVendor",
      with: [
        "name" => $this->name,
        "email" => $this->email,
        "phone" => $this->phone,
        "state" => $this->state,
        "workType" => $this->workType,
        "submittedAt" => $this->submittedAt,
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
