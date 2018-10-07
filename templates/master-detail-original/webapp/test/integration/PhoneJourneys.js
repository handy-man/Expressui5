jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"templatepath/masterdetail/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"templatepath/masterdetail/test/integration/pages/App",
	"templatepath/masterdetail/test/integration/pages/Browser",
	"templatepath/masterdetail/test/integration/pages/Master",
	"templatepath/masterdetail/test/integration/pages/Detail",
	"templatepath/masterdetail/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ui5expresstemplate.masterdetail.view."
	});

	sap.ui.require([
		"templatepath/masterdetail/test/integration/NavigationJourneyPhone",
		"templatepath/masterdetail/test/integration/NotFoundJourneyPhone",
		"templatepath/masterdetail/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});