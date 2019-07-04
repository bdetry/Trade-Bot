"use strict";
const CoinBaseProService = require("./../Services/CoinBaseProService");
/**
 * Class that gets metadatas
 * */
class DataGetterClass {
    constructor() {
        this.service = new CoinBaseProService();
    }
    /**
     * Send get request to coinbase pro
     * @param forPath route of request
     */
    Get(forPath) {
        let method = "GET";
        let body = '';
        let header = this.service.GetRequestHeaders(forPath, body, method);
        return this.service.Request(forPath, header, method);
    }
    /**
     * Get currency price
     * @param keyPair examle 'BTC-USD'
     */
    GetCurrencyPrice(keyPair) {
        return this.Get('/products/' + keyPair + '/book');
    }
    /**
     * Get coinbase account
     * @param accountID id
     */
    GetAccount(accountID) {
        return this.Get('/accounts/' + accountID);
    }
    /**
     * Get coinbase accounts
     * @param accountID id
     */
    GetAccounts() {
        return this.Get('/accounts');
    }
}
module.exports = DataGetterClass;
//# sourceMappingURL=DataGetterClass.js.map