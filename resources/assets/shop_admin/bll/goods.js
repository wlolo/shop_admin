define('goods', ['jquery', 'datatables.net-bs'], function($) {
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
            {data: 'goods_attr'},
            {data: 'goods_number'},
            {data: 'is_gift'},
            {data: 'goods_price'},
            {data: 'rebate_agent'},
            {data: 'rebate_share'},
            {data: 'stock_id'}
        ];
    var dt_options = {
        searching: false,
        paging: false,
        info: false,
        oLanguage: {
            sUrl: '/vendor/shop/shop_admin/common/datatable_cn.json'
        },
        columns: dt_columns
    };
    var dt = $('#dt').DataTable(dt_options), counter = 1, columns = $('#dt thead tr th').length;;
    $('#addRow').click(function () {
        debugger;
        var _data = {};
        dt_columns.forEach(function(item) {
            _data[item.data] = '-';
        })
        dt.row.add(_data).draw( false );
        counter++;
    });
    $('#getRow').click(function() {
        console.log(dt.rows().data());
    });
});

requirejs(['/vendor/shop/config.js'], function(){
    requirejs(['goods']); 
});