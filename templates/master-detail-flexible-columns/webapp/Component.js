sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"templatepath/model/models",
	"templatepath/util/ListSelector",

], function(UIComponent, Device, models, ListSelector) {
	"use strict";

	return UIComponent.extend("ui5expresstemplate.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			//List Selector from the master-detail template provided by SAP.
			this.oListSelector = new ListSelector();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

	        //Initialise the router
			 this.getRouter().initialize();
		}
	});
});