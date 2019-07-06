import LocalDataService = require("../Services/LocalDataService");
import { CoinBaseCurrency } from "../Models/CoinBaseCurrency";
import { CoinBaseAccount } from "../Models/CoinBaseAccount";
import { CoinBaseOrder } from "../Models/CoinBaseOrder";
import CoinBaseProService = require("../Services/CoinBaseProService");
import SpreadsheetService = require("../Services/SpreadsheetService");
import { GoogleSheetsCred } from "../Models/GoogleSheetsCred";
import { GlobalString } from "../globals";
import { TradeLog } from "../Models/TradeLog";
import { CoinBaseOrderResponse } from "../Models/CoinBaseOrderResponse";
import { AxiosPromise } from "axios";
import { ErrorLog } from "../Models/ErrorLog";

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
        this.spreadsheetService = new SpreadsheetService(GlobalString.SPREADSHEETID);
    }

    /**
     * Log data on spread sheet
     * */
    public LogActionData(trade: TradeLog)  {
        this.spreadsheetService.Init(false).then(x => {

           return this.spreadsheetService.Write(x, trade , 'Sheet1').then(resp => {
                console.log(resp);
           }).catch(err => {
               throw new Error('Could not write to spreadsheet : ' + err);
            });;

        }).catch(e => console.log(e));
    }

    public LogErrorData(log: ErrorLog) {
        this.spreadsheetService.Init(true).then(x => {

            return this.spreadsheetService.Write(x, log, 'Sheet2').then(resp => {
                console.log(resp);
            }).catch(err => {
                throw new Error('Could not write err to spreadsheet : ' + err);
            });;

        }).catch(e => console.log(e));
    }

    /**
     * Place a purchase/sell order to coinbasepro
     * @param order
     */
    public PlaceOrder(order: CoinBaseOrder): AxiosPromise<CoinBaseOrderResponse> {
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