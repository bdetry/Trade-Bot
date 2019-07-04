import DataSaverService = require("../Services/DataSaverService");
import { CoinBaseCurrency } from "../Models/CoinBaseCurrency";
import { CoinBaseAccount } from "../Models/CoinBaseAccount";

/**
 * Class build to save data
 * */
class DataSaverClass {

    //service
    private saverService: DataSaverService

    constructor() {
        this.saverService = new DataSaverService();
    }

    /**
     * Save currency info to db
     * @param currency CoinBaseCurrency
     */
    public SaveCurrency(currency: CoinBaseCurrency): Promise<any> {
        return this.saverService.SaveCurrencyInfo(currency);
    }

    /**
     * Save account info to db
     * @param account CoinBaseAccount
     */
    public SaveAccount(account: CoinBaseAccount): Promise<any> {
        return this.saverService.SaveAccountInfo(account);
    }
        
}

export = DataSaverClass