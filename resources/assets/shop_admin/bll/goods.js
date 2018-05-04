define('goods', ['jquery', 'datatables'], function($) {
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
    var dt_options = {
        searching: false,
        paging: false,
        oLanguage: {
            sUrl: '/vendor/shop/shop_admin/common/datatable_cn.js'
        }
    };
    var dt = $('#dt').DataTable(dt_options), counter = 1, columns = $('#dt thead tr th').length;;
    $('#addRow').on( 'click', function () {
        var data = Array.apply(null, Array(columns)).map(function(item, i) {
            return `${counter}.${i+1}`;
        });
        dt.row.add(data).draw( false );
 
        counter++;
    } );
});

requirejs(['/vendor/shop/config.js'], function(){
    requirejs(['goods']); 
});