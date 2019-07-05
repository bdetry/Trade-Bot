"use strict";
const LocalDataService = require("../Services/LocalDataService");
const CoinBaseProService = require("../Services/CoinBaseProService");
const SpreadsheetService = require("../Services/SpreadsheetService");
const globals_1 = require("../globals");
/**
 * Class build to save data
 * */
class DataSaverClass {
    constructor() {
        this.saverService = new LocalDataService();
        this.coinBaseProService = new CoinBaseProService();
        this.spreadsheetService = new SpreadsheetService(globals_1.GlobalString.SPREADSHEETID);
    }
    /**
     * Log data on spread sheet
     * */
    LogActionData(trade) {
        this.spreadsheetService.Init().then(x => {
            this.spreadsheetService.Write(x, trade);
        }).catch(e => console.log(e));
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