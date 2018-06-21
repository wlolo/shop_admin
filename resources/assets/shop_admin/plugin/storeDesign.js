(function storeDesignModule(factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
            define(['jquery', 'Sortable', 'json-editor'], factory);
	}
	else {
            window['StoreDesign'] = factory(jQuery, Sortable, JSONEditor);
	}
})(function storeDesignFactory($, Sortable, JSONEditor) {
    if (typeof window == 'undefined' || !window.document) {
        return function storeDesignError() {
            throw new Error('storeDesign.js requires a window with a document');
        };
    }
    window.JSONEditor.defaults.options.theme = 'bootstrap3';
    function template(html, data) {
        for (var i in data) {
            html = html.replace(new RegExp('<%=\\s*' + i + '\\s*%>', 'g'), data[i] || '');
        }
        return html;
    }
    function StoreDesign(el, options) {
        if (!(el && el.nodeType && el.nodeType === 1)) {
            throw 'StoreDesign: `el` must be HTMLElement, and not ' + {}.toString.call(el);
        }
        this.el = el; // root element
        this.$el = $(el);
        var defaults = {
            menuClass: 'store_design-menu', //菜单
            previewClass: 'store_design-preview',//预览
            configClass: 'store_design-config'// 配置
        }, menusHtml = '';
        this.options = $.extend({}, defaults, options || {});
        $.each(this.modules, function(i, module) {
            menusHtml += module.view(); 
        });
        var tpl = '<div class="col-sm-<%=width%> store-design"><ul class="<%=className%> container-fluid"><%=html%></ul></div>';
        var html = [
            '<div class="form-group store-design-wrap">',
                template(tpl, { width: 2, title: '模板', html: menusHtml, className: this.options.menuClass}),
                template(tpl, { width: 5, title: '预览', html: '', className: this.options.previewClass}),
                template(tpl, { width: 5, title: '配置', html: '', className: this.options.configClass}),
            '</div>'].join('\n');
        this.$el.append(html);
        
        this.show();
    }
    StoreDesign.prototype = {
        constructor: Sortable,
        modules: [],
        jsoneditor: null,
        show: function() {
            var scope = this, current_config = null;
            var widget_list = this.$el.find('.' + scope.options.menuClass).sortable({
                sort: false,
                group: {name: 'widget',pull: 'clone', put: false},
                animation: 150,
                onClone: function(evt){
                // var origEl = evt.item,cloneEl = evt.clone;$(evt.item).click(function() {$('.'+ scope.options.configClass).html('<li>这里是配置</li>');});
                }
            });
            var editor = this.$el.find('.' + scope.options.previewClass).sortable({
                filter: '.module-remove',
                sort: true,
                animation: 150,
                group: { name: 'widget', pull: false, put: true},
                onFilter: function (evt) {
                  var li = editor.data('sortable').closest(evt.item);
                  li && $(li).hasClass('selected') && $('.'+ scope.options.configClass).jsoneditor('destroy');
                  li &&li.parentNode.removeChild(li);
                },
                onAdd: function(evt) {
                    var origEl = evt.item, li = $(origEl);
                    li.click(function() {
                        var me = $(this), $jsoneditor = $('.'+ scope.options.configClass);
                        var module_name = me.data('module_name'), module = scope.findModule(module_name);
                        me.closest('.store_design-preview').find('li').removeClass('selected');
                        me.addClass('selected');
                        $jsoneditor.data('jsoneditor') && $jsoneditor.jsoneditor('destroy');
                        $jsoneditor.jsoneditor({schema:module.schema});
                        var editor = $jsoneditor.data('jsoneditor'), val = me.data('module_val');
                        val && editor.setValue(val);
                        editor.on('change', function() {
                            me.data('module_val', editor.getValue());
                        });
                    });
                }
            });
        },
        findModule: function(name) {
            for(var i = 0; i < this.modules.length; i++) {
                if(name === this.modules[i].name) {
                    return this.modules[i];
                }
            }
            return null;
        },
        destroy: function(){}
    };
    function baseModule(optoins) {
        for(var v in optoins) { this[v] = optoins[v]; }
    }
    baseModule.prototype = {
        constructor: baseModule,
        template: template,
        view: function() {
            return this.template(this.tpl, {name:this.name});
        }
    };
    
    var imageModule = new baseModule({
        name: 'imageModule',
        tpl: '<li data-module_name="<%=name%>" class="module_item">'+
                '<div class="icon"><i class="widget-icon fa fa-image"></i></div>'+
                '<div class="iframe"></div>'+
                '<i class="module-remove fa fa-remove"></i>'+
            '</li>',
        schema: {
            title: '图片',
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    title: '图片地址'
                },
                href: {
                    type: 'string',
                    title: '链接地址'
                }
            }
        }
    });
    StoreDesign.prototype.modules.push(imageModule);
    var goodsModule = new baseModule({
        name: 'goodsModule',
        tpl: '<li data-module_name="<%=name%>">'+
                '<div class="icon"><i class="widget-icon fa fa-tasks"></i></div>'+
                '<div class="iframe"></div>'+
                '<i class="module-remove fa fa-remove"></i>'+
            '</li>',
        schema: {
            title: '商品',
            type: 'object',
            properties: {
                goods_id: {
                    type: 'string',
                    title: '商品 id'
                }
            }
        }
    });
    StoreDesign.prototype.modules.push(goodsModule);
    !$.fn.sortable && ($.fn.sortable = function (options) {
        var retVal, args = arguments;
        this.each(function () {
            var $el = $(this), sortable = $el.data('sortable');
            if (!sortable && (options instanceof Object || !options)) {
                sortable = new Sortable(this, options);
                $el.data('sortable', sortable);
            }
            if (sortable) {
                if (options === 'widget') {
                    retVal = sortable;
                }
                else if (options === 'destroy') {
                    sortable.destroy();
                    $el.removeData('sortable');
                }
                else if (typeof sortable[options] === 'function') {
                    retVal = sortable[options].apply(sortable, [].slice.call(args, 1));
                }
                else if (options in sortable.options) {
                    retVal = sortable.option.apply(sortable, args);
                }
            }
        });
        return (retVal === void 0) ? this : retVal;
    });
    $.fn.storeDesign = function (options) {
        var retVal, args = arguments;
        this.each(function () {
            var $el = $(this), storeDesign = $el.data('storeDesign');
            if (!storeDesign && (options instanceof Object || !options)) {
                storeDesign = new StoreDesign(this, options);
                $el.data('storeDesign', storeDesign);
            }
            if (storeDesign) {
                if (options === 'widget') {
                    retVal = storeDesign;
                }
                else if (options === 'destroy') {
                    storeDesign.destroy();
                    $el.removeData('storeDesign');
                }
                else if (typeof storeDesign[options] === 'function') {
                    retVal = storeDesign[options].apply(storeDesign, [].slice.call(args, 1));
                }
                else if (options in storeDesign.options) {
                    retVal = storeDesign.option.apply(storeDesign, args);
                }
            }
        });
        return (retVal === void 0) ? this : retVal;
    };
});