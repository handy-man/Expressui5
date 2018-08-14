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
		 * Called when we hit the route "secondView" as defined in the onInit function.
		 * Typically where we might make some ODATA calls if we've not been able to do direct binding to the view etc.
		 */
		_onRouteMatched: function(oEvent){
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			var sObjectId =  oEvent.getParameter("arguments").objectId;
			console.log(sObjectId);
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

		showSubDetail: function(){
			this.getModel("appView").setProperty("/layout", "ThreeColumnsEndExpanded");
			this.getRouter().navTo("subDetail", {
				objectId : "Nathan"
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