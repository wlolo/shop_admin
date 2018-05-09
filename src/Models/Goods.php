<?php

namespace wlo_o\shop;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Goods
 *
 * @author wlo_o
 */
class Goods extends Model{
    public $table = 'shop_goods';
    protected $primaryKey = 'goods_id';
    public $guarded = ['goods_id'];
    public $timestamps = false;
    
    static public $base_columns = ['goods_id', 'goods_sn', 'goods_name'];
}
