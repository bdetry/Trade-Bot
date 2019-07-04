
import express = require('express');
import path = require('path');
import  routes = require("./routes");
import DataGetterClass = require('./DataGetter/DataGetterClass');
import { CoinBaseCurrency } from './Models/CoinBaseCurrency';
import { CoinBaseAccount } from './Models/CoinBaseAccount';
import DataSaverClass = require('./DataSaver/DataSaverClass');
import * as mongoose from 'mongoose';
import { GlobalString } from './globals';


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
let port = app.get('port')

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);

    let dataGetter = new DataGetterClass();
    let dataSaver = new DataSaverClass();

    try {
        //First price pulls
        dataGetter.GetCurrencyPrice('LTC-EUR').then(res => {
            let currency = res.data as CoinBaseCurrency;
            //Save data localy      
            dataSaver.SaveCurrency(currency)
                .then(res => console.log("Currency info saved to database"))
                .catch(err => { throw new Error(" Saving currency info"); });
        }).catch(err => { throw new Error("Getting currency price"); });

        //First account info pulls
        dataGetter.GetAccount(GlobalString.CBLTCACCOINTID).then(res => {
            let account = res.data as CoinBaseAccount;
            //Save data localy
            dataSaver.SaveAccount(account)
                .then(res => console.log("Account info saved to database"))
                .catch(err => { throw new Error("Saving account info"); });
        }).catch(err => { throw new Error("Getting account info"); });

        //First account info pulls
        dataGetter.GetAccount(GlobalString.CBEURACCOUNTID).then(res => {
            let account = res.data as CoinBaseAccount;
            //Save data localy
            dataSaver.SaveAccount(account)
                .then(res => console.log("Account info saved to database"))
                .catch(err => { throw new Error("Saving account info"); });
        }).catch(err => { throw new Error("Getting account info"); });

    } catch (e) {
        console.log(e);
    }

});

