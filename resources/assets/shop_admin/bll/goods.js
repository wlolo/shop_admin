define('goods', ['jquery', '_', 'layer', '/vendor/shop/shop_admin/bll/goods_package_editor.js', 'json-editor', 'datatables.net-bs'], 
function($, _, layer, dlg) {
    $(document).on('pjax:start', function() { 
        NProgress.start();
    });
    $(document).on('pjax:end', function() {
        bootUp();
        NProgress.done();
    });
    function bootUp() {
        var editor = new dlg({schema: getSchema()});
        var $is_package = $('input.is_package[type=hidden]'),
            $pakcage_json = $('#package_json'), $dt = $('#dt_wrap');
        $is_package.val() === 'on' && $dt.show();
        $is_package.on('change', function() {
            if($(this).val() === 'on') {
                $dt.show();
            } else {
                $pakcage_json.val('');
                $dt.hide();
            }
        });
        var default_data = {}, dt_columns = [
            {data: 'goods_sn'},
            {data: 'goods_name'},
            {data: 'goods_attr', orderable: false},
            {data: 'goods_number'},
            {data: 'goods_price'},
            {data: 'is_gift'},
            {data: 'rebate_agent', orderable: false},
            {data: 'rebate_share', orderable: false},
            {data: 'stock_id', orderable: false},
            {data: null}
        ];
        _.each(dt_columns, function(o) { o.data && (default_data[o.data] = ''); });
        var data = $.parseJSON($pakcage_json.val() || '[]');
        for(var i=0; i < data.length; i++) {
            data[i] = $.extend({}, default_data, data[i]);
        }
        var dt_options = {
            data: data,
            searching: false,
            paging: false,
            info: false,
            oLanguage: { sUrl: '/vendor/shop/shop_admin/common/datatable_cn.json' },
            columns: dt_columns,
            columnDefs: [{
                targets:   -1,
                data: null,
                orderable: false,
                defaultContent: '<span class="pull-right dd-nodrag"><a class="row_edit"><i class="fa fa-edit"></i></a><a class="row_remove"><i class="fa fa-remove"></i></a></span>'
            }]
        };
        var dt = $('#dt').DataTable(dt_options);
        $('#dt tbody').on('click', '.row_remove', function() {
            var me = $(this), row = dt.row(me.parents('tr')), _data = row.data();
            var values = _.filter(_.values(_data), function(v) { return v;});
            if (values.length == 0) {
                return row.remove().draw();
            }
            layer.confirm('确认删除？', {
                btn: ['删除','取消']
              }, function() {
                row.remove().draw();
                refreshPakcageJson();
              });
        }).on('click', '.row_edit', function() {
            var row = dt.row($(this).parents('tr')), rowData = row.data();
            editor.show(rowData);
            editor.close = function(data) {
                row.data(data);
                refreshPakcageJson();
            };
            var node = editor.editor.getEditor('root.goods_sn');
            editor.editor.watch(node.path, function(){
                console.log(node.getValue());
            });
        });
        //异步绑定事件可规避初始化时清空数据
        setTimeout(function() {
            dt.on('order.dt', refreshPakcageJson);
        }, 0);
        $('#addRow').click(function() {
            dt.row.add(default_data).draw(false);
        });
        // 更新组包数据 json
        function refreshPakcageJson() {
            $pakcage_json.val(JSON.stringify(getData()));
        }
        function getData() {
            return dt.rows().data().toArray();
        }
    }
    
    function getSchema() {
        return {
            "title": "组包数据",
            "type": "object",
            "properties": {
                "goods_sn": {
                    "type": "string",
                    "title": "商品编码",
                    "enum":["",""],
                    "default": "",
                    "options":{
                        "select2_options" :{
                            ajax: {
                                url: '/admin/goods/find',
                                dataType: 'json',
                                delay: 300,
                                data: function (params) {
                                    var query = {
                                      goods_sn: params.term,
                                      page: params.page || 1,
                                      limit: 10
                                    };
                                    return query;
                                },
                                processResults: function(json, params) {
                                    params.page = params.page || 1;
                                    params.limit = params.limit || 10;
                                    var rs = _.map(json.data.data, function(o) {
                                        return $.extend({id: o.goods_sn, text: o.goods_name}, o);
                                    });
                                    var more = (params.page * params.limit) < json.data.total;
                                    return {results: rs, pagination: {more: more}};
                                },
                                cache: true
                            },
                            templateResult: function(repo) {
                                if (repo.loading) {
                                    return repo.text;
                                }
                                return repo.goods_sn + '  |  ' + repo.goods_name;
                            },
                            templateSelection: function(repo) {
                                return repo.id || repo.goods_sn;
                            }
                        }
                    }
                },
                "goods_name": {
                    "type": "string",
                    "title": "商品名称"
                },
                "goods_attr": {
                    "type": "string",
                    "title": "商品规格"
                },
                "goods_number":	{
                    "type": "integer",
                    "title": "商品数量",
                    "default":	1,
                    "minimum":	1
                },
                "goods_price":	{
                    "type": "integer", 
                    "title": "商品价格",
                    "default":	0,
                    "minimum":	0
                },
                "is_gift": {
                    "type": "integer",
                    "title": "是否赠品",
                    "default": 0,
                    "enum": [0, 1],
                    "options": {
                        "enum_titles": ["普通商品", "赠品"]
                    }
                },
                "rebate_share": {
                    "type": "number",
                    "title": "推广奖励",
                    "default": 0
                },
                "rebate_agent":	{
                    "type": "number",
                    "title": "返利",
                    "default": 0
                },
                "stock_id": {
                    "type": "integer",
                    "title": "库存 id",
                    'readonly': true
                }
            }
        };
    }
    
    bootUp();
});

requirejs(['/vendor/shop/config.js'], function() {
    requirejs(['goods']);
});