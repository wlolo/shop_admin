<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>hello</title>
    </head>
    <body>
        <script>
        var json = [{!!json_encode($json)!!}][0];
        </script>
    </body>
</html>