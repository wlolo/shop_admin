<?php
use Illuminate\Routing\Router;
/**
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
    $router->get('goods/find', 'GoodsController@find');
    $router->resource('goods', 'GoodsController');
    $router->resource('activity', 'ActivityController');
});