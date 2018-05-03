<?php
use Illuminate\Routing\Router;
/**
 * Description of routes
 *
 * @author wlo_o
 */
Route::get('shop/{index?}','wlo_o\shop\CartController@index');



//后台
Route::group([
    'prefix'        => config('admin.route.prefix', 'admin'),
    'namespace'     => 'wlo_o\\shop\\admin',
    'middleware'    => config('admin.route.middleware', ['web', 'admin']),
], function (Router $router) {
    $router->resource('goods', 'GoodsController');
    $router->resource('goods_package', 'GoodsPackageController');
});