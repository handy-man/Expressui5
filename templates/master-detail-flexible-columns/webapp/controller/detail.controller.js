sap.ui.define([
	"templatepath/controller/baseController"
], function(baseController) {
	"use strict";

	return baseController.extend("ui5expresstemplate.controller.detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 */
		onInit: function() {
			this.getRouter().getRoute("detail").attachMatched(this._onRouteMatched, this);
		},

		/**
		 * Called when we hit the route "detail" as defined in the onInit function.
		 * Typically where we might make some ODATA calls if we've not been able to do direct binding to the view etc.
		 */
		_onRouteMatched: function(oEvent){
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			var sObjectId =  oEvent.getParameter("arguments").objectId;
			this.getModel("northwind").metadataLoaded().then( function() {
				var sObjectPath = this.getModel("northwind").createKey("Customers", {
					CustomerID :  sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

			/**
			 * Binds the view to the object path. Makes sure that detail view displays
			 * a busy indicator while data for the corresponding element binding is loaded.
			 * @function
			 * @param {string} sObjectPath path to the object to be bound to the view.
			 * @private
			 */
			_bindView : function (sObjectPath) {
				// Set busy indicator during view binding
				//var oViewModel = this.getModel("detailView");

				// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
				//oViewModel.setProperty("/busy", false);

				this.getView().bindElement({
					path : sObjectPath,
					model: "northwind", //only required if using a named model, remove if not using.
					events: {
						change : this._onBindingChange.bind(this),
						dataRequested : function () {
							//oViewModel.setProperty("/busy", true);
						},
						dataReceived: function () {
							//oViewModel.setProperty("/busy", false);
						}
					},parameters:{
						expand: "Orders"
					}
				});
			},

			_onBindingChange : function () {
				var oView = this.getView(),
					oElementBinding = oView.getElementBinding();

				// No data for the binding
				if (!oElementBinding.getBoundContext()) {
					//this.getRouter().getTargets().display("detailObjectNotFound");
					// if object could not be found, the selection in the master list
					// does not make sense anymore.
					this.getOwnerComponent().oListSelector.clearMasterListSelection();
					return;
				}
				var sPath = oElementBinding.getPath(),
					oResourceBundle = this.getResourceBundle(),
					oObject = oView.getModel().getObject(sPath),
					sObjectId = oObject.ObjectID,
					sObjectName = oObject.Name,
					oViewModel = this.getModel("detailView");

				this.getOwnerComponent().oListSelector.selectAListItem(sPath);

				oViewModel.setProperty("/shareSendEmailSubject",
					oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
				oViewModel.setProperty("/shareSendEmailMessage",
					oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
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
			this.getModel("appView").setProperty("/layout", "ThreeColumnsEndExpanded");
			this.getRouter().navTo("subDetail", {
				objectId : sObject.CustomerID,
				orderId: sObject.OrderID
			});
		},

		/**
		 * Toggle between full and non full screen mode.
		*/
		toggleFullScreen: function () {
			var bFullScreen = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
			if (!bFullScreen) {
				// store current layout and go full screen
				this.getModel("appView").setProperty("/previousLayout", this.getModel("appView").getProperty("/layout"));
				this.getModel("appView").setProperty("/layout", "MidColumnFullScreen");
			} else {
				// reset to previous layout
				this.getModel("appView").setProperty("/layout",  this.getModel("appView").getProperty("/previousLayout"));
			}
		},

		onCloseDetailPress: function(){
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
			this.getRouter().navTo("master");
		}
	});
});