"use strict";
const globals_1 = require("../globals");
const DataGetterClass = require("../DataGetter/DataGetterClass");
const StrategiesClass = require("./../Strategies/StrategiesClass");
const DataSaverClass = require("../DataSaver/DataSaverClass");
const InitService = require("../Services/InitService");
/**
 * Class that trade cryptos
 * */
class TradeController {
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
    doTrade(req, res, next) {
        let secuKey = req.query.key;
        let key = globals_1.GlobalString.TRADESECURITYKEY;
        if (secuKey == key) {
            //Get local prices
            return this.dataGetter.GetLocalPrice()
                .then(x => {
                //Last buy price
                let lastSavedPrice = x[0].asks[0][0];
                return this.dataGetter.GetLocalAccounts()
                    .then(r => {
                    //Get account balances
                    let moneyZeroAccount;
                    let moneyOneAccount;
                    if (r[0].currency == globals_1.GlobalString.MONEYONEKEY) {
                        moneyZeroAccount = r[0];
                        moneyOneAccount = r[1];
                    }
                    else if (r[0].currency == globals_1.GlobalString.MONEYTWOKEY) {
                        moneyZeroAccount = r[1];
                        moneyOneAccount = r[0];
                    }
                    //Get currrent price
                    return this.dataGetter.GetCurrencyPrice(globals_1.GlobalString.MONEYSPAISKEY)
                        .then(x => {
                        //current price
                        let currentPrice = x.data.asks[0][0];
                        let currentSellPrice = x.data.bids[0][0];
                        ;
                        //Choise maker
                        let strategies = new StrategiesClass(+lastSavedPrice, +currentPrice, +moneyZeroAccount.available, +moneyOneAccount.available, currentSellPrice);
                        //Apply start
                        strategies.ApplyStrategieAndCreateOrder("strat1");
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
                                let log = {
                                    date: new Date(),
                                    id: ordered.data.id,
                                    price: +ordered.data.price,
                                    size: +ordered.data.size,
                                    sizeConvertedMoneyTwo: sizeConverted,
                                    side: ordered.data.side,
                                    moneyOneBalance: moneyOneBalance,
                                    moneyTwoPrice: +currentPrice,
                                    moneyTwoBalance: moneyTwoBalance,
                                    moneyOneBalanceCoverted: monerOneBlanceConv,
                                    totalBlances: monerOneBlanceConv + +moneyZeroAccount.available
                                };
                                this.dataSaver.LogActionData(log);
                                let startService = new InitService(this.dataSaver, this.dataGetter);
                                startService.LoadBasicInformation();
                                res.status(200).json({ action: ordered.data.side });
                            }
                            catch (e) {
                                throw new Error(e);
                            }
                        }).catch(e => {
                            throw new Error(e);
                        });
                    }).catch(e => {
                        throw new Error(e);
                    });
                }).catch(e => {
                    throw new Error(e);
                });
            }).catch(e => {
                new Error(e);
                let errLog = {
                    Date: new Date(),
                    Error: e.stack
                };
                this.dataSaver.LogErrorData(errLog);
                res.status(500).json({ stack: e.stack });
            });
        }
        else {
            res.status(401).json({ message: "Wrong key" });
        }
    }
}
module.exports = TradeController;
//# sourceMappingURL=TradeController.js.map