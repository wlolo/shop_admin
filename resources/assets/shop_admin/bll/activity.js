define('activity', ['jquery', '_', 'layer', 'storeDesign', 'css!vendor/shop/shop_admin/plugin/storeDesign.css'], 
function($, _, layer) {
     $(document).on('pjax:start', function() { 
        NProgress.start();
    });
    $(document).on('pjax:end', function() {
        bootUp();
        NProgress.done();
    });
    function bootUp() {
        $('#extendsion_json_editor').closest('.form-group').after('<div class="form-group" id="widget-config"></div>');
        $('#widget-config').storeDesign({});
    }
    bootUp();
});
requirejs(['/vendor/shop/config.js'], function() { requirejs(['activity']);});