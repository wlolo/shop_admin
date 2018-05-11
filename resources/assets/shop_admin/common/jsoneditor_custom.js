// 扩展 jsonEditor 对 select2 初始化与赋值做特殊处理，规避数据无法填充，取值为空的问题
define(['shop_util','json-editor'], function(util) {
  JSONEditor.defaults.editors.select.prototype.onInputChange = function() {
    var val = this.input.value;
    var new_val;
    if(this.enum_options.indexOf(val) === -1) {
      // select2 为 ajax 方式加载数据时,不对现有数据进行效验，直接赋值
      if(util.deepFind(this.schema, 'options.select2_options.ajax')) {
        new_val = val;
      }else{
        new_val = this.enum_values[0];
      }
    } else {
      new_val = this.enum_values[this.enum_options.indexOf(val)];
    }
    if(new_val === this.value) return;
    this.value = new_val;
    this.onChange(true);
  }
  JSONEditor.defaults.editors.select.prototype.setValue =  function(value,initial) {
      value = this.typecast(value||'');
      var sanitized = value, fire = 0;
      if(this.enum_values.indexOf(sanitized) < 0) {
        //select2为 ajax 方式加载数据时,所赋值不在 enum 数组中则默认追加一个对应元素
        if(util.deepFind(this.schema, 'options.select2_options.ajax')) {
          fire = 1;
          this.enum_options.push(sanitized);
          this.enum_values.push(sanitized);
          this.select2.append(new Option(sanitized, sanitized, true, true)).trigger('change');
        }else{
          sanitized = this.enum_values[0];//原有逻辑
        }
      }
      if(this.value === sanitized) {
        return;
      }
      this.input.value = this.enum_options[this.enum_values.indexOf(sanitized)];
      if(this.select2 && !fire) this.select2.select2('val',this.input.value);
      this.value = sanitized;
      this.onChange();
    };
})