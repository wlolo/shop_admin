<?php

namespace wlo_o\shop\admin;

use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Facades\Admin;
use Encore\Admin\Layout\Content;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\ModelForm;
use wlo_o\shop\Activity;
use Illuminate\Support\Facades\Input;

/**
 * 活动页面
 * @author wlo_o
 */
class ActivityController extends Controller{
    use ModelForm;
    protected $title = '活动';
    
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
    public function module_preview(Request $request) {
        return response()->json(['hi'=>'wlo_o']);
    }
    protected function grid() {
        return Admin::grid(Activity::class, function (Grid $grid) {
            $grid->model()->orderBy('activity_id', 'desc');
            $grid->activity_id('活动ID')->sortable();
            $grid->activity_sn('编码');
            $grid->activity_title('标题');
            $grid->activity_desc('活动描述');
            $grid->activity_logo('活动图片')->image('http://localhost/uploads/', 80, 80);
            $grid->activity_begin_time('开始时间');
            $grid->activity_end_time('结束时间');
            $grid->disableExport();//禁用导出
            $grid->tools(function ($tools) {
                $tools->batch(function ($batch) {
                    $batch->disableDelete();//禁用批量删除
                });
            });
        });
    }
    
    protected function form() {
        return Admin::form(Activity::class, function (Form $form) {
            $form->tab('活动信息', function($form) {
                $form->text('activity_sn', '活动编码')->attribute(['id' => 'activity_sn']);
                $form->text('activity_title', '活动名称');
                $form->text('activity_desc', '活动描述');
                $form->image('activity_logo', '活动图片')->move(date('Ym'));
                $form->datetime('activity_begin_time', '开始时间');
                $form->datetime('activity_end_time', '结束时间');
                $form->textarea('activity_remark', '备注')->rows(5);
                $form->text('view_path', '模板地址')->placeholder('留空使用默认模板');    
            })->tab('活动配置', function($form) {
                $form->text('extension_json', '扩展信息')->attribute(['id'=>'extension_json']);
                $form->html($this->extendsion_json_html());
            });
            $form->saving(function (Form $form) {
                if(blank($form->activity_sn)){
                    $form->activity_sn = str_random(10);
                }
            });
        });
    }
    protected function script() {
        return <<<SCRIPT
        $.getScript('/vendor/shop/requirejs/require.js').done(function() {
            $.getScript('/vendor/shop/shop_admin/bll/activity.js');
        });
SCRIPT;
    }
    protected function extendsion_json_html() {
        return <<<HTML
<div id="extendsion_json_editor"></div>
HTML;
    }
}
