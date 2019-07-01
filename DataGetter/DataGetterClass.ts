import CoinBaseProService = require("./../Services/CoinBaseProService");

/**
 * Class that gets metadatas
 * */
class DataGetterClass {
    
    private service: CoinBaseProService;

    constructor() {
        this.service = new CoinBaseProService();
    }

    /**
     * Send get request to coinbase pro
     * @param forPath route of request
     */
    public Get(forPath: string) : Promise<any> {
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
        return this.Get('/products/' + keyPair + '/book');
    }

    /**
     * Get coinbase account
     * @param accountID id
     */
    public GetAccount(accountID : string): Promise<any> {
        return this.Get('/accounts/' + accountID);
    }

    /**
     * Get coinbase accounts
     * @param accountID id
     */
    public GetAccounts(): Promise<any> {
        return this.Get('/accounts');
    }

}

export = DataGetterClass;