sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller,MessageToast) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.Booklist", {

    handleAddBook(oEvent) {
            // console.log("hello")
            if(!this.dialog){
                this.dialog = sap.ui.xmlfragment("createBookForm","org.ubb.books.view.create", this);
            }
            this.dialog.open();
    },
    getRouter : function () {
        return UIComponent.getRouterFor(this);
    }, 
    handelCancel(oEvent){
        this.dialog.close();
    },
    handelSave(){
        var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
        console.log(dateFormat)
        var isbn = sap.ui.getCore().byId("createBookForm--isbn").getValue();
        // console.log(isbn)
        var author = sap.ui.getCore().byId("createBookForm--author").getValue();
        var title = sap.ui.getCore().byId("createBookForm--title").getValue();
        var language = sap.ui.getCore().byId("createBookForm--language").getValue();
        var rawDate = sap.ui.getCore().byId("createBookForm--date1").getDateValue();
        console.log(rawDate)
        var total = sap.ui.getCore().byId("createBookForm--nrbooks").getValue();
        var available = sap.ui.getCore().byId("createBookForm--availablebooks").getValue();
   
        var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
        console.log(dateFormat)
        var date = new Date(rawDate);
        var dateFormatted = dateFormat.format(rawDate);

        var book = {
            "Isbn": isbn,
            "Title": title,
            "Author": author,
            "Language": language,
            "PublishDate": rawDate,
            "TotalNumberBooks": parseInt(total),
            "NumberBooksAvailable": parseInt(available)
        };

        console.log(book)
        this.odataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z801_LIBRARY_COIO_SRV/");
        this.odataModel.create('/Books', book);
        this.dialog.close();
        window.location.reload();


    },
    handleUpdate(oEvent){
        var oCurrentBook= oEvent.getSource().getBindingContext().getObject();
        console.log(oCurrentBook)
        var isbn = oCurrentBook.Isbn;
        var author = oCurrentBook.Author;
        var title = oCurrentBook.Title;
        var language = oCurrentBook.Language;
        var date = oCurrentBook.PublishDate;
        var nrbooks = oCurrentBook.TotalNumberBooks;
        var nravailable = oCurrentBook.NumberBooksAvailable;
        console.log(isbn)
        console.log(author)
        console.log(title)
        console.log(language)
        console.log(date)
        console.log(nrbooks)
        console.log(nravailable)
        
        if(!this.dialog){
            this.dialog = sap.ui.xmlfragment("updateBook", "org.ubb.books.view.update", this);
        }
        this.dialog.open();
        // this.dialog = sap.ui.xmlfragment("updateBook", "org.ubb.books.view.update", this);
        // this.dialog.open();

        var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd/MM/yyyy" });
        var date1 = new Date(date);
        var dateFormatted = dateFormat.format(date1);

        sap.ui.getCore().byId("updateBook--isbn").setValue(isbn);
        sap.ui.getCore().byId("updateBook--title").setValue(title);
        sap.ui.getCore().byId("updateBook--author").setValue(author);
        sap.ui.getCore().byId("updateBook--language").setValue(language);
        sap.ui.getCore().byId("updateBook--date1").setValue(dateFormatted);
        sap.ui.getCore().byId("updateBook--nrbooks").setValue(nrbooks);
        sap.ui.getCore().byId("updateBook--availablebooks").setValue(nravailable);
        // console.log(isbn)


    },
    handleUpdatePress(){
        // var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
        // console.log(dateFormat)
        var isbn = sap.ui.getCore().byId("updateBook--isbn").getValue();
        // console.log(isbn)
        var author = sap.ui.getCore().byId("updateBook--author").getValue();
        var title = sap.ui.getCore().byId("updateBook--title").getValue();
        var language = sap.ui.getCore().byId("updateBook--language").getValue();
        var rawDate = sap.ui.getCore().byId("updateBook--date1").getDateValue();
        console.log(rawDate)
        var total = sap.ui.getCore().byId("updateBook--nrbooks").getValue();
        var available = sap.ui.getCore().byId("updateBook--availablebooks").getValue();
   
        var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
        console.log(dateFormat)
        var date = new Date(rawDate);
        var dateFormatted = dateFormat.format(rawDate);

        var book = {
            "Isbn": isbn,
            "Title": title,
            "Author": author,
            "Language": language,
            "PublishDate": rawDate,
            "TotalNumberBooks": parseInt(total),
            "NumberBooksAvailable": parseInt(available)
        };
        console.log(book)
        
        this.odataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z801_LIBRARY_COIO_SRV/");
        this.odataModel.update("/Books('" + isbn + "')", book, null, function () {
            MessageToast.show(" Update Succesful")
        }, function () {
            MessageToast.show("Error");
        }
        );
        // this.odataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z801_LIBRARY_COIO_SRV/");
        // this.odataModel.create('/Books', book);
        this.dialog.close();
        window.location.reload();

    },

    handleDelete(oEvent){
        var oCurrentBook= oEvent.getSource().getBindingContext().getObject();
        console.log(oCurrentBook)
        var isbn = oCurrentBook.Isbn;
        console.log(isbn)
        this.odataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z801_LIBRARY_COIO_SRV/");
        this.odataModel.remove("/Books('" + isbn + "')", null, function () {
            MessageToast.show("Succesful")
        }, function () {
            MessageToast.show("Error");
        }
        );
        window.location.reload();


    },
    onPress(oEvent){
        console.log("press")
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("borrowedlist");
    },
    onPressSearch(oEvent){
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("search");

    },
       
    });
 });