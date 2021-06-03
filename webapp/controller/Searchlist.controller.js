sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
 ], function (Controller,History) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.Searchlist", {
    getRouter : function () {
            return UIComponent.getRouterFor(this);
    },

      onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("books", {}, true);
			}
		},
        checkout(oEvent){
            alert("hello")
            const aSelContexts = this.byId("bookTable").getSelectedContexts();
            console.log(aSelContexts)



            var myTable=sap.ui.getCore().byId("bookTable");
            var myTableRows=myTable.getRows();
            // var oCurrentBook= this.getView().byId("table").getSelectedItem();
            // var oEntry = oCurrentBook.getBindingContext().getProperty("Isbn");
            console.log(myTableRows)
            // this.getView().byId("isbn").setValue(oEntry);

        },

        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("books", {}, true);
			}
		},

       
    });


 });