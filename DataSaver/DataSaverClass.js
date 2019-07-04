"use strict";
const DataSaverService = require("../Services/DataSaverService");
/**
 * Class build to save data
 * */
class DataSaverClass {
    constructor() {
        this.saverService = new DataSaverService();
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