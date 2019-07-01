﻿
import express = require('express');
import path = require('path');
import routes from "./routes";
import DataGetterClass = require('./DataGetter/DataGetterClass');
import { CoinBaseCurrency } from './Models/CoinBaseCurrency';
import { CoinBaseAccount } from './Models/CoinBaseAccount';
import DataSaverClass = require('./DataSaver/DataSaverClass');
import * as mongoose from 'mongoose';


var app = express();


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


mongoose.connect('mongodb://localhost:27017/tradeBot');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //Routing
    console.log("Connected to database");
});


app.set('port', process.env.PORT || 3000);
let port = app.get('port')

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);

    let dataGetter = new DataGetterClass();
    let dataSaver = new DataSaverClass();

    dataGetter.GetCurrencyPrice('BTC-EUR').then(res => {
        let currency = res.data as CoinBaseCurrency;
        //Save dala localy
        dataSaver.SaveCurrency(currency).then(res => console.log(res))
            .catch(err => console.log(err));
        console.log("Cryto price : " + currency.asks[0][0]);
    }).catch(err => console.log(err));

    dataGetter.GetAccount('1e3ac191-3f8d-4848-8737-cad3835dcb8f').then(res => {
        let accounts = res.data as CoinBaseAccount;
        console.log(accounts);
    }).catch(err => console.log(err));

    dataGetter.GetAccount('907432c9-8a3b-4d6f-a4b9-c667511aee7d').then(res => {
        let accounts = res.data as CoinBaseAccount;
        console.log(accounts);
    }).catch(err => console.log(err));

});

