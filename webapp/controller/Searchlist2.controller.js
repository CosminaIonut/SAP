sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
 ], function (Controller,Filter,FilterOperator, History, MessageToast) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.SearchList2", {
       
        onSearch(oEvent){

            var isbn = this.byId("isbn").getValue();
            var author = this.byId("author").getValue();
            var title = this.byId("title").getValue();
            var language = this.byId("language").getValue();
            var dateS = this.byId("datestart").getValue();
            var dateE = this.byId("dateend").getValue();
            
            console.log(isbn)
            console.log(author)
            console.log(title)
            console.log(language)
            console.log(dateS)
            console.log(dateE)
           

         var aFilter = [];
         var oList = this.getView().byId("searchBooks");
         var oBinding = oList.getBinding("items");

         if (language) {
            aFilter.push(new Filter("Language", FilterOperator.Contains, language));
        }
         if (isbn) {
             aFilter.push(new Filter("Isbn", FilterOperator.Contains, isbn))
         }
         if (author) {
             aFilter.push(new Filter("Author", FilterOperator.Contains, author));
         }
         if (title) {
             aFilter.push(new Filter("Title", FilterOperator.Contains, title));
         }
         if (dateS && dateE) {
            aFilter.push(new Filter("PublishDate", FilterOperator.BT, dateS, dateE));
         
         }else if(dateS) {
            aFilter.push(new Filter("PublishDate", FilterOperator.GE, dateS));
         }else if(dateE){
            aFilter.push(new Filter("PublishDate", FilterOperator.LE, dateE));
         }
         oBinding.filter(aFilter);
    
        },

        onClear: function(oEvent) {
            console.log("vfgd")
            this.byId("isbn").setValue("");
            this.byId("author").setValue("");
            this.byId("title").setValue("");
            this.byId("language").setValue("");
            this.byId("datestart").setValue("");
            this.byId("dateend").setValue("");
        },

        handleInsertCheckout(oEvent){
            var oCurrentBook= oEvent.getSource().getBindingContext().getObject();
            // console.log(oCurrentBook)
            var isbn = oCurrentBook.Isbn;
            var author = oCurrentBook.Author;
            var title = oCurrentBook.Title;
            var language = oCurrentBook.Language;
            var date1 = oCurrentBook.PublishDate;
            var nrbooks = oCurrentBook.NumberBooks;
            // console.log(isbn)
            // console.log(author)
            // console.log(title)
            // console.log(language)
            // console.log(date1)
            // console.log(nrbooks)

            if(nrbooks<=0){
                MessageToast.show("Not any available books")
            }else {
                var checkout = {
                    "Isbn": isbn,
                    "Title": title,
                    "Author": author,
                    "Language": language,
                    "PublishDate": date1,
                    "NumberBooks": parseInt(nrbooks)
                };
        
                // console.log(checkout)
    
              
                this.odataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z801_LIBRARY_COIO_SRV/");
                this.odataModel.create('/SearchBooks', checkout);
                MessageToast.show("Booked borrowed")
                
                window.location.reload('');
            

            }
            
        
            
        },
        onNavBack: function () {
            // console.log("jdfhsd")
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

