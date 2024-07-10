<!doctype html> <!-- HTML5 -->
<html lang="en" dir="ltr">
  <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <link rel="icon" type="image/png" href="{{asset('/favicon.png')}}">

        <meta name="apple-mobile-web-app-capable" content="yes">
    
        <meta property="og:image" content="{{asset('/cover.png')}}">
        <meta property="og:site_name" content="Signs7">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">

        <!-- Status Bar Style (see Supported Meta Tags below for available values) -->
        <!-- Has no effect unless you have the previous meta tag -->
        <meta name="apple-mobile-web-app-status-bar-style" content="#103178">

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
        @routes

        @viteReactRefresh
        @vite('resources/css/style.css')
        @vite('resources/js/index.tsx')
        <link rel="stylesheet" href="/css/home-4.css">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        @inertiaHead
  </head>
  <body>
    @inertia


    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/fontawesome.min.js" integrity="sha512-1M9vud0lqoXACA9QaA8IY8k1VR2dMJ2Qmqzt9pN2AH7eQHWpNsxBpaayV0kKkUsF7FLVQ2sA2SSc8w5VOm7/mg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

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