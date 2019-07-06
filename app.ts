
import express = require('express');
import path = require('path');
import  routes = require("./routes");
import DataGetterClass = require('./DataGetter/DataGetterClass');
import DataSaverClass = require('./DataSaver/DataSaverClass');
import * as mongoose from 'mongoose';
import InitService = require('./Services/InitService');


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

    let startService = new InitService(dataSaver, dataGetter);
    startService.LoadBasicInformation();



});

