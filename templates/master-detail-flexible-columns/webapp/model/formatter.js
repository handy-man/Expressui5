sap.ui.define([], function () {
        "use strict";

        return {

            /**
             * Rounds the number unit value to 2 digits
             * @public
             * @param {string} sValue the number string to be rounded
             * @returns {string} sValue with 2 digits rounded
             */
            numberUnit: function (sValue) {
                if (!sValue) {
                    return "";
                }
                return parseFloat(sValue).toFixed(2);
            },

            /*
             * Converts currency codes, for example:
             * GBP->£
             * USD->$
             * etc etc.
             * */
            currencySymbol: function (sCurrCode) {
                var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
                var oLocale = new sap.ui.core.Locale(sBrowserLocale);
                var oLocaleData = new sap.ui.core.LocaleData(oLocale);
                return oLocaleData.getCurrencySymbol(sCurrCode);
            }
        };
    }
);