define('activity', ['jquery', '_', 'layer'], 
function($, _, layer) {
    $(document).on('pjax:start', function() { 
        NProgress.start();
    });
    $(document).on('pjax:end', function() {
        bootUp();
        NProgress.done();
    });
    function bootUp() {
        console.log('hi');
    }
    bootUp();
});

requirejs(['/vendor/shop/config.js'], function() { requirejs(['activity']);});