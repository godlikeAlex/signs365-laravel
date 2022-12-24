<x-mail::message>
# Hello!

You are receiving this email because we received a password reset request for your
account.

<x-mail::button :url="$url">
Reset Password
</x-mail::button>

<x-mail::panel>
    If you did not request a password reset, no further action is required.
</x-mail::panel>

Regards,<br>
{{ config('app.name') }}
</x-mail::message>
