sap.ui.define([
    "templatepath/controller/baseController",
    "sap/ui/model/json/JSONModel"
    ], function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("ui5expresstemplate.controller.app", {
            onInit : function () {
            //We might usually do something in here such as set the screen to busy while we wait for our metadata etc.
            var oViewModel = new JSONModel({
                busy : false,
                delay : 0,
                layout : "OneColumn",
                previousLayout : "",
                actionButtonsInfo : {
                    midColumn : {
                        fullScreen : false
                    }
                }
            });
            this.setModel(oViewModel, "appView");
            }
        });
    }
);