"use strict";
const mongoose_1 = require("mongoose");
/**
 * Class qui definit les actions a executer
 * */
class StrategiesClass {
    constructor(last, currentPrice, moneyZero, moneyOne) {
        this.orders = new Array();
        this.lastMoneTwoPrice = last;
        this.currentMoneyTwoPrice = currentPrice;
        this.moneyOneBalance = moneyZero;
        this.moneyTwoBalance = moneyOne;
    }
    /**
     * Apply selected and pre make the order
     * @param name strategie name
     * @returns  true if evethg goes well
     */
    ApplyStrategieAndCreateOrder(name) {
        let order;
        if (name == "strat1") {
            if (this.currentMoneyTwoPrice - this.lastMoneTwoPrice > 0.0001) {
                //vend
                console.log("vend");
                let toSellMoneyTwo = (15 * this.moneyTwoBalance) / 100;
                this.orders.push(order = {
                    size: toSellMoneyTwo.toString(),
                    price: this.currentMoneyTwoPrice.toString(),
                    side: "sell",
                    product_id: "LTC-EUR"
                });
                return true;
            }
            else if (this.currentMoneyTwoPrice - this.lastMoneTwoPrice < -0.0001) {
                //achete
                console.log("achete");
                let toBuyMoneyTwo = (15 * this.moneyTwoBalance) / 100;
                this.orders.push(order = {
                    size: toBuyMoneyTwo.toString(),
                    price: this.currentMoneyTwoPrice.toString(),
                    side: "buy",
                    product_id: "LTC-EUR"
                });
                return true;
            }
        }
        throw new mongoose_1.Error("Could not apply start and pre make order");
    }
}
module.exports = StrategiesClass;
//# sourceMappingURL=StrategiesClass.js.map