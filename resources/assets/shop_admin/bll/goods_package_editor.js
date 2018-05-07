define(['jquery', '_', 'layer', 'uuid', 'json-editor'], function($, _, layer, uuid) {
  var editor = null, options = null, selector = null, layer_id = null;
  var default_options = {
    theme: 'bootstrap3', disable_collapse: true, disable_properties: true,
    disable_array_delete_last_row: true, disable_edit_json: true, ajax: false
  };
  var dlg = function(options) {
    this.options = options;
  };
  dlg.prototype.show = function(values) {
    var w = $('body').width(), w = w >600? 600: w;
    this.id = 'editor_' + uuid();
    this.layer_id = layer.open({
        type: 1, title: '', zIndex: 99, skin: 'layui-layer-rim',
        area: [ w +'px', '500px'], content: '<div id="' + this.id + '"></div>',
        btn: ['确定'], yes: this.close
    });
    var options = $.extend({}, default_options, this.options || {});
    this.editor = $('#' + this.id).jsoneditor(options);
    if (values) {
      if (_.isString(values)) {
        values = JSON.stringify(values);
      }
      this.editor.setValue(values);
    }
  }
  dlg.prototype.close = function() {
    this.editor && this.editor.destroy();
    layer.close(this.layer_id);
  }
  return dlg;
});