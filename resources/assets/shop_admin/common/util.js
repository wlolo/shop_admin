define(function() {
  return {
      deepFind:function (obj, path) {
          var paths = path.split('.'), current = obj, i;
          for (i = 0; i < paths.length; ++i) {
              if (current[paths[i]] == undefined) {
                  return undefined;
              } else {
                  current = current[paths[i]];
              }
          }
          return current;
      },
      getParamter: function(name) {//获取 url 参数
          var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
          var m = location.href.match(r);
          return (!m?"":m[2]);
      },
      s4: function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      },
      uuid: function() {
        var s4 = this.s4;
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
      }
  };
});