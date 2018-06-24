<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>hello</title>
    </head>
    <body>
        <script src="/vendor/laravel-admin/AdminLTE/plugins/jQuery/jQuery-2.1.4.min.js"></script>
        <script src="/vendor/shop/requirejs/require.js" data-main="/vendor/shop/shop_admin/bll/activity_preview.js"></script>
        <script>
            define('activity_json', function(){
                return [{!!json_encode($json)!!}][0];
            });
        </script>
    </body>
</html>