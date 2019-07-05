"use strict";
const globals_1 = require("../globals");
const DataGetterClass = require("../DataGetter/DataGetterClass");
const StrategiesClass = require("./../Strategies/StrategiesClass");
const DataSaverClass = require("../DataSaver/DataSaverClass");
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
                    if (r[0].currency == "EUR") {
                        moneyZeroAccount = r[0];
                        moneyOneAccount = r[1];
                    }
                    else if (r[0].currency == "LTC") {
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
                        strategies.ApplyStrategieAndCreateOrder("strat1");
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
                        });
                    }).catch(e => {
                        throw new Error(e);
                    });
                }).catch(e => {
                    throw new Error(e);
                });
            }).catch(e => {
                new Error(e);
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