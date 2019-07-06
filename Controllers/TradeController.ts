import { Router, Request, Response, NextFunction } from 'express';
import { GlobalString } from '../globals';
import DataGetterClass = require('../DataGetter/DataGetterClass');
import { CoinBaseCurrency } from '../Models/CoinBaseCurrency';
import StrategiesClass = require('./../Strategies/StrategiesClass');
import { CoinBaseAccount } from '../Models/CoinBaseAccount';
import DataSaverClass = require('../DataSaver/DataSaverClass');
import { TradeLog } from '../Models/TradeLog';
import { ErrorLog } from '../Models/ErrorLog';
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


                                if (r[0].currency == GlobalString.MONEYONEKEY) {
                                    moneyZeroAccount = r[0];
                                    moneyOneAccount = r[1];
                                } else if (r[0].currency == GlobalString.MONEYTWOKEY) {
                                    moneyZeroAccount = r[1];
                                    moneyOneAccount = r[0];
                                }

                                //Get currrent price
                                return this.dataGetter.GetCurrencyPrice(GlobalString.MONEYSPAISKEY)
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


                                                //Log in sheets Results
                                                try {
                                                    let monerOneBlanceConv = strategies.ConvertToMoneyOne(+moneyOneAccount.available, +currentPrice);

                                                    let log: TradeLog = {
                                                        date: new Date(),
                                                        id: ordered.data.id,
                                                        price: +ordered.data.price,
                                                        size: +ordered.data.size,
                                                        sizeConvertedMoneyTwo: strategies.ConvertToMoneyOne(+ordered.data.size, +currentPrice),
                                                        side: ordered.data.side,
                                                        moneyOneBalance: +moneyZeroAccount.available,
                                                        moneyTwoPrice: +currentPrice,
                                                        moneyTwoBalance: +moneyOneAccount.available,
                                                        moneyOneBalanceCoverted: monerOneBlanceConv,
                                                        totalBlances: monerOneBlanceConv + +moneyZeroAccount.available
                                                    };
                                                    this.dataSaver.LogActionData(log);


                                                }catch (e) {
                                                    throw new Error(e);
                                                }

                                                

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

                        let errLog: ErrorLog = {
                            Date: new Date(),
                            Error: e.stack
                        }

                        this.dataSaver.LogErrorData(errLog);

                        res.status(500).json({ stack: e.stack })
                    });
        } else {

                res.status(401).json({ message: "Wrong key" })
            }
        
    }

}

export = TradeController