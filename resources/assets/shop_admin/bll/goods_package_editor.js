define(['jquery', '_', 'layer', 'uuid', 'json-editor'], function($, _, layer, uuid) {
  var default_options = {
    theme: 'bootstrap3', disable_collapse: true, disable_properties: true,
    disable_array_delete_last_row: true, disable_edit_json: true, ajax: false
  };
  var dlg = function(options) {
    this.options = options;
    this.editor = null;
    this.editorEl = null;
  };
  dlg.prototype.show = function(values) {
    var w = $('body').width(), w = w >600? 600: w, me = this;
    this.id = 'editor_' + uuid();
    layer.open({
        type: 1, title: '', zIndex: 99, skin: 'layui-layer-rim',
        area: [ w +'px', '500px'], content: '<div id="' + this.id + '"></div>',
        btn: ['确定'], yes: function(index){
            var values = me.editor.getValue();
            me.editor && me.editor.destroy();
            layer.close(index);
            me.close.call(me, values);
        }
    });
    var options = $.extend({}, default_options, this.options || {});
    this.editorEl = $('#' + this.id).jsoneditor(options);
    this.editor = this.editorEl.data('jsoneditor');
    if (values) {
      if (_.isString(values)) {
        values = JSON.stringify(values);
      }
      this.editor.setValue(values);
    }
  };
  dlg.prototype.close = _.noop;
  return dlg;
});