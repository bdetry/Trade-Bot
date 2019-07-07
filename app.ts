
import express = require('express');
import path = require('path');
import  routes = require("./routes");
import DataGetterClass = require('./DataGetter/DataGetterClass');
import DataSaverClass = require('./DataSaver/DataSaverClass');
import * as mongoose from 'mongoose';
import InitService = require('./Services/InitService');
import * as schedule from 'node-schedule';
import TradeController = require('./Controllers/TradeController');


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
    let tradeController = new TradeController();

    let startService = new InitService(dataSaver, dataGetter);
    startService.LoadBasicInformation();

    let nextRun: Date = new Date()

    let nextTriggerTime = (1000 * 60 * 60 );

    nextRun.setDate(nextRun.getTime() + nextTriggerTime);

    let seduler = schedule.scheduleJob(nextRun, function (date) {
        console.log('Time trigger. Next :' + date.toDateString());
        nextRun.setDate(nextRun.getTime() + nextTriggerTime);
        tradeController.DoTrade();
    });
});

