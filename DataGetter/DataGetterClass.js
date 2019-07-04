"use strict";
const CoinBaseProService = require("./../Services/CoinBaseProService");
const LocalDataService = require("../Services/LocalDataService");
/**
 * Class that gets metadatas
 * */
class DataGetterClass {
    constructor() {
        this.service = new CoinBaseProService();
        this.localStorage = new LocalDataService();
    }
    /**
     * Get last store price
     * */
    GetLocalPrice() {
        return this.localStorage.GetLastCurrencyInfo();
    }
    /**
     * Get last stored accounts
     * */
    GetLocalAccounts() {
        return this.localStorage.GetLastAccountsInfo();
    }
    /**
     * Send get request to coinbase pro
     * @param forPath route of request
     */
    GetFromCoinBase(forPath) {
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
        return this.GetFromCoinBase('/products/' + keyPair + '/book');
    }
    /**
     * Get coinbase account
     * @param accountID id
     */
    GetAccount(accountID) {
        return this.GetFromCoinBase('/accounts/' + accountID);
    }
    /**
     * Get coinbase accounts
     * @param accountID id
     */
    GetAccounts() {
        return this.GetFromCoinBase('/accounts');
    }
}
module.exports = DataGetterClass;
//# sourceMappingURL=DataGetterClass.js.map