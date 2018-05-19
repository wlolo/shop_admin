<?php

namespace wlo_o\shop;

use Illuminate\Database\Eloquent\Model;
/**
 * 活动页面
 *
 * @author wlo_o
 */
class Activity extends Model {
    public $table = 'shop_activity';
    protected $primaryKey = 'activity_id';
    public $guarded = ['activity_id'];
    public $timestamps = false;
}
