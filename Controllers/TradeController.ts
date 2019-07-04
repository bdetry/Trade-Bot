import { Router, Request, Response, NextFunction } from 'express';
import { GlobalString } from '../globals';
import DataGetterClass = require('../DataGetter/DataGetterClass');
import { CoinBaseCurrency } from '../Models/CoinBaseCurrency';
import StrategiesClass = require('./../Strategies/StrategiesClass');
import { CoinBaseAccount } from '../Models/CoinBaseAccount';
import DataSaverClass = require('../DataSaver/DataSaverClass');
/**
 * Class that trade cryptos
 * */
class TradeController {

    private dataGetter: DataGetterClass
    private dataSaver: DataSaverClass


    constructor() {
        this.doTrade = this.doTrade.bind(this);

        this.dataGetter = new DataGetterClass();
        this.dataSaver = new DataSaverClass();
    }

    /**
     * Called on http get /trade - execute actions and place order
     * @param req
     * @param res
     * @param next
     */
    doTrade(req: Request, res: Response, next: NextFunction) {

        let secuKey = req.query.key;
        let key = GlobalString.TRADESECURITYKEY


        if (secuKey == key) {


                //Get local prices
                 return this.dataGetter.GetLocalPrice()
                    .then(x => {

                        //Last buy price
                        let lastSavedPrice = x[0].asks[0][0];

                        return this.dataGetter.GetLocalAccounts()
                            .then(r => {

                                //Get account balances
                                let moneyZeroAccount: CoinBaseAccount;
                                let moneyOneAccount: CoinBaseAccount;


                                if (r[0].currency == "EUR") {
                                    moneyZeroAccount = r[0];
                                    moneyOneAccount = r[1];
                                } else if (r[0].currency == "LTC") {
                                    moneyZeroAccount = r[1];
                                    moneyOneAccount = r[0];
                                }

                                //Get currrent price
                                 return this.dataGetter.GetCurrencyPrice("LTC-EUR")
                                    .then(x => {
                                        //current price
                                        let currentPrice = x.data.asks[0][0];

                                        //Choise maker
                                        let strategies = new StrategiesClass(+lastSavedPrice, +currentPrice, +moneyZeroAccount.available, +moneyOneAccount.available);
                                        //Apply start
                                        strategies.ApplyStrategieAndCreateOrder("strat1")
                                        //Buy / Sell
                                        return this.dataSaver.PlaceOrder(strategies.orders[0])
                                            .then(ordered => {

                                                //Order placed 
                                                console.log(ordered);

                                                //TODO

                                                // Log result 
                                                // Save db

                                            }).catch(e => {
                                                throw new Error(e);
                                            })                                            
                                    }).catch(e => {
                                        throw new Error(e);
                                    })
                            }).catch(e => {
                                throw new Error(e);
                            })
                    }).catch(e => {
                        new Error(e);
                        res.status(500).json({ stack : e.stack })
                    });
            } else {
                res.status(401).json({ message: "Wrong key" })
            }
        
    }

}

export = TradeController