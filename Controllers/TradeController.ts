import { Router, Request, Response, NextFunction } from 'express';
import { GlobalString } from '../globals';
import DataGetterClass = require('../DataGetter/DataGetterClass');
import { CoinBaseCurrency } from '../Models/CoinBaseCurrency';
import StrategiesClass = require('./../Strategies/StrategiesClass');
import { CoinBaseAccount } from '../Models/CoinBaseAccount';
import DataSaverClass = require('../DataSaver/DataSaverClass');
import { TradeLog } from '../Models/TradeLog';
import { ErrorLog } from '../Models/ErrorLog';
import InitService = require('../Services/InitService');
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
                                        let currentSellPrice = x.data.bids[0][0];;

                                        //Choise maker
                                        let strategies = new StrategiesClass(+lastSavedPrice, +currentPrice, +moneyZeroAccount.available, +moneyOneAccount.available, currentSellPrice);
                                        //Apply start
                                        strategies.ApplyStrategieAndCreateOrder("strat1")

                                        //Buy / Sell
                                        
                                        return this.dataSaver.PlaceOrder(strategies.orders[0])
                                            .then(ordered => {


                                                //Log in sheets Results
                                                try {
                                                    let monerOneBlanceConv = strategies.ConvertToMoneyOne(+moneyOneAccount.available, +currentPrice);

                                                    let tradePrice = ordered.data.side == "buy" ? +currentPrice : currentSellPrice;

                                                    let sizeConverted = strategies.ConvertToMoneyOne(+ordered.data.size, +tradePrice);

                                                    let moneyOneBalance = ordered.data.side == "buy" ? +moneyZeroAccount.available - sizeConverted : +moneyZeroAccount.available + sizeConverted;
                                                    let moneyTwoBalance = ordered.data.side == "buy" ? +moneyOneAccount.available + +ordered.data.size : +moneyOneAccount.available - +ordered.data.size;

                                                    let log: TradeLog = {
                                                        date: new Date(),
                                                        id: ordered.data.id,
                                                        price: +ordered.data.price,
                                                        size: +ordered.data.size,
                                                        sizeConvertedMoneyTwo: sizeConverted,
                                                        side: ordered.data.side,
                                                        moneyOneBalance: moneyOneBalance,
                                                        moneyTwoBalance: moneyTwoBalance,
                                                        moneyTwoBalanceCoverted: monerOneBlanceConv,
                                                        totalBlances: monerOneBlanceConv + +moneyZeroAccount.available,
                                                        currentAskPrice: +currentPrice
                                                    };

                                                    this.dataSaver.LogActionData(log);
                                                    
                                                    let startService = new InitService(this.dataSaver, this.dataGetter);
                                                    startService.LoadBasicInformation();

                                                    res.status(200).json({ action: ordered.data.side });
                                                    

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


    /**
     * Make a trade from inner trigger
     * */
    public DoTrade() {

        let key = GlobalString.TRADESECURITYKEY

        //Get local prices
        return this.dataGetter.GetLocalPrice()
            .then(x => {

                //Last buy price
                let lastSavedPrice = x[0].asks[0][0];

                //Get accounts info
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
                                let currentSellPrice = x.data.bids[0][0];;

                                //Choise maker
                                let strategies = new StrategiesClass(+lastSavedPrice, +currentPrice, +moneyZeroAccount.available, +moneyOneAccount.available, currentSellPrice);
                                //Apply start
                                strategies.ApplyStrategieAndCreateOrder("strat1");
                                let order = strategies.orders[0];

                                
                                //Buy / Sell
                                return this.dataSaver.PlaceOrder(order)
                                    .then(ordered => {

                                        //Log in sheets Results
                                        try {

                                            let tradePrice = order.side == "buy" ? +currentPrice : currentSellPrice;

                                            let sizeConverted = strategies.ConvertToMoneyOne(+order.size, +tradePrice);

                                            let moneyOneBalance = order.side == "buy" ? +moneyZeroAccount.available - sizeConverted : +moneyZeroAccount.available + sizeConverted;
                                            let moneyTwoBalance = order.side == "buy" ? +moneyOneAccount.available + +order.size : +moneyOneAccount.available - +order.size;


                                            let monerTwoBlanceConv = strategies.ConvertToMoneyOne(moneyTwoBalance, +tradePrice);

                                            let log: TradeLog = {
                                                date: new Date(),
                                                id: ordered.data.id,
                                                price: +order.price,
                                                size: +order.size,
                                                sizeConvertedMoneyTwo: sizeConverted,
                                                side: order.side,
                                                moneyOneBalance: moneyOneBalance,
                                                moneyTwoBalance: moneyTwoBalance,
                                                moneyTwoBalanceCoverted: monerTwoBlanceConv,
                                                totalBlances: monerTwoBlanceConv + moneyOneBalance,
                                                currentAskPrice: +currentPrice
                                            };

                                            this.dataSaver.LogActionData(log);

                                            let startService = new InitService(this.dataSaver, this.dataGetter);
                                            startService.LoadBasicInformation();

                                        } catch (e) {
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


                let startService = new InitService(this.dataSaver, this.dataGetter);
                startService.LoadBasicInformation();


            });
    }
}

export = TradeController