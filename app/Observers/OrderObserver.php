<?php

namespace App\Observers;

use App\Enums\OrderStatusEnum;
use App\Events\OrderStatusUpdated;
use App\Models\Order;

class OrderObserver
{
  /**
   * Handle the Order "creating" event.
   *
   * @param  \App\Models\Order  $order
   * @return void
   */
  public function creating(Order $order)
  {
    unset($order->skipNotification);
  }

  /**
   * Handle the Order "updating" event.
   *
   * @param  \App\Models\Order  $order
   * @return void
   */
  public function updating(Order $order)
  {
    if ($order->skipNotification) {
      unset($order->skipNotification);

      return;
    }

    if (
      $order->isDirty("status") &&
      in_array($order->status, [
        OrderStatusEnum::PENDING,
        OrderStatusEnum::SHIPPED,
        OrderStatusEnum::DONE,
      ])
    ) {
      event(new OrderStatusUpdated($order));
    }

    unset($order->skipNotification);
  }

  /**
   * Handle the Order "deleted" event.
   *
   * @param  \App\Models\Order  $order
   * @return void
   */
  public function deleted(Order $order)
  {
    //
  }

  /**
   * Handle the Order "restored" event.
   *
   * @param  \App\Models\Order  $order
   * @return void
   */
  public function restored(Order $order)
  {
    //
  }

  /**
   * Handle the Order "force deleted" event.
   *
   * @param  \App\Models\Order  $order
   * @return void
   */
  public function forceDeleted(Order $order)
  {
    //
  }
}
