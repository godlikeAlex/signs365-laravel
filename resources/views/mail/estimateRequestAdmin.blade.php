<x-mail::message>
# New Estimate Request

<x-mail::panel>
<p><strong>Name:</strong> {{ $customerName }}</p>
<p><strong>Email:</strong> {{ $customerEmail }}</p>
<p><strong>Phone:</strong> {{ $customerPhone }}</p>
<p><strong>Address:</strong> {{ $customerAddress }}</p>
<p><strong>Submitted At:</strong> {{ $submittedAt }}</p>
</x-mail::panel>

<x-mail::panel>
<p><strong>Total Cost:</strong> ${{ number_format((float) ($cart['total'] ?? 0), 2) }}</p>
</x-mail::panel>

@foreach (($cart['items'] ?? []) as $item)
## {{ $item['name'] ?? 'Item' }}

<x-mail::panel>
<p><strong>Quantity:</strong> {{ $item['quantity'] ?? '-' }}</p>
<p><strong>Estimated Price:</strong> ${{ number_format((float) ($item['line_total'] ?? 0), 2) }}</p>

@php
  $payload = $item['attributes']['payload'] ?? [];
  $serviceTitles = $payload['service_titles'] ?? [];
  $receiptRows = $payload['receipt_rows'] ?? [];
@endphp

@if (!empty($serviceTitles))
<p><strong>Service Type:</strong> {{ implode(', ', array_values($serviceTitles)) }}</p>
@endif

@if (!empty($payload['width']) && !empty($payload['height']))
<p>
  <strong>Size:</strong>
  {{ $payload['width'] }} x {{ $payload['height'] }} {{ $payload['unit'] ?? '' }}
</p>
@endif

@if (!empty($receiptRows))
<p><strong>All Parameters:</strong></p>
<ul>
@foreach ($receiptRows as $row)
  <li>
    <strong>{{ $row['label'] ?? 'Parameter' }}:</strong>
    {{ $row['value'] ?? '—' }}
  </li>
@endforeach
</ul>
@endif

@php
  $fileRows = array_values(array_filter($receiptRows, function ($row) {
    return !empty($row['links']);
  }));
@endphp

@if (!empty($fileRows))
<p><strong>Files:</strong></p>
<ul>
@foreach ($fileRows as $row)
  @foreach (($row['links'] ?? []) as $file)
    <li>
      <a href="{{ $file['url'] ?? '#' }}">{{ $file['name'] ?? $file['label'] ?? 'File' }}</a>
    </li>
  @endforeach
@endforeach
</ul>
@endif
</x-mail::panel>
@endforeach

</x-mail::message>
