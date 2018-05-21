define('activity', ['jquery', '_', 'layer', 'formBuilder'], 
function($, _, layer) {
    $(document).on('pjax:start', function() { 
        NProgress.start();
    });
    $(document).on('pjax:end', function() {
        bootUp();
        NProgress.done();
    });
    function bootUp() {
        var fields = [{
                label: '<span title="占位图"><i class="fa fa-fw fa-file-image-o"></i>占&ensp;位&ensp;图</span>',
                attrs: {type: 'banner'}
            }
        ];
        var templates = {
            banner: base_goods_item_template,
        };
        var typeUserAttrs = {
            banner: {
                img_url: {label:'图片地址', options: {'': ''}}, href: {label:'链接地址'}
            }
        };
        var typeUserEvents = {
            banner: { onadd: bannerFn }
        }
        var fbOptions = {
            onSave: function(e, formData) { $('.save_btn').trigger('click'); },
            stickyControls: { enable: true },
    //            typeUserEvents: typeUserEvents,
            sortableControls: true,
            fields: fields,
            templates: templates,
            typeUserAttrs: typeUserAttrs,
            disableInjectedStyle: false,
//            actionButtons: actionButtons,
            disableFields: ['autocomplete','checkboxGroup','button','hidden','date', 'paragraph','number','radio-group','checkbox-group','select','text','file','header','textarea'],
            disabledFieldButtons: { text: ['copy'] },
            disabledAttrs: ['value','placeholder','access','className','description','name','required','label']
        };
        window.formBuilder = $('#extendsion_json_editor').formBuilder(fbOptions);
        formBuilder.promise.then(function(fb) {
//            _.each(_util.deepFind(activity_data, 'extension_json'), function(o, index){
//                (function(idx){
//                    var obj = activity_data.extension_json[idx];
//                    cache_data = obj;
//                    fb.actions.addField({type: obj.type, label: getFieldLable(obj.type), values:[{}]});
//                })(index);
//            });
//            setTimeout(function(){ $('.icon-goods_1000,.icon-goods_1001').hide(); }, 0);//TODO 隐藏功能
        });
    }
    bootUp();
    
    function base_goods_item_template(fieldData) {
        return {
            field: '<span id="'+fieldData.name+'"><img class="img_preview form-field" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></span>',
            onRender: function(){
//                var img = $('#' + fieldData.name+' .img_preview');
//                img_preview_fn(img, fieldData.img_url);
            }
        };
    };
    var bannerFn = function(fld) {
        var me = $(fld);
//        img_select_append_option(me.find('.fld-img_url'));
//        init_data(me);
        me.find('.copy-button').hide();// 拷贝按钮临时屏蔽，在复制数据时 select2 初始化异常
    };
});

requirejs(['/vendor/shop/config.js'], function() { requirejs(['activity']);});