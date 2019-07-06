"use strict";
const globals_1 = require("../globals");
class InitService {
    constructor(dataSaver, dataGetter) {
        this.dataGetter = dataGetter;
        this.dataSaver = dataSaver;
    }
    LoadBasicInformation() {
        /*
        dataGetter.GetAllCoinBaseProAccount().then(c => {
            console.log(c)
        }).catch(e => {

            console.log(e)
        });

        */
        //First price pulls
        this.dataGetter.GetCurrencyPrice(globals_1.GlobalString.MONEYSPAISKEY).then(res => {
            let currency = res.data;
            //Save data localy      
            return this.dataSaver.SaveCurrency(currency)
                .then(res => console.log("Currency info saved to database"))
                .catch(err => { throw new Error(err); });
        }).catch(err => { throw new Error("Getting currency price"); }).then(() => {
            //First account info pulls
            return this.dataGetter.GetAccount(globals_1.GlobalString.CBLTCACCOINTID).then(res => {
                let account = res.data;
                //Save data localy
                return this.dataSaver.SaveAccount(account)
                    .then(res => console.log("Account info saved to database"))
                    .catch(err => { throw new Error(err); });
            }).catch(err => {
                throw new Error(err);
            }).then(() => {
                //First account info pulls
                return this.dataGetter.GetAccount(globals_1.GlobalString.CBEURACCOUNTID).then(res => {
                    let account = res.data;
                    //Save data localy
                    return this.dataSaver.SaveAccount(account)
                        .then(res => console.log("Account info saved to database"))
                        .catch(err => { throw new Error(err); });
                });
            });
        }).catch(err => {
            let errLog = {
                Date: new Date(),
                Error: err.stack
            };
            this.dataSaver.LogErrorData(errLog);
        });
    }
}
module.exports = InitService;
//# sourceMappingURL=InitService.js.map