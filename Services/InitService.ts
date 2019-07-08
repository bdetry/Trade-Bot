import DataSaverClass = require("../DataSaver/DataSaverClass");
import DataGetterClass = require("../DataGetter/DataGetterClass");
import { GlobalString } from "../globals";
import { CoinBaseCurrency } from "../Models/CoinBaseCurrency";
import { CoinBaseAccount } from "../Models/CoinBaseAccount";
import { ErrorLog } from "../Models/ErrorLog";

class InitService{

    private dataSaver: DataSaverClass;
    private dataGetter: DataGetterClass;

    constructor(dataSaver: DataSaverClass, dataGetter: DataGetterClass) {
        this.dataGetter = dataGetter;
        this.dataSaver = dataSaver;
    }


    public LoadBasicInformation() {
       

            /*
            dataGetter.GetAllCoinBaseProAccount().then(c => {
                console.log(c)
            }).catch(e => {
    
                console.log(e)
            });
    
            */


       


            //First price pulls
            this.dataGetter.GetCurrencyPrice(GlobalString.MONEYSPAISKEY).then(res => {
                let currency = res.data as CoinBaseCurrency;
                //Save data localy      
                return this.dataSaver.SaveCurrency(currency)
                    .then(res => console.log("Currency info saved to database"))
                    .catch(err => { throw new Error(err); });
            }).catch(err => { throw new Error("Getting currency price"); }).then(() => {

                //First account info pulls
                return this.dataGetter.GetAccount(GlobalString.CBLTCACCOINTID).then(res => {
                    let account = res.data as CoinBaseAccount;
                    //Save data localy
                    return this.dataSaver.SaveAccount(account)
                        .then(res => console.log("Account info saved to database"))
                        .catch(err => {
                            throw new Error(err);
                        });
                }).catch(err => {

                    throw new Error(err);
                }).then(() => {

                    //First account info pulls
                   return this.dataGetter.GetAccount(GlobalString.CBEURACCOUNTID).then(res => {
                        let account = res.data as CoinBaseAccount;
                        //Save data localy
                        return this.dataSaver.SaveAccount(account)
                            .then(res => console.log("Account info saved to database"))
                            .catch(err => {
                                throw new Error(err);
                            });

                });
            });
           
            }).catch(err => {

                let errLog: ErrorLog = {
                    Date: new Date(),
                    Error: err.stack
                }

                this.dataSaver.LogErrorData(errLog);


            });

      
    }

}

export = InitService