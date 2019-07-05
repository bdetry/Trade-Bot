"use strict";
const CoinBaseCurrencySchema_1 = require("../Models/Schemas/CoinBaseCurrencySchema");
const CoinBaseAccountSchema_1 = require("../Models/Schemas/CoinBaseAccountSchema");
const mongoose = require("mongoose");
/**
 * Main service data
 * */
class LocalDataService {
    /**
     * Get last currency infomation
     * @param currencyInfo
     */
    GetLastCurrencyInfo() {
        const Currency = mongoose.model('CoinBaseCurrency', CoinBaseCurrencySchema_1.CoinBaseCurrencySchema);
        return Currency.find().sort({ date: -1 }).limit(1);
    }
    /**
     * Get last acounts information
     * */
    GetLastAccountsInfo() {
        const Account = mongoose.model('CoinBaseAccount', CoinBaseAccountSchema_1.CoinBaseAccountSchema);
        return Account.find().sort({ date: -1 }).limit(2);
    }
    /**
     * Save currency infomation
     * @param currencyInfo
     */
    SaveCurrencyInfo(currencyInfo) {
        const Currency = mongoose.model('CoinBaseCurrency', CoinBaseCurrencySchema_1.CoinBaseCurrencySchema);
        return new Currency(currencyInfo).save();
    }
    /**
     * Save account information
     * @param account
     */
    SaveAccountInfo(account) {
        const Account = mongoose.model('CoinBaseAccount', CoinBaseAccountSchema_1.CoinBaseAccountSchema);
        return new Account(account).save();
    }
}
module.exports = LocalDataService;
//# sourceMappingURL=LocalDataService.js.map