define('goods', ['jquery', '_', 'layer', '/vendor/shop/shop_admin/bll/goods_package_editor.js', 'json-editor', 'datatables.net-bs'], 
function($, _, layer, dlg) {
    $(document).on('pjax:end', function() {
        NProgress.done();
        bootUp();
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
            };
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
                    "title": "商品编码"
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
                "is_gift": {
                    "type": "integer",
                    "title": "是否赠品",
                    "default": 0,
                    "enum": [0, 1],
                    "options": {
                        "enum_titles": ["普通商品", "赠品"]
                    }
                },
                "rebate_agent":	{
                    "type": "number",
                    "title": "返利",
                    "default": 0
                },
                "stock_id": {
                    "type": "integer",
                    "title": "库存 id"
                }
            }
        };
    }
    
    bootUp();
});

requirejs(['/vendor/shop/config.js'], function() {
    requirejs(['goods']);
});