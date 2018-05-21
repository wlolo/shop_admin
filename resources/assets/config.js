define('jquery-custom',['jquery'], function($) {
    $.ajaxSetup({ cache: false });
    return $; 
});
define('layer-mobile-custom', ['layer-mobile', 'css!vendor/shop/layer/dist/mobile/need/layer'], function(layer) {
    return layer;
});
define('layer-custom', ['layer', 'css!vendor/shop/layer/dist/theme/default/layer'], function(layer) {
    return layer;
});
define('datatables.net-bs-custom', ['datatables.net-bs', 'css!vendor/shop/datatables.net-bs/css/dataTables.bootstrap']);
define('jquery', [], function() {
    return jQuery;
});
define('select2-custom', ['select2', 'select2-cn']);
define('formBuilder-custom',['jquery-custom', 'jquery-ui-sortable', 'formBuilder', 'formRender']);

requirejs.config({
    baseUrl: '/',
    paths: {
        // 'jquery': 'vendor/laravel-admin/AdminLTE/plugins/jQuery/jQuery-2.1.4.min',
        text: 'vendor/shop/text/text',
        css: 'vendor/shop/require-css/css',
        tpl: 'vendor/shop/requirejs-underscore-tpl/underscore-tpl',
        underscore: 'vendor/shop/underscore/underscore-min',
        layer: 'vendor/shop/layer/dist/layer',
        'layer-mobile': 'vendor/shop/layer/dist/mobile/layer',
        md5: ['vendor/shop/JavaScript-MD5/js/md5', 'vendor/shop/JavaScript-MD5/js/md5.min'],
        'datatables.net': ['vendor/shop/datatables.net/js/jquery.dataTables', 'vendor/shop/datatables.net/js/jquery.dataTables.min'],
        'datatables.net-bs': ['vendor/shop/datatables.net-bs/js/dataTables.bootstrap', 'vendor/shop/datatables.net-bs/js/dataTables.bootstrap.min'],
        select2:'vendor/laravel-admin/AdminLTE/plugins/select2/select2.full.min',
        'select2-cn': 'vendor/laravel-admin/AdminLTE/plugins/select2/i18n/zh-CN',
        'json-editor': ['vendor/shop/json-editor/dist/jsoneditor', 'vendor/shop/json-editor/dist/jsoneditor.min'],
        'json-editor_custom': 'vendor/shop/shop_admin/common/jsoneditor_custom',
        'shop_util': 'vendor/shop/shop_admin/common/util',
        formBuilder: 'vendor/shop/formBuilder/dist/form-builder.min',
        formRender:'vendor/shop/formBuilder/dist/form-render.min',
        'jquery-ui-sortable':'vendor/shop/jquery-ui-sortable/jquery-ui-sortable.min'
    },
    map: {
        '*' : {
            '_': 'underscore',
            '$': 'jquery',
            jquery: 'jquery-custom',
            layer: 'layer-custom',
            'layer-mobile': 'layer-mobile-custom',
            'datatables.net-bs': 'datatables.net-bs-custom',
            select2: 'select2-custon',
            formBuilder: 'formBuilder-custom'
        },
        'jquery-custom':{ jquery: 'jquery'},
        'layer-mobile-custom': { 'layer-mobile': 'layer-mobile'},
        'layer-custom': { layer: 'layer'},
        'datatables.net-bs-custom': {'datatables.net-bs': 'datatables.net-bs'},
        'select2-custom': { select2: 'select2'},
        'formBuilder-custom': { formBuilder: 'formBuilder'},
    },
    shim: {
        'underscore': { exports: '_' },
        'jqueryMd5': { deps: ['jquery'] },
        'datatables': { deps: ['jquery'] },
        'json-editor': { deps: ['jquery'] },
        'jquery-ui-sortable': { deps: ['jquery'] }
    }
});
