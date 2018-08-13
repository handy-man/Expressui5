sap.ui.define([
	"templatepath/controller/baseController"
    ], function (BaseController) {
        "use strict";

        return BaseController.extend("ui5expresstemplate.controller.app", {
            onInit : function () {
            //We might usually do something in here such as set the screen to busy while we wait for our metadata etc.
            }
        });
    }
);