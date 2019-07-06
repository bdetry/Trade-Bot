export interface TradeLog {
    date: Date,
    id: string,
    price: number,
    size: number,
    sizeConvertedMoneyTwo : number,
    side: string,
    moneyOneBalance: number,
    moneyTwoBalance: number,
    moneyOneBalanceCoverted: number,
    moneyTwoPrice: number,
    totalBlances: number
}