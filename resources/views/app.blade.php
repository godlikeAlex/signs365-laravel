<!doctype html> <!-- HTML5 -->
<html lang="en" dir="ltr">
  <head>
        <title inertia>Signs7</title>
        <meta inertia name="description" content="At Signs7, we are dedicated to delivering superior outdoor advertising solutions that leave a lasting impression. Our commitment to quality, speed, and innovation sets us apart from the rest.">

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

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />


        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16652867388">
        </script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-16652867388');
        </script>



        @inertiaHead

    @php
      $remoteIpAddr = $_SERVER['REMOTE_ADDR'];
    @endphp
    
    <script type="text/javascript">
      var yaParams = { ipaddress: "{{$remoteIpAddr}}" };
    </script>

 <!-- Yandex.Metrika counter --> 
    {{-- <script type="text/javascript" > 
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.webvisor.org/metrika/tag_ww.js", "ym"); ym(97932247, "init", { params:window.yaParams, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true, ecommerce:"dataLayer" }); </script> <!-- /Yandex.Metrika counter --> --}}

  </head>
  <body>
    @inertia


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