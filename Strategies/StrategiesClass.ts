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
    //live sell price
    private currentMoneyTwoPriceSell: number

    //last monye one balance
    private moneyOneBalance: number
    //last monye one balance
    private moneyTwoBalance: number

    public orders: CoinBaseOrder[] = new Array<CoinBaseOrder>();



    constructor(last: number, currentPrice: number, moneyZero: number, moneyOne: number, currentMoneyTwoPriceSell : number) {
        this.lastMoneTwoPrice = last;
        this.currentMoneyTwoPrice = currentPrice;
        this.moneyOneBalance = moneyZero;
        this.moneyTwoBalance = moneyOne;
        this.currentMoneyTwoPriceSell = currentMoneyTwoPriceSell
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

                let toSellMoneyTwo =  (18 * this.moneyTwoBalance) / 100; 

                this.orders.push(
                    order = {
                        size: Number.parseFloat(toSellMoneyTwo.toString()).toFixed(8).toString(),
                        price: this.currentMoneyTwoPriceSell.toString(),
                        side: "sell", //sell
                        product_id: GlobalString.MONEYSPAISKEY
                    });


                return true;

            } else if (this.currentMoneyTwoPrice - this.lastMoneTwoPrice < -0.0001) {
                //achete
                console.log("achete");

                let toBuyMoneyTwo = (18 * this.ConvertToMoneyTwo(this.moneyOneBalance, this.currentMoneyTwoPrice)) / 100;

                this.orders.push(
                    order = {
                        size: Number.parseFloat(toBuyMoneyTwo.toString()).toFixed(8).toString(),
                        price: this.currentMoneyTwoPrice.toString(),
                        side: "buy", //buy
                        product_id: GlobalString.MONEYSPAISKEY
                    });

                return true;

            }

        }

        throw new Error("Could not apply strategie and pre make order")

    }

    /**
     * Convert to euros in general
     * @param money
     * @param actualMoneyTwoPrice
     */
    public ConvertToMoneyOne(money: number, actualMoneyTwoPrice: number): number {
        return money * actualMoneyTwoPrice
    }


    /**
     * Convert to euros in general
     * @param money
     * @param actualMoneyOnePrice
     */
    public ConvertToMoneyTwo(money: number, actualMoneyOnePrice: number): number {
        return money / actualMoneyOnePrice
    }

}

export = StrategiesClass