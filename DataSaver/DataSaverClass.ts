import DataSaverService = require("../Services/DataSaverService");
import { CoinBaseCurrency } from "../Models/CoinBaseCurrency";


class DataSaverClass {

    private saverService: DataSaverService

    constructor() {
        this.saverService = new DataSaverService();
    }


    public SaveCurrency(currency: CoinBaseCurrency): Promise<any> {
        return this.saverService.SaveCurrencyInfo(currency);
    }
        
}

export = DataSaverClass