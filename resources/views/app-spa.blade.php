<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{{ config('app.name', 'Laravel') }}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link href="/img/favicon.png" rel="apple-touch-icon-precomposed">
        <link href="/img/favicon.png" rel="shortcut icon" type="image/png">
        <meta name="author" content="">
        <meta name="keywords" content="">
        <meta name="description" content="">

        {{-- <link rel="stylesheet" href="/plugins/font-awesome/css/font-awesome.min.css"> --}}
        <link rel="stylesheet" href="/fonts/Linearicons/Font/demo-files/demo.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Jost:400,500,600,700&amp;display=swap&amp;ver=1607580870">
        <link rel="stylesheet" href="/plugins/bootstrap4/css/bootstrap.min.css">
        <link rel="stylesheet" href="/plugins/owl-carousel/assets/owl.carousel.css">
        <link rel="stylesheet" href="/plugins/slick/slick/slick.css">
        <link rel="stylesheet" href="/plugins/lightGallery/dist/css/lightgallery.min.css">
        <link rel="stylesheet" href="/plugins/jquery-bar-rating/dist/themes/fontawesome-stars.css">
        <link rel="stylesheet" href="/plugins/select2/dist/css/select2.min.css">
        <link rel="stylesheet" href="/plugins/lightGallery/dist/css/lightgallery.min.css">
        <link rel="stylesheet" href="/plugins/noUiSlider/nouislider.css">
        {{-- <link rel="stylesheet" href="/css/style.css"> --}}

        @viteReactRefresh
        @vite('resources/css/style.css')
        @vite('resources/js/index.tsx')
        <link rel="stylesheet" href="/css/home-4.css">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />


    </head>
    <body>
        
        <div id="root"></div>

        <script src="/plugins/jquery.min.js"></script>
        <script src="/plugins/popper.min.js"></script>
        <script src="/plugins/bootstrap4/js/bootstrap.min.js"></script>
        <script src="/plugins/select2/dist/js/select2.full.min.js"></script>
        <script src="/plugins/owl-carousel/owl.carousel.min.js"></script>
        <script src="/plugins/jquery-bar-rating/dist/jquery.barrating.min.js"></script>
        <script src="/plugins/lightGallery/dist/js/lightgallery-all.min.js"></script>
        <script src="/plugins/slick/slick/slick.min.js"></script>
        <script src="/plugins/noUiSlider/nouislider.min.js"></script>
        <!-- custom code-->
        <script src="/js/main.js"></script>
    </body>
</html>
