<?php

namespace wlo_o\shop;

use Illuminate\Support\ServiceProvider;

class ShopServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot() {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'shop');
        if ($this->app->runningInConsole()) {
            $this->publishes([__DIR__.'/../resources/assets' => public_path('vendor/shop')], 'shop-assets');
        }
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register() {
        include __DIR__.'/routes.php';        
    }
}
