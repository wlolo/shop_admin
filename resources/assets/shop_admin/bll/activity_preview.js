define('activity_priview', ['jquery', '_', 'activity_json'],
function($, _, data){
    console.log(data);
});
requirejs(['/vendor/shop/config.js'], function() {
    requirejs(['activity_priview']);
});