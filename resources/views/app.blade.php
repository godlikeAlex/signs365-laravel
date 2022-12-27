<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        @viteReactRefresh
        @vite('resources/js/index.tsx')
    </head>
    <body class="font-sans antialiased">
        <div id="root"></div>
    </body>
</html>
