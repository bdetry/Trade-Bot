"use strict";
const CoinBaseCurrencySchema_1 = require("../Models/Schemas/CoinBaseCurrencySchema");
const mongoose = require("mongoose");
class DataSaverService {
    SaveCurrencyInfo(currencyInfo) {
        const Currency = mongoose.model('CoinBaseCurrency', CoinBaseCurrencySchema_1.CoinBaseCurrencySchema);
        return new Currency(currencyInfo).save();
    }
}
module.exports = DataSaverService;
//# sourceMappingURL=DataSaverService.js.map