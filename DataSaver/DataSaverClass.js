"use strict";
const LocalDataService = require("../Services/LocalDataService");
const CoinBaseProService = require("../Services/CoinBaseProService");
const SpreadsheetService = require("../Services/SpreadsheetService");
/**
 * Class build to save data
 * */
class DataSaverClass {
    constructor() {
        this.saverService = new LocalDataService();
        this.coinBaseProService = new CoinBaseProService();
        this.spreadsheetService = new SpreadsheetService();
    }
    LogActionData() {
        try {
            this.spreadsheetService.Init();
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * Place a purchase/sell order to coinbasepro
     * @param order
     */
    PlaceOrder(order) {
        let header = this.coinBaseProService.GetRequestHeaders("/orders", JSON.stringify(order), "POST");
        return this.coinBaseProService.Request("/orders", header, "POST", order);
    }
    /**
     * Save currency info to db
     * @param currency CoinBaseCurrency
     */
    SaveCurrency(currency) {
        return this.saverService.SaveCurrencyInfo(currency);
    }
    /**
     * Save account info to db
     * @param account CoinBaseAccount
     */
    SaveAccount(account) {
        return this.saverService.SaveAccountInfo(account);
    }
}
module.exports = DataSaverClass;
//# sourceMappingURL=DataSaverClass.js.map