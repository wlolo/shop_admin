<?php
namespace wlo_o\shop\admin;

use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Facades\Admin;
use Encore\Admin\Layout\Content;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\ModelForm;
/**
 * 商品管理
 *
 * @author wlo_o
 */
class GoodsController extends Controller {
    use ModelForm;

    protected $title = '商品';
    protected $is_on_sale = [
        'on'  => ['value' => 1, 'text' => '上架', 'color' => 'success'],
        'off' => ['value' => 0, 'text' => '下架', 'color' => 'default'],
    ];
    protected $is_no_show = [
        'on'  => ['value' => 0, 'text' => '显示', 'color' => 'success'],
        'off' => ['value' => 1, 'text' => '隐藏', 'color' => 'default'],
    ];
    protected $is_core = [
        'on'  => ['value' => 1, 'text' => '核心', 'color' => 'warning'],
        'off' => ['value' => 0, 'text' => '非核心', 'color' => 'default'],
    ];
    protected $is_package = [
        'off' => ['value' => 0, 'text' => '普通', 'color' => 'default'],
        'on'  => ['value' => 1, 'text' => '组包', 'color' => 'warning'],
    ];

    public function index() {
        return Admin::content(function (Content $content) {
            $content->header($this->title);
            $content->description('列表');
            $content->body($this->grid());
        });
    }

    public function edit($id) {
        Admin::script($this->script());
        return Admin::content(function (Content $content) use ($id) {
            $content->header($this->title);
            $content->description('修改');
            $content->body($this->form()->edit($id));
        });
    }

    public function create() {
        Admin::script($this->script());
        return Admin::content(function (Content $content) {
            $content->header($this->title);
            $content->description('新建');
            $content->body($this->form());
        });
    }

    protected function grid() {
        return Admin::grid(\wlo_o\shop\Goods::class, function (Grid $grid) {
            $is_core =  $this->is_core;
            $is_package = $this->is_package;
            $format_switch = function($val, $switch_kv) {
                $arg = null;
                foreach (array_values($switch_kv) as $item) {
                    if ($item['value'] === intval($val)){
                       $arg = $item;
                       break;
                    }
                }
                if (!$arg) { return $val; }
                $color = 'label-' . array_get($arg, 'color', '');
                $str = array_get($arg, 'text', '');
                return "<span class=\"label $color\">$str</span>";
            };
            $grid->model()->orderBy('goods_id', 'desc');
            $grid->goods_id('商品ID')->sortable();
            $grid->goods_sn('编码');
            $grid->goods_name('名称');
            $grid->is_package('是否组包')->display(function($text) use($is_package, $format_switch){
                return $format_switch($text, $is_package);
            });
            $grid->goods_thumb('缩略图')->image('http://localhost/uploads/',80,80);
            $grid->is_core('核心商品')->display(function($text) use ($is_core, $format_switch){
                return $format_switch($text, $is_core);
            });
            $grid->is_on_sale('上架')->switch($this->is_on_sale);
            $grid->is_no_show('显示')->switch($this->is_no_show);
            $grid->disableExport();//禁用导出
            $grid->tools(function ($tools) {
                $tools->batch(function ($batch) {
                    $batch->disableDelete();//禁用批量删除
                });
            });
        });
    }
    
    protected function form() {
        return Admin::form(\wlo_o\shop\Goods::class, function (Form $form) {
            $form->text('goods_sn', '商品编码');
            $form->text('goods_name', '商品名称');
            $form->text('shop_price', '商城价格');
            $form->text('market_price', '市场价格');
            $form->switch('is_package', '组包商品')->states($this->is_package);
            $form->switch('is_core', '核心商品')->states($this->is_core);
            $form->switch('is_on_sale', '上架')->states($this->is_on_sale);
            $form->switch('is_no_show','显示')->states($this->is_no_show);
            $form->image('original_img', '原图')->move(date('Ym'));
            $form->image('goods_thumb', '缩略图')->move(date('Ym'));
            $form->text('rebate_agent', '返利');
            $form->text('rebate_fenxiao', '推广金');
            $form->datetime('on_sale_time', '上架时间');
            $form->datetime('off_sale_time', '下架时间');
//            $form->hidden('package_json', '组包明细')->attribute(['id'=>'package_json']);
            $form->textarea('package_json', '组包明细')->attribute(['id'=>'package_json']);
            $form->hidden('update_time');
            $form->html($this->datatables_html());
        });
    }
    
    protected function script() {
        return <<<SCRIPT
        $.getScript('/vendor/shop/requirejs/require.js').done(function() {
            $.getScript('/vendor/shop/shop_admin/bll/goods.js');
        });
SCRIPT;
    }
    
    protected function datatables_html() {
        return <<<HTML
<div id="dt_wrap" style="display:none;">
    <div class="btn-group pull-left" style="margin-right: 10px">
        <a href="javascript:" class="btn btn-sm btn-success" id="addRow">
            <i class="fa fa-table"></i>&nbsp;&nbsp;新增行
        </a>
    </div>
    <table id="dt" style="width:100%">
            <thead>
                    <tr>
                        <th>商品编码</th>
                        <th>规格</th>
                        <th>数量</th>
                        <th>赠品</th>
                        <th>价格</th>
                        <th>返利</th>
                        <th>推广金</th>
                        <th>库存id</th>
                    </tr>
            </thead>
            <tfoot>
                    <tr>
                        <th>商品编码</th>
                        <th>规格</th>
                        <th>数量</th>
                        <th>赠品</th>
                        <th>价格</th>
                        <th>返利</th>
                        <th>推广金</th>
                        <th>库存id</th>
                    </tr>
            </tfoot>
    </table>
</div>
HTML;
    }
}
