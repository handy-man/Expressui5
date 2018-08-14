sap.ui.define([
	"templatepath/controller/baseController",
	"sap/ui/model/json/JSONModel"
], function(baseController, JSONModel) {
	"use strict";

	return baseController.extend("ui5expresstemplate.controller.master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 */
		onInit: function() {
			this.getRouter().getRoute("master").attachMatched(this._onRouteMatched, this);

		},

		_onRouteMatched: function(oEvent){
			this.getModel("appView").setProperty("/layout", "OneColumn");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 */
		onBeforeRendering: function() {

		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 */
		onAfterRendering: function() {

		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 */
		onExit: function() {

		},

		onSelectionChange: function(oEvent){
			var oList = oEvent.getSource();
			var sObject = oList.getSelectedItem().getBindingContext("northwind").getObject();
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			this.getRouter().navTo("detail", {
				objectId : sObject.CustomerID
			});
		}
	});
});