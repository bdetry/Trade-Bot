"use strict";
const mongoose_1 = require("mongoose");
const globals_1 = require("../globals");
/**
 * Class qui definit les actions a executer
 * */
class StrategiesClass {
    constructor(last, currentPrice, moneyZero, moneyOne, currentMoneyTwoPriceSell) {
        this.orders = new Array();
        this.lastMoneTwoPrice = last;
        this.currentMoneyTwoPrice = currentPrice;
        this.moneyOneBalance = moneyZero;
        this.moneyTwoBalance = moneyOne;
        this.currentMoneyTwoPriceSell = currentMoneyTwoPriceSell;
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
                let toSellMoneyTwo = (22 * this.ConvertToMoneyTwo(this.moneyOneBalance, this.currentMoneyTwoPrice)) / 100; // (22 * this.moneyTwoBalance) / 100; 
                this.orders.push(order = {
                    size: Number.parseFloat(toSellMoneyTwo.toString()).toFixed(8).toString(),
                    price: this.currentMoneyTwoPrice.toString(),
                    side: "buy",
                    product_id: globals_1.GlobalString.MONEYSPAISKEY
                });
                return true;
            }
            else if (this.currentMoneyTwoPrice - this.lastMoneTwoPrice < -0.0001) {
                //achete
                console.log("achete");
                let toBuyMoneyTwo = (22 * this.ConvertToMoneyTwo(this.moneyOneBalance, this.currentMoneyTwoPrice)) / 100;
                this.orders.push(order = {
                    size: Number.parseFloat(toBuyMoneyTwo.toString()).toFixed(8).toString(),
                    price: this.currentMoneyTwoPrice.toString(),
                    side: "buy",
                    product_id: globals_1.GlobalString.MONEYSPAISKEY
                });
                return true;
            }
        }
        throw new mongoose_1.Error("Could not apply strategie and pre make order");
    }
    /**
     * Convert to euros in general
     * @param money
     * @param actualMoneyTwoPrice
     */
    ConvertToMoneyOne(money, actualMoneyTwoPrice) {
        return money * actualMoneyTwoPrice;
    }
    /**
     * Convert to euros in general
     * @param money
     * @param actualMoneyOnePrice
     */
    ConvertToMoneyTwo(money, actualMoneyOnePrice) {
        return money / actualMoneyOnePrice;
    }
}
module.exports = StrategiesClass;
//# sourceMappingURL=StrategiesClass.js.map