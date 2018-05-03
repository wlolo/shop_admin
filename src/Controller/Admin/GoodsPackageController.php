<?php
namespace wlo_o\shop\admin;

use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Facades\Admin;
use Encore\Admin\Layout\Content;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\ModelForm;

/**
 * 组包商品管理
 */
class GoodsPackageController extends GoodsController {
    
    protected $title = '组包商品';
    
    protected function form() {
        return Admin::form(\wlo_o\shop\Goods::class, function (Form $form) {
            $form->text('goods_sn', '商品编码');
            $form->text('goods_name', '商品名称');
            $form->text('shop_price', '商城价格');
            $form->text('market_price', '市场价格');
            $form->display('is_package', '组包商品');
            $form->switch('is_core', '核心商品')->states($this->is_core);
            $form->switch('is_on_sale', '上架')->states($this->is_on_sale);
            $form->switch('is_no_show','显示')->states($this->is_no_show);
            $form->image('original_img', '原图')->move(date('Ym'));
            $form->image('goods_thumb', '缩略图')->move(date('Ym'));
            $form->text('rebate_agent', '返利');
            $form->text('rebate_fenxiao', '推广金');
        });
    }
    
    protected function gridDefaultFilter($grid) {
        $grid->model()->where('is_package', '=', 1);
    }
}
