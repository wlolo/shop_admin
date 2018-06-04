(function storeDesignModule(factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
            define(["jquery"], factory);
	}
	else {
            window["StoreDesign"] = factory();
	}
})(function storeDesignFactory($) {
    if (typeof window == "undefined" || !window.document) {
        return function storeDesignError() {
            throw new Error("storeDesign.js requires a window with a document");
        };
    }
    function StoreDesign(el, options) {
        
    }
    function baseModule(){
        
    }
    StoreDesign.prototype = {
        constructor: Sortable,
        destroy: function(){
            
        }
    };
});