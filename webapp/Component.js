sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/HashChanger"
 ], function (UIComponent, JSONModel,HashChanger) {
    "use strict";
    return UIComponent.extend("org.ubb.books.Component", {
      metadata : {
			manifest : "json"
		},
		init : function () {
			// call the init function of the parent
         // HashChanger.getInstance().replaceHash("");
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},
    });
 });