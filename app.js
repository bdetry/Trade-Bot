"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes = require("./routes");
const DataGetterClass = require("./DataGetter/DataGetterClass");
const DataSaverClass = require("./DataSaver/DataSaverClass");
const mongoose = require("mongoose");
const globals_1 = require("./globals");
var app = express();
mongoose.connect('mongodb://localhost:27017/tradeBot');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //Routing
    console.log("Connected to database");
    routes(app);
});
app.set('port', process.env.PORT || 3000);
let port = app.get('port');
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
    let dataGetter = new DataGetterClass();
    let dataSaver = new DataSaverClass();
    try {
        //First price pulls
        dataGetter.GetCurrencyPrice('BTC-EUR').then(res => {
            let currency = res.data;
            //Save data localy      
            dataSaver.SaveCurrency(currency)
                .then(res => console.log("Currency info saved to database"))
                .catch(err => { throw new Error(" Saving currency info"); });
        }).catch(err => { throw new Error("Getting currency price"); });
        //First account info pulls
        dataGetter.GetAccount(globals_1.GlobalString.CBLTCACCOINTID).then(res => {
            let account = res.data;
            //Save data localy
            dataSaver.SaveAccount(account)
                .then(res => console.log("Account info saved to database"))
                .catch(err => { throw new Error("Saving account info"); });
        }).catch(err => { throw new Error("Getting account info"); });
        //First account info pulls
        dataGetter.GetAccount(globals_1.GlobalString.CBEURACCOUNTID).then(res => {
            let account = res.data;
            //Save data localy
            dataSaver.SaveAccount(account)
                .then(res => console.log("Account info saved to database"))
                .catch(err => { throw new Error("Saving account info"); });
        }).catch(err => { throw new Error("Getting account info"); });
    }
    catch (e) {
        console.log(e);
    }
});
//# sourceMappingURL=app.js.map