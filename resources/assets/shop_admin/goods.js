define('goods', function() {
    var $is_package = $('input.is_package[type=hidden]'),
        $pakcage_json = $('#package_json'),
        $dt = $('#dt_wrap');
    $is_package.val() === 'on' && $dt.show();
    $is_package.on('change', function() {
        if ($(this).val() === 'on') {
            $dt.show();
        } else {
            $pakcage_json.val('');
            $dt.hide();
        }
    });
});

requirejs(['/vendor/shop/config.js'], function(){
    requirejs(['goods']); 
});