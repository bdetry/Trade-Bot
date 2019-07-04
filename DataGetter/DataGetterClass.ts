import CoinBaseProService = require("./../Services/CoinBaseProService");
import { CoinBaseCurrencySchema } from "../Models/Schemas/CoinBaseCurrencySchema";
import { CoinBaseAccount } from "../Models/CoinBaseAccount";
import { CoinBaseCurrency } from "../Models/CoinBaseCurrency";
import { CoinBaseAccountSchema } from "../Models/Schemas/CoinBaseAccountSchema";
import * as mongoose from 'mongoose'
import LocalDataService = require("../Services/LocalDataService");

/**
 * Class that gets metadatas
 * */
class DataGetterClass {
    
    private service: CoinBaseProService;
    private localStorage: LocalDataService;

    constructor() {
        this.service = new CoinBaseProService();
        this.localStorage = new LocalDataService();       
    }

    /**
     * Get last store price
     * */
    public GetLocalPrice(): mongoose.DocumentQuery<CoinBaseCurrency[], CoinBaseCurrency, {}> {
        return this.localStorage.GetLastCurrencyInfo();
    }

    /**
     * Get last stored accounts
     * */
    public GetLocalAccounts(): mongoose.DocumentQuery<CoinBaseAccount[], CoinBaseAccount, {}> {
        return this.localStorage.GetLastAccountsInfo();
    }          

    /**
     * Send get request to coinbase pro
     * @param forPath route of request
     */
    private GetFromCoinBase(forPath: string) : Promise<any> {
        let method = "GET";
        let body = '';
        let header = this.service.GetRequestHeaders(forPath, body , method);     
        return this.service.Request(forPath, header, method);
    }

    /**
     * Get currency price 
     * @param keyPair examle 'BTC-USD'
     */
    public GetCurrencyPrice(keyPair: string): Promise<any> {
        return this.GetFromCoinBase('/products/' + keyPair + '/book');
    }

    /**
     * Get coinbase account
     * @param accountID id
     */
    public GetAccount(accountID : string): Promise<any> {
        return this.GetFromCoinBase('/accounts/' + accountID);
    }

    /**
     * Get coinbase accounts
     * @param accountID id
     */
    public GetAccounts(): Promise<any> {
        return this.GetFromCoinBase('/accounts');
    }

}

export = DataGetterClass;