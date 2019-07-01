"use strict";
const DataSaverService = require("../Services/DataSaverService");
class DataSaverClass {
    constructor() {
        this.saverService = new DataSaverService();
    }
    SaveCurrency(currency) {
        return this.saverService.SaveCurrencyInfo(currency);
    }
}
module.exports = DataSaverClass;
//# sourceMappingURL=DataSaverClass.js.map