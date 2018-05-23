define('activity', ['jquery', '_', 'layer', 'jquery-sortable', 'css!vendor/shop/shop_admin/bll/activity.css'], 
function($, _, layer) {
     $(document).on('pjax:start', function() { 
        NProgress.start();
    });
    $(document).on('pjax:end', function() {
        bootUp();
        NProgress.done();
    });
    function bootUp() {
        $('#extendsion_json_editor').closest('.form-group').after(getElHtml());
        var widget_list = $('#widget-list').sortable({
            sort: false,
            group: {name: 'widget',pull: 'clone', put: false},
            animation: 150,
            onClone: function(evt){
                var origEl = evt.item;
		var cloneEl = evt.clone;
                $(evt.item).click(function() {
                    $('#widget-options').html('<li><input type="textfield"></li>');
                });
            }
        });
        var editor = $('#widget-wrap').sortable({
            filter: '.widget-remove',
            sort: true,
            animation: 150,
            group: { name: 'widget', pull: false, put: true},
            onFilter: function (evt) {
              var el = editor.data('sortable').closest(evt.item);
              el && el.parentNode.removeChild(el);
            },
            onAdd: function() {
                
            }
        });
//        $('#add_widget').click(function(){
//            var el = document.createElement('li');
//            el.innerHTML = (new Date()).getTime() + '<i class="widget-remove">✖</i>';
//            editor.data('sortable').el.appendChild(el);
//        });
        function createEl(){
            var el = document.createElement('li');
            el.innerHTML = (new Date()).getTime() + '<i class="widget-remove">✖</i>';
            editor.data('sortable').el.appendChild(el);
        }
    }
    bootUp();
    function getElHtml(){
        return `
<div class="form-group" id="widget-config">
    <div class="col-sm-2">
        <ul id="widget-list" class="widget">
            <li>
                <i class="widget-icon fa fa-image"></i>
                <i class="widget-remove fa fa-remove"></i>
            </li>
            <li>
                <i class="widget-icon fa fa-leaf"></i>
                <i class="widget-remove fa fa-remove"></i>
            </li>
        </ul>
    </div>
    <div class="col-sm-8">
        <ul id="widget-wrap" class="widget"></ul>
    </div>
    <div class="col-sm-2" id="widget-options">
        
    </div>
</div>

`;
    }
});
requirejs(['/vendor/shop/config.js'], function() { requirejs(['activity']);});