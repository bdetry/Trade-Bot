import { CoinBaseOrder } from "../Models/CoinBaseOrder";
import { Error } from "mongoose";
import { GlobalString } from "../globals";

/**
 * Class qui definit les actions a executer 
 * */
class StrategiesClass {

    //stored price
    private lastMoneTwoPrice: number
    //live price
    private currentMoneyTwoPrice: number

    //last monye one balance
    private moneyOneBalance: number
    //last monye one balance
    private moneyTwoBalance: number

    public orders: CoinBaseOrder[] = new Array<CoinBaseOrder>();



    constructor(last: number, currentPrice: number, moneyZero: number, moneyOne: number) {
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
    public ApplyStrategieAndCreateOrder(name: string): boolean {

        let order: CoinBaseOrder

        if (name == "strat1") {

            if (this.currentMoneyTwoPrice - this.lastMoneTwoPrice > 0.0001) {
                //vend
                console.log("vend");

                let toSellMoneyTwo = (15 * this.moneyTwoBalance) / 100;

                this.orders.push(
                    order = {
                        size: toSellMoneyTwo.toString(),
                        price: this.currentMoneyTwoPrice.toString(),
                        side: "sell",
                        product_id: GlobalString.MONEYSPAISKEY
                    });


                return true;

            } else if (this.currentMoneyTwoPrice - this.lastMoneTwoPrice < -0.0001) {
                //achete
                console.log("achete");

                let toBuyMoneyTwo = (15 * this.moneyTwoBalance) / 100;

                this.orders.push(
                    order = {
                        size: toBuyMoneyTwo.toString(),
                        price: this.currentMoneyTwoPrice.toString(),
                        side: "buy",
                        product_id: GlobalString.MONEYSPAISKEY
                    });

                return true;

            }

        }

        throw new Error("Could not apply strategie and pre make order")

    }

}

export = StrategiesClass