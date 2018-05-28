(function storeDesignModule(factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
            define(['jquery', 'Sortable'], factory);
	}
	else {
            window['StoreDesign'] = factory(jQuery, Sortable);
	}
})(function storeDesignFactory($, Sortable) {
    if (typeof window == 'undefined' || !window.document) {
        return function storeDesignError() {
            throw new Error('storeDesign.js requires a window with a document');
        };
    }
    function template(html, data) {
        for (var i in data) {
            html = html.replace(new RegExp('<%=\\s*' + i + '\\s*%>', 'g'), data[i]);
        }
        return html;
    }
    function StoreDesign(el, options) {
        if (!(el && el.nodeType && el.nodeType === 1)) {
            throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
        }
        this.el = el; // root element
        this.$el = $(el);
        var defaults = {
            menuClass: 'store_design-menu', //菜单
            previewClass: 'store_design-preview',//预览
            configClass: 'store_design-config'// 配置
        }, menusHtml = null;
        this.options = $.extend({}, defaults, options || {});
        
        $.each(this.modules, function(i, module) { menusHtml += module.view; });
        var menuHtml = '<div class="col-sm-2 store-design"><ul class="' + this.options.menuClass + '"><%=html%></ul></div>';
        menuHtml = template(menuHtml, {html: menusHtml});
        var menuEl = $(menuHtml),
            previewEl = $('<div class="col-sm-8 store-design"><ul class="' + this.options.previewClass + '"></ul></div>'),
            configEl = $('<div class="col-sm-2 store-design"><ul class="' + this.options.configClass + '"><ul></div>');
        this.$el.append(menuEl, previewEl, configEl);
        
        this.show();
    }
    StoreDesign.prototype = {
        constructor: Sortable,
        modules: [],
        show: function() {
            var scope = this;
            var widget_list = this.$el.find('.' + scope.options.menuClass).sortable({
                sort: false,
                group: {name: 'widget',pull: 'clone', put: false},
                animation: 150,
                onClone: function(evt){
//                    var origEl = evt.item;
//                    var cloneEl = evt.clone;
//                    $(evt.item).click(function() {
//                        $('#widget-options').html('<li>这里是配置</li>');
//                    });
                }
            });
            var editor = this.$el.find('.' + scope.options.previewClass).sortable({
                filter: '.widget-remove',
                sort: true,
                animation: 150,
                group: { name: 'widget', pull: false, put: true},
                onFilter: function (evt) {
                  var li = editor.data('sortable').closest(evt.item);
                  li && li.parentNode.removeChild(li);
                },
                onAdd: function(evt) {
                    var origEl = evt.item, li = $(origEl), module_name = li.data('module_name');
                    li.click(function(){
                       var me = $(this);
                       me.toggleClass('selected');
                    });
                }
            });
        },
        destroy: function(){
            
        }
    };
    function baseModule(optoins) {
        this.options = optoins || {};
    }
    
    var imageModule = $.extend({}, baseModule, {
        name: 'imageModule',
        view: ['<li data-module_name="${this.name}">',
                    '<div class="icon"><i class="widget-icon fa fa-image"></i></div>',
                    '<div class="iframe"></div>',
                    '<i class="widget-remove fa fa-remove"></i>',
                '</li>'].join('\n')
    });
    StoreDesign.prototype.modules.push(imageModule);
    
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