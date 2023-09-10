@extends('beautymail::templates.sunny')

@section('content')

    @php
        function generateHeading($status) {
            switch ($status) {
                case App\Enums\OrderStatusEnum::SHIPPED:
                    return 'Our order on it is way!';
                case App\Enums\OrderStatusEnum::DONE:
                    return 'All done! Thanks for order!';
                default:
                    return 'Your order updated';
                    break;
            }
        }
    @endphp

  @include ('beautymail::templates.sunny.heading' , [
      'heading' => generateHeading($order->status),
      'level' => 'h1',
  ])

	@include('beautymail::templates.sunny.contentStart')

    @switch($order->status)
        @case(App\Enums\OrderStatusEnum::SHIPPED)
            <p>Order UUID: {{$order->uuid}}</p>
            @if ($order->tracking_id)
            <p>Tracking ID: {{$order->tracking_id}}</p>
            @endif
            @if ($order->supplier_id)
            <p>Supplier ID: {{$order->supplier_id}}</p>
            @endif
            @break
        @case(App\Enums\OrderStatusEnum::DONE)
            <p>Order UUID: {{$order->uuid}}</p>
            @if ($order->tracking_id)
            <p>Tracking ID: {{$order->tracking_id}}</p>
            @endif
            @if ($order->supplier_id)
            <p>Supplier ID: {{$order->supplier_id}}</p>
            @endif
            @break
        @default
    @endswitch
	@include('beautymail::templates.sunny.contentEnd')

@stop