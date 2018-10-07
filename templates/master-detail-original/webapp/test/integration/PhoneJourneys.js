jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"ui5expresstemplate/masterdetail/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ui5expresstemplate/masterdetail/test/integration/pages/App",
	"ui5expresstemplate/masterdetail/test/integration/pages/Browser",
	"ui5expresstemplate/masterdetail/test/integration/pages/Master",
	"ui5expresstemplate/masterdetail/test/integration/pages/Detail",
	"ui5expresstemplate/masterdetail/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ui5expresstemplate.masterdetail.view."
	});

	sap.ui.require([
		"ui5expresstemplate/masterdetail/test/integration/NavigationJourneyPhone",
		"ui5expresstemplate/masterdetail/test/integration/NotFoundJourneyPhone",
		"ui5expresstemplate/masterdetail/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});