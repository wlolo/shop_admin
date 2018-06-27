define('activity_priview', ['jquery', '_', 'act_json'],
function($, _, act_json) {
    if (_.isEmpty(act_json)) return;
    act_json = _.isObject(act_json)? [act_json]: act_json;
    _.each(act_json, function(v, i) {
        $('#priview').html(JSON.stringify(v));
    });
});
requirejs(['/vendor/shop/config.js'], function() {
    requirejs(['activity_priview']);
});