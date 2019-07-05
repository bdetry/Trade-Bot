﻿import LocalDataService = require("../Services/LocalDataService");
import { CoinBaseCurrency } from "../Models/CoinBaseCurrency";
import { CoinBaseAccount } from "../Models/CoinBaseAccount";
import { CoinBaseOrder } from "../Models/CoinBaseOrder";
import CoinBaseProService = require("../Services/CoinBaseProService");
import SpreadsheetService = require("../Services/SpreadsheetService");
import { GoogleSheetsCred } from "../Models/GoogleSheetsCred";

/**
 * Class build to save data
 * */
class DataSaverClass {

    private saverService: LocalDataService
    private coinBaseProService: CoinBaseProService
    private spreadsheetService: SpreadsheetService


    constructor() {
        this.saverService = new LocalDataService();
        this.coinBaseProService = new CoinBaseProService();
        this.spreadsheetService = new SpreadsheetService();
    }

    /**
     * Log data on spread sheet
     * */
    public LogActionData() {
            this.spreadsheetService.Init();
    }

    /**
     * Place a purchase/sell order to coinbasepro
     * @param order
     */
    public PlaceOrder(order: CoinBaseOrder): Promise<any> {
        let header = this.coinBaseProService.GetRequestHeaders("/orders", JSON.stringify(order), "POST");
        return this.coinBaseProService.Request("/orders", header, "POST", order);
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