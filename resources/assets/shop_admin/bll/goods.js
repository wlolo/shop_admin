define('goods', ['jquery', 'layer-mobile','datatables.net-bs'], function($, layer) {
    var $is_package = $('input.is_package[type=hidden]'),
        $pakcage_json = $('#package_json'),
        $dt = $('#dt_wrap');
    $is_package.val() === 'on' && $dt.show();
    $is_package.on('change', function() {
        if ($(this).val() === 'on') {
            $dt.show();
        } else {
            $pakcage_json.val('');
            $dt.hide();
        }
    });
    var dt_columns = [
            {data: 'goods_sn'},
            {data: 'goods_attr', orderable: false},
            {data: 'goods_number'},
            {data: 'goods_price'},    
            {data: 'is_gift'},
            {data: 'rebate_agent', orderable: false},
            {data: 'rebate_share', orderable: false},
            {data: 'stock_id', orderable: false},
            {data: null}
        ];
    var default_data = {goods_sn: '', goods_attr: '', goods_number: 0, goods_price: 0, is_gift: 0, rebate_agent: 0, rebate_share: 0, stock_id: 0};
    var data = $.parseJSON($('#package_json').val() || '[]');
    for (var i=0; i < data.length; i++) {
	data[i] = $.extend({}, default_data, data[i]);
    }
    var dt_options = {
        data: data,
        searching: false,
        paging: false,
        info: false,
        oLanguage: {
            sUrl: '/vendor/shop/shop_admin/common/datatable_cn.json'
        },
        columns: dt_columns,
        columnDefs: [{
            targets:   -1,
            data: null,
            orderable: false,
            defaultContent: `
<span class="pull-right dd-nodrag">
    <a class="row_edit"><i class="fa fa-edit"></i></a>
    <a class="row_remove"><i class="fa fa-remove"></i></a>
</span>`
        }]
    };
    var dt = $('#dt').DataTable(dt_options);
    $('#dt tbody').on('click', '.row_remove', function() {
        var me = $(this);
        layer.open({
            content: '确认删除？'
            ,btn: ['删除', '取消']
            ,yes: function(index){
                layer.close(index);
                dt.row(me.parents('tr')).remove().draw();
                $pakcage_json.val(JSON.stringify[dt.rows().data()]);
            }
        });
    }).on('click', '.row_edit', function() {
        
    });
    setTimeout(function(){
        dt.on('order.dt', refreshPakcageJson);
    }, 0);
    $('#addRow').click(function () {
        var _data = {};
        dt_columns.forEach(function(item) {
            _data[item.data] = '&nbsp;';
        });
        dt.row.add(_data).draw( false );
    });
    $('#getRow').click(function() {
        console.log(dt.rows().data());
    });
    function refreshPakcageJson() {
        $pakcage_json.val(JSON.stringify(dt.rows().data().toArray()));
    }
});

requirejs(['/vendor/shop/config.js'], function(){
    requirejs(['goods']); 
});