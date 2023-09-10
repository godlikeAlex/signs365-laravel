<?php

namespace App\Listeners;

use App\Events\OrderStatusUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendOrderUpdatedNotification
{
  /**
   * Create the event listener.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  /**
   * Handle the event.
   *
   * @param  \App\Events\OrderStatusUpdated  $event
   * @return void
   */
  public function handle(OrderStatusUpdated $event)
  {
    $order = $event->order;

    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
    $beautymail->send("emails.orderUpdated", ["order" => $order], function (
      $message
    ) use ($order) {
      $user = $order->user;

      $message
        ->from(env("MAIL_FROM_ADDRESS"))
        ->to(
          $user ? $user->email : $order->email,
          $user ? $user->name : $order->name
        )
        ->subject("Your Order Updated!");
    });
  }
}
