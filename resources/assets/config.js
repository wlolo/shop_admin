define('jquery-custom',['jquery'], function($) {
    $.ajaxSetup({ cache: false });
    return $; 
});
define('layer-mobile-custom', ['layer-mobile', 'css!vendor/shop/layer/dist/mobile/need/layer'], function(layer) {
    return layer;
});
define('layer-custom', ['layer-mobile', 'css!/vendor/shop/layer/dist/theme/default/layer'], function(layer) {
    return layer;
});
requirejs.config({
    baseUrl: '/',
    paths: {
        'jquery': 'vendor/laravel-admin/AdminLTE/plugins/jQuery/jQuery-2.1.4.min',
        'text': 'vendor/shop/text/text',
        'css': 'vendor/shop/require-css/css',
        'tpl': 'vendor/shop/requirejs-underscore-tpl/underscore-tpl',
        'underscore': 'vendor/shop/underscore/underscore-min',
        'layer': 'vendor/shop/layer/dist/layer',
        'layer-mobile': 'vendor/shop/layer/dist/mobile/layer',
        'md5': ['vendor/shop/JavaScript-MD5/js/md5', 'vendor/shop/JavaScript-MD5/js/md5.min'],
        'datatables': ['vendor/shop/datatables.net/js/jquery.dataTables', 'vendor/shop/datatables.net/js/jquery.dataTables.min']
    },
    map: {
        '*' : {
            'layer': 'layer-custom',
            'layer-mobile': 'layer-mobile-custom',
            '_': 'underscore',
            '$': 'jquery',
            'jquery': 'jquery-custom'
        },
        'jquery-custom':{'jquery': 'jquery'},
        'layer-mobile-custom': {'layer-mobile': 'layer-mobile'},
        'layer-custom': {'layer': 'layer'}
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jqueryMd5':{
            deps: ['jquery']
        },
        'datatables':{
            deps: ['jquery']
        }
    }
});
